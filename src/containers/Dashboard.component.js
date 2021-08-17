import React, { useState, useEffect } from "react";

import {Button, ListGroup} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css';

import AddRoomForm from "../components/AddRoomForm";
import AddPersonForm from "../components/AddPersonForm";
import MainTable from "../components/MainTable"

function Dashboard() {

  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showPersonForm, setShowPersonForm] = useState(false);
  
  const [rooms, setRooms] = useState(null)
  const [allPeople, setAllPeople] = useState(null)
  
  const [personName, setPersonName] = useState(null)
  const [personPosition, setPersonPosition] = useState(null)

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


  const personCallback = (getName, getPosition) => {
    setPersonName(getName)
    setPersonPosition(getPosition)
  }


  return (
    <div>
    <Button variant="primary" onClick={handleShowRoomForm}  style={{margin: "20px" }}>
      Add New Room
      </Button>
    <Button variant="primary" onClick={handleShowPersonForm} style={{margin: "20px" }}>
      Assign Person To Room
    </Button>
    
        <AddRoomForm handleClose={handleCloseRoomForm} rooms={rooms} show={showRoomForm} />
        <AddPersonForm 
          handleClose={handleClosePersonForm} 
          rooms={rooms} 
          show={showPersonForm} 
          personCallback={personCallback} 
          />
        {allPeople &&
        <MainTable
          personName={personName} 
          personPosition={personPosition}  
          allPeople={allPeople} 
          />
        }
        <ListGroup>{rooms && allPeople && allPeople.map((person) => (
          rooms.map((el) => (
            el.Id === person.RoomId ? <ListGroup.Item style={{backgroundColor: "lightblue", color: "red"}}>
            {person.Name} the {person.Position} is in Building {el.BuildingNumber} Floor {el.FloorNumber} Room {el.RoomNumber}</ListGroup.Item> : null
          ))
        ))        
        }
        </ListGroup>
        <ListGroup>
        {allPeople && allPeople.map((peeps) => (
          peeps.RoomId ? null : <ListGroup.Item style={{backgroundColor: "lightgreen"}}>{peeps.Name} the {peeps.Position} is homeless</ListGroup.Item>))}
        </ListGroup>               
    </div>
  )
}

export default Dashboard