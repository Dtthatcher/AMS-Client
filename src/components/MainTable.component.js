import React, { useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css';

const MainTable = ({allPeople, setRefresh, refresh, rooms}) => {

    // const [allRooms, setAllRooms] = useState(null)
    // const [refresh, setRefresh] = useState(false)

    
    // useEffect(() => {
    //     fetch(`http://localhost:8080/api/room`)
    //       .then(res => {
    //         return res.json();
    //       })
    //       .then(data =>{
    //         setAllRooms(data)
    //       })
    //     },[refresh])
        
        
        const deleteRoom = (e) => {
            const clicked = e.target.value

            // const obj = JSON.stringify({"id": clicked})
            fetch(`http://localhost:8080/api/room/${clicked}`, {
                method: 'DELETE',
                headers: {"Access-Control-Request-Method": "DELETE"},
                // body: obj
            }).then(() => {
                console.log("Deleted that Ish  " )
            })
            setRefresh(false)
            // setRefresh(!refresh)
        }

        const reset = (clickedId) => {
            const clicked = clickedId.target.value           
 
            const obj2 = JSON.stringify({"id": allPeople && allPeople.filter(person => person.RoomId == clicked)[0]["id"], "RoomId": null})
        
            fetch('http://localhost:8080/api/people', {
                method: 'PUT',
                headers: { "Content-Type": "application/json", "Access-Control-Request-Method": "PUT"},
                body: obj2
            }).then(() => {
                console.log ("submitted also  " + obj2)
            })
            setRefresh(false)

      }
      const buildTable = () => {
          let buildingCount = 0
          let floorCount = 0

          let res = rooms && allPeople && rooms.map((room) => (  // render the table
            <tr>
                {buildingCount !== room.BuildingNumber ?   // render the building number. render empty cell until new building number
                    function x(){
                        buildingCount = room.BuildingNumber
                        floorCount = 0
                        return <td key="room.BuildingNumber">Building Number {room.BuildingNumber}</td>            
                      }()
                    :
                <td key={`empty building cell ${room.BuildingNumber}`}></td>}  
                {buildingCount === room.BuildingNumber && floorCount !== room.FloorNumber ?// render the floor number. render empty cell until new floor number           
                    function x(){
                        floorCount = room.FloorNumber                        
                        return <td>Floor Number {room.FloorNumber}</td>            
                      }()                    
                    :
                <td key={`emptyFloorCell ${room.floorNumber}`}></td>}                
                {room.Available === true ? // render the room based on availability. green yes, red no
                    <td style={{backgroundColor: "lightgreen"}} key="room.RoomNumber">
                    Room Number {room.RoomNumber}
                    <OverlayTrigger
                        key={`overlay for ${room.RoomNumber}`}
                        placement="top"
                        trigger="hover"
                        overlay={
                            <Tooltip id={`tooltip-remove-person`} key="toolTip">
                                You are about to Remove<br/>This Room From the Database
                            </Tooltip>
                        }
                        >
                        <Button
                            key={`delete for ${room.RoomNumber}`}
                            style={{position:"relative"}}
                            className="mb-2 float-sm-end"
                            size="sm"
                            id="toggle-check"
                            variant="outline-light"
                            value={room.Id}
                            onClick={deleteRoom}
                        >
                        X
                        </Button>
                    </OverlayTrigger>
                        <br/>is Available</td>
                    : <td style={{backgroundColor: "red"}} key="room.RoomNumber">                    
                        {allPeople && rooms && allPeople.map(
                            (person) => person.RoomId === room.Id ? 
                            `${person.Name} the ${person.Position} is in`
                            : null)}                    
                        <OverlayTrigger
                            key={`overlay for ${room.RoomNumber}`}
                            placement="top"
                            trigger="hover"
                            overlay={
                                <Tooltip id={`tooltip-remove-person`} key="toolTip">
                                    You are about to Remove<br/>the Person From This Room
                                </Tooltip>
                            }
                        >
                        <Button
                            key={`reset for ${room.RoomNumber}`}
                            style={{position:"relative"}}
                            className="mb-2 float-sm-end"
                            size="sm"
                            id="toggle-check"
                            variant="outline-light"
                            value={room.Id}
                            onClick={reset}
                        >
                        X
                        </Button>
                        </OverlayTrigger>
                    <br/>
                        Room Number {room.RoomNumber}
                    </td>

                }
            </tr>            
          ))
          return res
      }

    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Building</th>
                        <th>Floor</th>
                        <th>Room Availability</th>                        
                    </tr>
                </thead>
                <tbody>
                {rooms && allPeople && buildTable()}
                </tbody>
                
            </Table>      
            
        </div>
    )
}

export default MainTable