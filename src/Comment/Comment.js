import "./Comment.css";
import { useEffect, useState } from "react";


// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { Button } from 'react-bootstrap';

// nous avons fait un composant séparé pour les commentaires et les critiques pour pouvoir plus facilement récupérer leurs ID et donc leurs assigner les differents commentaires
// nous nous sommes rendus compte, après avoir tout mis sur homepage en un block que ce ne serait pas possible
// de ce fait aussi nous allons crée une autre route, ainsi qu'une collection spécialement pour les commentaires
// en plus de celle que nous avons déjà pour les critiques et les users. 

function Comment() {


    // j'ai du faire un newComment
    const [comment, setComment] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const [user, setUser] = useState({ pseudo: "", email: "" });
    let token = localStorage.getItem("token")
    let currentUser = user.pseudo

    function handleClick() {

        let envoyerComm = { comment, currentUser }

        fetch("http://localhost:5000/comment", {
            method: "POST",
            body: JSON.stringify(envoyerComm),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
        )
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

        fetch("http://localhost:5000/comment/get", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((comments) => {
                setNewComment(comments)
            })

    }, [])

    function handleInput(e, setter) {
        setter(e.target.value);
    }

    return (

        <div className="commentCrit">
            <form>
                <label>Quelque chose à rajouter ?</label>
                <input type="text" name="commentaire" placeholder="Tape ton commentaire ici" onInput={(e) => handleInput(e, setComment)} />
                <Button className="buttonCrit" onClick={() => handleClick()}>
                    Envoyer ton commentaire !
                </Button>
            </form>
            {newComment.map((item) =>
                <div className="commentList">
                    <div>
                        <p>{item.currentUser} à dit ça : {item.comment}</p>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Comment;