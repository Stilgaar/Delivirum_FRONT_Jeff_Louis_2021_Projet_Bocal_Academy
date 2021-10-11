import "./Signin.css";
import { Button, Form } from 'react-bootstrap';

function Signin() {

  return (
    <Form>
        <Form.Group className="mb-3" >
        <Form.Label>Pseudo</Form.Label>
        <Form.Control type="text" placeholder="Choisis ton pseudo" />
        </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Adresse email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
        <Form.Text className="text-muted">
          On garde ton email pour nous t'inquiètes!
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Crée ton compte
      </Button>
    </Form>
  );
}

export default Signin;