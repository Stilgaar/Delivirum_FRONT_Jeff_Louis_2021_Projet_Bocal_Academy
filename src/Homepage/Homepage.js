//Charement des CSS et dépendances
import "./Homepage.css";
import { useEffect, useState } from "react";

// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { Button } from "react-bootstrap";

function Homepage({ isLog, setIsLog }) {


  // la HomePage est la page ou les gens arrivent lorsqu'ils sont connectés.
  // c'est aussi la page vers laquelle ils sont redirigés une fois qu'ils ont envoyé une critique. 
  // elle se situe sur deux routes : /homepage et / pour des soucis de navigation.

  const [postsList, setPostsList] = useState([]);
  const [user, setUser] = useState({pseudo : "", email : ""});
  let token = localStorage.getItem("token")

  // nous allons d'une part chercher qui est connecté avec son token. 
  // nous ne l'utilisons pas encore mais ce sera important pour celui qui laissera un commentaire
  // comme ça nous pourrons utliser le user.pseudo pour faire un current user au moment de l'envoi du comm dans la base de données

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

  // Sinon pour le moment, elle utilise seulement (et simplement) un useEffect au chargement de la page pour pouvoir topper tous les titres/critiques et personnes ayant envoyé le commentaire.
  // ouais, rappellez vous, dans le composant NewCrit.js, nous récuperions le pseudo, que nous injections dans la deuxième collection de la BD

  useEffect(() => {

    fetch("http://localhost:5000/posts/critic", {
    })
      .then((res) => res.json())
      .then((criticList) => {
        setPostsList(criticList)
      })

  }, [])

  return (
    <div>
      {isLog && <h2 className="titreThread">Thread des Critiques Tendances</h2>  }
      {isLog && (postsList.map((posts) => (
        <div>
        <div className="post-card">
          <div className="post-content">
            <div className="post-title">
              <h2 className="titreCrit">{posts.title}</h2>
            </div>
            <div className="post-critic">
              <div className="laCrit">{posts.critic}</div>
              <div className="critCom">Ce commentaire vous a été proposé par {posts.currentUser}</div>
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
            </div></div>
        </div>)))}
    </div>

  );
}

export default Homepage;
