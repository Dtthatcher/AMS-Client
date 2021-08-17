import React, {useState, useEffect} from 'react'
import {Form, Modal, Button} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css';


const AddPersonForm = ({handleClose, show, rooms, personCallback}) => {

    const [allRoomsBF, setAllRoomsBF] = useState(null)
    const [allFloorsB, setAllFloorsB] = useState(null)
    const [allPeople, setAllPeople] = useState(null)
    
    const [BuildingNumber, setBuildingNumber] = useState(null)
    
    const [floorNumberAndId, setFloorNumberAndId] = useState(null)
    const [floorId, setFloorId] = useState(null)
    const [floorNumber, setFloorNumber] = useState(null)
    
    const [roomNumberAndId, setRoomNumberAndId] = useState(null)    
    const [RoomId, setRoomId] = useState(null)
    const [RoomNumber, setRoomNumber] = useState(null)
    const [Available, setAvailable] = useState(true)
    
    const [PersonNamePosition, setPersonNamePosition] = useState(null)
    const [position, setPosition] = useState(null)
    const [name, setName] = useState(null)
    const [personId, setPersonId] = useState(null)


    useEffect(() => {
        fetch(`http://localhost:8080/api/people`)
          .then(res => {
            return res.json();
          })
          .then(data =>{
            setAllPeople(data)
          })
      },[BuildingNumber],[floorNumber],[RoomNumber])

    useEffect(() => {
        fetch(`http://localhost:8080/api/floor/${BuildingNumber}`)
          .then(res => {
            return res.json();
          })
          .then(data =>{
            setAllFloorsB(data)
          })
      },[BuildingNumber])
    
    useEffect(() => {
        fetch(`http://localhost:8080/api/room/${BuildingNumber}/${floorNumber}`)
          .then(res => {
            return res.json();
          })
          .then(data =>{
            setAllRoomsBF(data)
          })
      },[BuildingNumber, floorNumber, floorNumberAndId, PersonNamePosition])
    
      useEffect(() => {
          if (PersonNamePosition){
              personPositionAvailable()              
          }
          if (roomNumberAndId){
              roomNumAndId()
          }
          if (floorNumberAndId){
              floorNumberId()
          }
      })
  
    const handleBuildingChange = (e) => setBuildingNumber(e.target.value)
    
    

    const floorNumberId = () => {
        setFloorNumber(floorNumberAndId.split(",")[0])
        setFloorId(floorNumberAndId.split(",")[1])
    }

    const handleFloorChange = (e) => {setFloorNumberAndId(e.target.value); 
    }

    const roomNumAndId = () => {
        setRoomNumber(roomNumberAndId.split(",")[0])
        setRoomId(roomNumberAndId.split(",")[1])
    }

    const handleRoomChange = (e) => {setRoomNumberAndId(e.target.value);       
    }
    
    
    const personPositionAvailable = () => {
        setName(PersonNamePosition.split(",")[0])
        setPosition(PersonNamePosition.split(",")[1])
        setPersonId(PersonNamePosition.split(",")[2])
        setAvailable(false)
    }
    const handlePersonChange = (e) => {
        setPersonNamePosition(e.target.value);        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const roomId = RoomId
        const PersonId = personId              
        const obj = JSON.stringify({"id": roomId, Available})
        const obj2 = JSON.stringify({"id": PersonId, RoomId})

        fetch('http://localhost:8080/api/room', {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "Access-Control-Request-Method": "PUT"},
            body: obj
        }).then(() => {
            console.log("Updated that Ish  " + obj)
        })

        fetch('http://localhost:8080/api/people', {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "Access-Control-Request-Method": "PUT"},
            body: obj2
        }).then(() => {
            console.log ("submitted also  " + obj2)
        })
        personCallback(name, position)
        window.location.reload()
        handleClose()
    }    
    
    function allBuildings(){
        let arr = rooms.reduce((previous, current) => {previous.push(current["BuildingNumber"] ); return previous}, [])
        let unique = [... new Set(arr)]
        return unique
    }
    return (
    <div>
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Please Choose Building and Floor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group onSubmit={handleSubmit}>
                Building
                <Form.Control
                    as="select"
                    onChange={handleBuildingChange}
                >
                    <option
                    value="1">Choose Building</option>
                {rooms && allBuildings().map((building) => (
                    <option 
                    value={building}
                    >
                    {building}
                    </option>
                ))}
                </Form.Control>
                Floor
                <Form.Control
                    as="select"
                    onChange={handleFloorChange}
                >
                    <option>
                    Choose Floor
                    </option>
                        {allFloorsB && rooms && allFloorsB.map((floor) => (
                    <option 
                    value={[floor.FloorNumber, floor.id]}                    
                    >
                        {floor.FloorNumber}                    
                    </option>
                ))}
                </Form.Control>
                <br></br>
                <Form.Control
                    as="select"
                    onChange={handleRoomChange}                    
                >
                    <option value="1">
                    Choose Room
                    </option>
                    {allRoomsBF && rooms && allFloorsB && allRoomsBF.map((room) => (
                        <option value={[room.RoomNumber, room.Id]}>
                        {room.Available == 1 ? `Room Number ${room.RoomNumber}`
                            : `Room Number ${room.RoomNumber} is NOT Available`}
                        </option>
                    ))}
                </Form.Control>
                <br></br>
                <Form.Control
                    as="select"
                    onChange={handlePersonChange}
                >
                    <option>
                    Choose Person
                    </option>
                    {allPeople && allPeople.map((person) => (
                        person.RoomId == null ? 
                            <option value={[person.Name, person.Position, person.id]}>
                            {person.Name}
                            </option>
                            : null
                            
                    ))}
                </Form.Control>
                
            </Form.Group>
            <br></br>           
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Person To Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
    )
  }
export default AddPersonForm