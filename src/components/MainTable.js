import React, { useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip, Button, Table } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css';

const MainTable = ({allPeople}) => {

    const [allRooms, setAllRooms] = useState(null)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setTimeout(() => {}, 0)
        return setReload(false)
    },[reload])

    useEffect(() => {
        fetch(`http://localhost:8080/api/room`)
          .then(res => {
            return res.json();
          })
          .then(data =>{
            setAllRooms(data)
          })
        },[])
        
        
        const reset = (clickedId) => {
            const clicked = clickedId.target.value
       
 
            const obj = JSON.stringify({"id": clicked, "Available": true})  
            const obj2 = JSON.stringify({"id": allPeople && allPeople.filter(person => person.RoomId == clicked)[0]["id"], "RoomId": null})
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
            window.location.reload()            
      }
      const buildTable = () => {
          let buildingCount = 0
          let floorCount = 0

          let res = allRooms && allRooms.map((room) => (
            <tr>
                {buildingCount !== room.BuildingNumber ?                
                    function x(){
                        buildingCount = room.BuildingNumber
                        return <td>Building Number {room.BuildingNumber}</td>            
                      }()
                    :
                <td></td>}
                <td>{buildingCount === room.BuildingNumber && floorCount !== room.FloorNumber || room.Id === 2 ?                
                    function x(){
                        floorCount = room.FloorNumber                        
                        return <td>Floor Number {room.FloorNumber}</td>            
                      }()                    
                    :
                <td></td>}
                </td>
                {room.Available === true ? 
                    <td style={{backgroundColor: "lightgreen"}}>Room Number {room.RoomNumber} is Available</td>
                    : <td style={{backgroundColor: "red"}}>                    
                      Room Number {room.RoomNumber}<OverlayTrigger
                    placement="top"
                    trigger="hover"
                    overlay={
                        <Tooltip id={`tooltip-remove-person`}>
                          Would You Like to Remove<br/>the Person From This Room?
                        </Tooltip>
                            }
                        >
                    <Button
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
                    <br/>Is NOT Available
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
                {allRooms && buildTable()}
                </tbody>
                
            </Table>      
            
        </div>
    )
}

export default MainTable