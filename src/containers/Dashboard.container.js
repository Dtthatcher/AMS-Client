import React, { useState, useEffect} from "react";

import {Button, Container, ListGroup, Navbar, Nav} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css';

import AddRoomForm from "../components/AddRoomForm";
import AddPersonForm from "../components/AddPersonForm";
import MainTable from "../components/MainTable.component"

function Dashboard() {

  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showPersonForm, setShowPersonForm] = useState(false);
  
  const [rooms, setRooms] = useState(null)
  const [allPeople, setAllPeople] = useState(null)

  const handleCloseRoomForm = () => setShowRoomForm(false);
  const handleShowRoomForm = () => setShowRoomForm(true);

  const handleClosePersonForm = () => setShowPersonForm(false);
  const handleShowPersonForm = () => setShowPersonForm(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/room')
      .then(res => {
        return res.json();
      })
      .then(data =>{
        setRooms(data)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/api/people')
      .then(res => {
        return res.json();
      })
      .then(data =>{
        setAllPeople(data)
      })
  }, [])



  return (
    
    <div syle={{display: 'block', width: "100%", padding: 0 }}>
      <Navbar fixed="top" bg="light" variant="light"  style={{width: "100%", padding: "0"}}>
        <Container>
          <Navbar.Brand>AMS Interview Demo</Navbar.Brand>
            <Nav className="justify-content-end">
              <Button variant="primary" onClick={handleShowRoomForm}  style={{margin: "20px"}}>
              Add New Room
              </Button>
              <Button variant="primary" onClick={handleShowPersonForm} style={{margin: "20px" }}>
              Assign Person To Room
              </Button>          
            </Nav>
          </Container>
      </Navbar>

      <div>
      <Container style={{marginTop: "100px"}}>
        <AddRoomForm handleClose={handleCloseRoomForm} rooms={rooms} show={showRoomForm} />
        <AddPersonForm 
          handleClose={handleClosePersonForm} 
          rooms={rooms} 
          show={showPersonForm} 
          />
        {allPeople &&
        <MainTable
          allPeople={allPeople} 
          />
        }
        <br/>
        <h2><strong>Who's Available for a Room!!</strong></h2>
        <ListGroup style={{width: "300px"}}>{rooms && allPeople && allPeople.map((person) => (
          rooms.map((el) => (
            el.Id === person.RoomId ? <ListGroup.Item style={{backgroundColor: "lightblue", color: "red"}}>
            {person.Name} the {person.Position} is in Building {el.BuildingNumber} Floor {el.FloorNumber} Room {el.RoomNumber}</ListGroup.Item> : null
          ))
        ))        
        }
        </ListGroup>
        <ListGroup style={{width: "40%", margin:"auto"}}>
        {allPeople && allPeople.map((peeps) => (
          peeps.RoomId ? null : <ListGroup.Item style={{backgroundColor: "lightgreen"}}>{peeps.Name} the {peeps.Position} is homeless</ListGroup.Item>))}
        </ListGroup></Container></div>            
    </div>
    
  )
}

export default Dashboard