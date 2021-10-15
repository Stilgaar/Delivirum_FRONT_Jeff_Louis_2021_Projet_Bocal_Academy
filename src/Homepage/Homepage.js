//Charement des CSS et dépendances
import "./Homepage.css";
import { useState } from "react";
import { Button } from "react-bootstrap";

function Homepage({ isLog, setIsLog }) {

  const [postsList, setPostsList] = useState([]);

  const [title, setTitle] = useState();
  const [critic, setCritic] = useState();

  fetch("http://localhost:5000/posts/critic", {
  })
  .then((res) =>res.json())
  .then((json) => {
    console.log(json)})
  

  return (
    <div>
      {isLog ? (
        <div className="post-card">
          <div className="post-content">
            <div className="post-title">
              <h2 className="titreCrit">Placeholder : Critique Title</h2>
            </div>
            <div className="post-critic">
              <div className="laCrit">PlaceHoder Critique</div>
            </div>
            <div className="commentCrit">
              <form>

                <label>Quelque chose à dire ?</label>
                <input type="text" name="commentaire" placeholder="Send Salt" />
                <Button className="buttonCrit">
                  Envoyer ton commentaire !
                </Button>

              </form>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Homepage;
