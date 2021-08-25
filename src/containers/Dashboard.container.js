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
  const [refresh, setRefresh] = useState(true)

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
  }, [refresh, showPersonForm])

  useEffect(() => {
    fetch('http://localhost:8080/api/people')
      .then(res => {
        return res.json();
      })
      .then(data =>{
        setAllPeople(data)        
      })
      setRefresh(true)
  }, [refresh, showPersonForm])

  const handleShowTable = () => {
    const x = document.getElementById("mainTable");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
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
              <Button variant="primary" onClick={handleShowTable} style={{margin: "20px" }}>
              Show Main Table
              </Button>                
            </Nav>
          </Container>
      </Navbar>

      <div>
      <Container style={{marginTop: "100px"}}>
        <AddRoomForm 
          handleClose={handleCloseRoomForm} 
          rooms={rooms} 
          show={showRoomForm}
          refresh={refresh}
          setRefresh={setRefresh}
          />
        <AddPersonForm 
          handleClose={handleClosePersonForm} 
          rooms={rooms}
          refresh={refresh}
          setRefresh={setRefresh}
          show={showPersonForm} 
          />
        <div id="mainTable" style={{display: "none"}}>
        {allPeople && rooms && refresh &&
        <MainTable
          allPeople={allPeople} rooms={rooms} setRefresh={setRefresh} refresh={refresh}
          />
        }
        <br/>
        <h2><strong>Who's Available for a Room!!</strong></h2>
        <ListGroup style={{width: "40%", margin:"auto"}}>{rooms && allPeople && allPeople.map((person) => (
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
        </ListGroup>
        </div>
        </Container>
        </div>            
    </div>
    
  )
}

export default Dashboard