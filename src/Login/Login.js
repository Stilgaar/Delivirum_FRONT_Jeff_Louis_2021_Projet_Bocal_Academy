import "./Login.css";
import { Button, Form } from 'react-bootstrap';
import { useState } from "react";


function Login({ isLog, setIsLog }) {

  // Nos petites constantes d'état qui vont bient
  const [pseudo, setPseudo] = useState();
  const [password, setPassword] = useState();

  const token = localStorage.getItem("token");


  const handleClick = () => {
    
    let submit = { pseudo, password, token }

     fetch('http://localhost:5000/users/login', {
      method: 'POST',
      body: JSON.stringify(submit),
      headers: {
        'Content-Type': 'application/json'
      },   
     })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setIsLog(true)
          document.location.replace('/');

        } else {
          alert(`Mauvais mot de passe 
                  ou Mauvais Pseudo`)
        }
      }
    )
  }

  // LA SEXYYY HOT FUNCTION
  function handleInput(e, setter) {
    setter(e.target.value)
  }

  return (
    <Form className="loginBox">
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelLog">Pseudo</span></Form.Label>
        <Form.Control type="text" placeholder="Entre ton pseudo"  onInput={(e) => handleInput(e, setPseudo)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelLog">Mot de passe</span></Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" onInput={(e) => handleInput(e, setPassword)} />
      </Form.Group>
      <Button className="boutonLogin" onClick={() => handleClick()}>
        Valider
      </Button>
    </Form>
  );
}

export default Login;
