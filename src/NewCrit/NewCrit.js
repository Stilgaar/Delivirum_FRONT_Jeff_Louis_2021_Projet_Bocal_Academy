import "./NewCrit.css";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useState } from "react";

function NewCrit() {
  const [title, setTitle] = useState();
  const [critic, setCritic] = useState();

  function handleInput(e, setter) {
    setter(e.target.value);
  }

  function handleClick() {
    let click = { title, critic };
    console.log(click);

    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(click),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
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
        <Button className="boutonNewCrit" onClick={() => handleClick()}>
          Valider
        </Button>
      </Form>
    </div>
  );
}

export default NewCrit;
