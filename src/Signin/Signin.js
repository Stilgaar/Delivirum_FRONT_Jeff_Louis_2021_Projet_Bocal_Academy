import "./Signin.css";
import { Button, Form } from 'react-bootstrap';
import { useState } from "react";

function Signin() {

  const [pseudo, setPseudo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifPassword, setverifPassword] = useState();

  const handleSubmit = async (e) => {
    let submit = await { pseudo, email, password, verifPassword }
    return fetch('http://localhost:5000/users'
      , {
        method: 'POST',
        body: JSON.stringify(submit),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => res.json())
      .then(data => console.log(data));
  }

  //Fonction Callback sur les inputs du formulaire
  function handleInput(e, setter) {
    setter(e.target.value)
  }

  return (
    <Form className="signInBox">
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Pseudo</span></Form.Label>
        <Form.Control className="test" type="text" placeholder="Choisis ton Pseudo" name="pseudo" onInput={(e) => handleInput(e, setPseudo)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Adresse email</span></Form.Label>
        <Form.Control type="email" placeholder="Roger@Bocal.Academy" name="email" onInput={(e) => handleInput(e, setEmail)} />
        <Form.Text className="text-muted">
          <span className="lightSign"> On garde ton email pour nous t'inquiètes ! </span>
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Mot de passe</span></Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" name="password" onInput={(e) => handleInput(e, setPassword)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Veuillez verifier votre mot de passe</span></Form.Label>
        <Form.Control type="password" placeholder="Confirmer le mot de passe" name="verifPassword" onInput={(e) => handleInput(e, setverifPassword)} />
      </Form.Group>
      <Button className="boutonSignin" onClick={() => handleSubmit()}>
        Crée ton compte
      </Button>
    </Form>
  );
}

export default Signin;