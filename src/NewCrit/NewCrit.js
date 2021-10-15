import "./NewCrit.css";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useState } from "react"



// FONCTION POUR ALLER TOP LINFORMATION DANS LE BACK 
// enfin je crois
// mais j'arrive pas a sortir les infos !!!
// JE ME DETTEESSSTTTE 
// TODO : check une nouvelle route, avec genre /users/recup 
// avec la fonction reqsens(req.body)
// voir si ça marche
// si ça marche, la rappeller ici, puis chopper les infos utilisateurs
// ensuite les injecter en fetch via le post un peu plus bas
// faire un peu de css pour se détendre
// ou mourir
// Je suis AFK Loïs, parti prendre l'air
// MUCH LOVE <3 <3 <
function NewCrit() {

  const [title, setTitle] = useState();
  const [critic, setCritic] = useState();

  function handleInput(e, setter) {
    setter(e.target.value);
  }
  function handleClick() {

    let click = { title, critic };

    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(click),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('teub')
        console.log(json);
      });
  }

  fetch("http://localhost:5000/users/info", {})
    .then((res) => res.json())
    .then((user) => { console.log(user) })

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
