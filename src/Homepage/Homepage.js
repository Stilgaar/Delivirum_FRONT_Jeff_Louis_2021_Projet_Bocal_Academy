//Charement des CSS et dépendances
import "./Homepage.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Homepage({ isLog, setIsLog }) {

  const [postsList, setPostsList] = useState([]);
  const [user, setUser] = useState({pseudo : "", email : ""});
  let token = localStorage.getItem("token")


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
      
      {isLog && (postsList.map((posts) => (
        <div>
        <h2 className="titreThread">Thread des Critiques Tendances</h2>
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
