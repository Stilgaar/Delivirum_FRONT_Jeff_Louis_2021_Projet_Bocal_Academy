import "./NewCrit.css";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

function NewCrit() {

  const [title, setTitle] = useState();
  const [critic, setCritic] = useState();
  const [user, setUser] = useState({pseudo : "", email : ""});
  let token = localStorage.getItem("token")
  const history = useHistory()


  let currentUser = user.pseudo

  useEffect(() => {
    fetch("http://localhost:5000/users/info", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
     .then((users) => {
       setUser(users)
     })
    }, [])

  function handleClick() {

    let click = { title, critic, currentUser };

    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(click),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('teub');
        history.push("/Homepage")});
  }
  
    function handleInput(e, setter) {
    setter(e.target.value);
  }


  return (
    <div>
      <Form className="newCrit-box">
        <h2 className="newCritH2">Balance ta critique!</h2>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Titre du Livre"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Titre"
            name="title"
            onInput={(e) => handleInput(e, setTitle)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Ta critique">
          <Form.Control
            as="textarea"
            placeholder="Ta critique"
            style={{ height: "200px" }}
            name="critic"
            onInput={(e) => handleInput(e, setCritic)}
          />
        </FloatingLabel> 
        <div className="ladiv">Salut {user.pseudo}, ton commentaire sera visible par les autres </div>
        <Button className="boutonNewCrit" onClick={() => handleClick()}>
          Valider
        </Button>
      </Form>
    </div>
  );
}

export default NewCrit;
