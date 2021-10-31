import './NewNews.css';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { FloatingLabel, Form, Button } from "react-bootstrap";

function NewNews({ admin, user }) {

    let token = localStorage.getItem("token");

    const [adminTitle, setAdminTitle] = useState();
    const [adminPost, setAdminPost] = useState();
    const history = useHistory()
    let currentUser = user.pseudo

    function handleClick() {

        let click = { adminPost, adminTitle, currentUser }

        fetch("https://delivriumback.osc-fr1.scalingo.io/posts/admin", {
            method: "POST",
            body: JSON.stringify(click),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("console.log du json du fetch", json)
                history.push("/Homepage")
            });
    }

    function handleInput(e, setter) {
        setter(e.target.value);
    }

    return (

        <div className="NewsNews">
            <Form>
                <h3>Publie une nouvelle News !</h3>
                <FloatingLabel controlId="floatingTextarea" label="News Alléchante" className="mb-3" >
                    <Form.Control as="textarea" placeholder="News Alléchante" name="adminTitle" onInput={(e) => handleInput(e, setAdminTitle)} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" label="Fait rêver le monde">
                    <Form.Control as="textarea" placeholder="Fait rêver le monde" style={{ height: "200px" }} name="adminPost" onInput={(e) => handleInput(e, setAdminPost)} />
                </FloatingLabel>
                      <Button className="boutonNewCrit" onClick={() => handleClick()}>
                    Envoyer quand même !
                </Button>
            </Form>
        </div>
    )
}

export default NewNews;