import "./Comment.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { Button } from 'react-bootstrap';

// nous avons fait un composant séparé pour les commentaires et les critiques pour pouvoir plus facilement récupérer leurs ID et donc leurs assigner les differents commentaires
// nous nous sommes rendus compte, après avoir tout mis sur homepage en un block que ce ne serait pas possible
// de ce fait aussi nous allons crée une autre route, ainsi qu'une collection spécialement pour les commentaires
// en plus de celle que nous avons déjà pour les critiques et les users. 

function Comment({ currentPost }) {


    // constante d'état récuperant le commentaire dans le formulaire
    const [comment, setComment] = useState([]);

    // constante d'état récuperant les commentaires dans la DB
    const [newComment, setNewComment] = useState([]);

    // pour récuperer le nom de l'user et le foutre ou on veut
    const [user, setUser] = useState({ pseudo: "", email: "" });
    const history = useHistory()

    let currentUser = user.pseudo

    let token = localStorage.getItem("token")

    function handleClick() {

        let envoyerComm = { comment, currentUser, currentPost }

        fetch("http://localhost:5000/comment", {
            method: "POST",
            body: JSON.stringify(envoyerComm),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then(() => refrech())
    }

    function refrech() {

        let envoyerComm = { currentPost }
        fetch("http://localhost:5000/comment/get", {
            method: "POST",
            body: JSON.stringify(envoyerComm),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((comments) => {
                setNewComment(comments)
                console.log(comments)
            })

    }

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


    useEffect(() => {
        refrech()
    }, [])

    function handleInput(e, setter) {
        setter(e.target.value);
    }

    return (

        <div>
            <form>
                <div className="commentCrit">
                    <input type="text" name="commentaire" placeholder="Quelque chose à rajouter ?" onInput={(e) => handleInput(e, setComment)} />
                    <Button className="buttonCrit" onClick={() => handleClick()}>
                        Envoye ton commentaire !
                    </Button>
                </div>
            </form>
            {newComment.map((item) =>
                <div className="commentList">
                    <div>
                        <div className="commentaire"> <span className="currentUser">{item.currentUser}</span> à dit ça : {item.comment}</div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Comment;