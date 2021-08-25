import React, {useState, useEffect} from 'react'
import {Form, ListGroup, Modal, Button, CloseButton} from 'react-bootstrap'



const AddRoomForm = ({handleClose, show, rooms, refresh, setRefresh}) => {

    const [allRoomsBF, setAllRoomsBF] = useState(null)
    const [allFloorsB, setAllFloorsB] = useState(null)
    
    const [BuildingNumber, setBuildingNumber] = useState(null)
    
    const [floorNumberAndId, setFloorNumberAndId] = useState(null)
    const [FloorId, setFloorId] = useState(null)
    const [floorNumber, setFloorNumber] = useState(null)
    
    const [RoomNumber, setRoomNumber] = useState(null)

       
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
      },[BuildingNumber, floorNumber])

      useEffect(() => {
        
        if (floorNumberAndId){
            floorNumberId()
        }
    },[floorNumberAndId])
    

    const handleBuildingChange = (e) => setBuildingNumber(e.target.value)
    
    const floorNumberId = () => {
      setFloorNumber(floorNumberAndId.split(",")[0])
      setFloorId(floorNumberAndId.split(",")[1])
    }

    const handleFloorChange = (e) => {setFloorNumberAndId(e.target.value); 
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const newRoomObj = {FloorId, BuildingNumber, RoomNumber}

        fetch('http://localhost:8080/api/room', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Access-Control-Request-Method": "POST"},
            body: JSON.stringify(newRoomObj)
        }).then(() => {
            console.log("Added that Ish")
        })
        // window.location.reload()
        handleClose()
        setRefresh(false)
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
          <Button variant="outline-dark" onClick={() => {setAllRoomsBF(null); handleClose()}}>X</Button>
        </Modal.Header>
        <Modal.Body>
        <Form id="addRoomForm" onSubmit={handleSubmit}>
            <Form.Group>
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
                    <option
                        value="1"
                    >
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
                    type="text"
                    value={RoomNumber}
                    placeholder="Enter a Room Number"
                    onChange={(e) => setRoomNumber(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <br></br>
            <ListGroup>
            {allRoomsBF && allRoomsBF.map((room) => (
                <ListGroup.Item>Room Number {room.RoomNumber} Already Exists and is {(room.Available ? "Available" :"Not Available")}</ListGroup.Item>
            ))}
            </ListGroup>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setAllRoomsBF(null); handleClose()}}>
            Close
          </Button>
          <Button type="Submit" variant="primary" onClick={handleSubmit}>
            Add Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
    )
  }

export default AddRoomForm