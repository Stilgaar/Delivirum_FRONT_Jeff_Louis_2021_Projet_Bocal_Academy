import "./Signin.css";
import { Button, Form } from 'react-bootstrap';
import { useState } from "react";

function Signin() {

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit([...submit, { pseudo, email, password }])
    // Fonctionnement de la fonction Fetch, ouais c'est comme ça, apparement faut pas chercher
    // c'est un peu comme la fonction map, c'est comme ça, puis c'est comme ça.
    // déjà 'fetch' en lui même je le trouve très mauvais comme mot pour notre cas !
    // elle t'indique donc OU du dois fetcher, la methode, ce qu'elle doit envoyer et le headers,
    // bha c'est comme ça, faut pas chercher.
    return fetch('http://localhost:5000/user', {
      method: 'POST',
      body: JSON.stringify(submit),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
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
        <Form.Label>Pseudo</Form.Label>
        <Form.Control className="test" type="text" placeholder="Choisis ton pseudo" onInput={(e) => handleInput(e, setPseudo)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Adresse email</Form.Label>
        <Form.Control type="email" placeholder="Email" onInput={(e) => handleInput(e, setEmail)} />
        <Form.Text className="text-muted">
          On garde ton email pour nous t'inquiètes!
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" onInput={(e) => handleInput(e, setPassword)} />
      </Form.Group>
      <Button className="boutonSignin" type="submit" onClick={() => handleSubmit()}>
        Crée ton compte
      </Button>
    </Form>
  );
}

export default Signin;