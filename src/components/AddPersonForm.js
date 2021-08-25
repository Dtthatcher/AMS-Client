import React, {useState, useEffect} from 'react'
import {Form, Modal, Button} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css';


const AddPersonForm = ({handleClose, show, rooms, refresh, setRefresh}) => {

    const [allRoomsBF, setAllRoomsBF] = useState(null)
    const [allFloorsB, setAllFloorsB] = useState(null)
    const [allPeople, setAllPeople] = useState(null)
    
    const [BuildingNumber, setBuildingNumber] = useState(null)
    
    const [floorNumber, setFloorNumber] = useState(null)
    
    const [roomNumberAndId, setRoomNumberAndId] = useState(null)    
    const [RoomId, setRoomId] = useState(null)
    const [RoomNumber, setRoomNumber] = useState(null)

    const [personId, setPersonId] = useState(null)


    useEffect(() => {
        fetch(`http://localhost:8080/api/people`)
          .then(res => {
            return res.json();
          })
          .then(data =>{
            setAllPeople(data)
          })
      },[RoomNumber])

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
        },[floorNumber])
    
      useEffect(() => {
          if (roomNumberAndId){
              roomNumAndId()
          }
      })
  
    const handleBuildingChange = (e) => setBuildingNumber(e.target.value)

    const handleFloorChange = (e) => setFloorNumber(e.target.value)

    const roomNumAndId = () => {
        setRoomNumber(roomNumberAndId.split(",")[0])
        setRoomId(roomNumberAndId.split(",")[1])
    }

    const handleRoomChange = (e) => setRoomNumberAndId(e.target.value)
    
    const handlePersonChange = (e) => setPersonId(e.target.value)
    
    const handleSubmit = (e) => {
        e.preventDefault();        
        
        const obj2 = JSON.stringify({"id": personId, RoomId})

        fetch('http://localhost:8080/api/people', {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "Access-Control-Request-Method": "PUT"},
            body: obj2
        }).then(() => {
            console.log ("submitted also  " + obj2)
        })
        
        // window.location.reload()
        setRefresh(!refresh)
        handleClose()
        
    }    
    
    function allBuildings(){
        let arr = rooms.reduce((previous, current) => {previous.push(current["BuildingNumber"] ); return previous}, [])
        let unique = [...new Set(arr)]
        return unique
    }
    return (
    <div>
    <Modal show={show} onHide={handleClose} >
        <Modal.Header>
            <Modal.Title>Please Choose Building and Floor</Modal.Title>
            <Button variant="outline-dark" onClick={handleClose}>X</Button>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group onSubmit={handleSubmit}>
                <strong>Building</strong>
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
                <br/>
                <strong>Floor</strong>
                <Form.Control
                    as="select"
                    onChange={handleFloorChange}
                >
                    <option>
                    Choose Floor
                    </option>
                        {allFloorsB && rooms && allFloorsB.map((floor) => (
                    <option 
                    value={floor.FloorNumber}                    
                    >
                        {floor.FloorNumber}                    
                    </option>
                ))}
                </Form.Control>
                <br/>
                <strong>Room</strong>
                <Form.Control
                    as="select"
                    onChange={handleRoomChange}                    
                >
                    <option value="1">
                    Choose Room
                    </option>
                    {allRoomsBF && rooms && allFloorsB && allRoomsBF.map((room) => (
                        <option value={[room.RoomNumber, room.Id]}>
                        {room.Available === true ? `Room Number ${room.RoomNumber}`
                            : `Room Number ${room.RoomNumber} is NOT Available`}
                        </option>
                    ))}
                </Form.Control>
                <br/>
                <strong>People</strong>
                <Form.Control
                    as="select"
                    onChange={handlePersonChange}
                >
                    <option>
                    Choose Person
                    </option>
                    {allPeople && allPeople.map((person) => (
                        person.RoomId == null ? 
                            <option value={person.id}>
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