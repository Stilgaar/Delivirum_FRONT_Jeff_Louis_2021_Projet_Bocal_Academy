import "./Login.css";
import { Button, Form } from 'react-bootstrap';

function Login() {


  return (
    <Form className="loginBox">
      <Form.Group className="mb-3" >
        <Form.Label>Pseudo</Form.Label>
        <Form.Control type="text" placeholder="Entre ton pseudo" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" />
      </Form.Group>
      <Button className="boutonLogin">
        Valider
      </Button>
    </Form>
    
  );
}

export default Login;
