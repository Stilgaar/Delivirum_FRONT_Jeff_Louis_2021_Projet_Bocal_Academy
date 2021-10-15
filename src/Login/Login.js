import "./Login.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useHistory} from "react-router-dom";

function Login({ isLog, setIsLog, token, setToken }) {
  // Nos petites constantes d'état qui vont bient
  const [pseudo, setPseudo] = useState();
  const [password, setPassword] = useState();
  const history = useHistory()

  const handleClick = () => {
    let submit = { pseudo, password };

    if(token == true) {
      history.push("/");
    }

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(submit),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        localStorage.setItem("token", json.token); // <--- entrée du token dans le localStorage pour pouvoir le récup dans les autres composants
        setIsLog(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  // LA SEXYYY HOT FUNCTION
  function handleInput(e, setter) {
    setter(e.target.value);
  }

  return (
    <div>
    {isLog === false && 
        <Form className="loginBox">
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="labelLog">Pseudo</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Entre ton pseudo"
              onInput={(e) => handleInput(e, setPseudo)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="labelLog">Mot de passe</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              onInput={(e) => handleInput(e, setPassword)}
            />
          </Form.Group>
          <Button className="boutonLogin" onClick={() => handleClick()}>
            Valider
          </Button>
        </Form> 
        }
      {isLog === true && <div></div>
      }
      
        
      
    </div>
  );
}

export default Login;
