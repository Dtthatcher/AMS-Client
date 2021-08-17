import React, {useState, useEffect} from "react"
import {Container, Col, Form, Button} from "react-bootstrap"

const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(null)
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/user`)
    .then(res => {
      return res.json();
    })
    .then(data =>{
      setUsers(data)
    })    
  },[])

  const validateForm = () => {
    users && users.forEach((user) => username === user.username && password === user.password ? props.history.push('/dashboard') : props.history.push('/'))    
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    
   }

return (
  <Container>
          <Form>
              <h1>Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Username"
                  value = {username}
                  style={{"width": "300px", "margin":"auto"}}
                  onChange={(e) => setUsername(e.target.value)}
                  />                
              </Form.Group>    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password </Form.Label>
                  <Form.Control 
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  style={{"width": "300px", "margin":"auto"}}
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </Form.Group>            
          <Button 
            variant="primary" 
            // type="submit"             
            onClick={validateForm}>
          Login
          </Button>
        </Form>

  </Container>

)}

export default Login