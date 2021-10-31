import './Critic.css'
import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";

// nous avons fait un composant séparé pour les commentaires et les critiques pour pouvoir plus facilement récupérer leurs ID et donc leurs assigner les differents commentaires
// nous nous sommes rendus compte, après avoir tout mis sur homepage en un block que ce ne serait pas possible
// de ce fait aussi nous allons crée une autre route, ainsi qu'une collection spécialement pour les commentaires
// en plus de celle que nous avons déjà pour les critiques et les users. 

function Critic({refrech}) {

    const [postsList, setPostsList] = useState([]);

    // Sinon pour le moment, elle utilise seulement (et simplement) un useEffect au chargement de la page pour pouvoir topper tous les titres/critiques et personnes ayant envoyé le commentaire.
    // ouais, rappellez vous, dans le composant NewCrit.js, nous récuperions le pseudo, que nous injections dans la deuxième collection de la BD

    useEffect(() => {
        fetch("https://delivriumback.osc-fr1.scalingo.io/posts/critic", {
        })
            .then((res) => res.json())
            .then((criticList) => {
                setPostsList(criticList);
                refrech()
            })
    }, [])

    // nous allons d'une part chercher qui est connecté avec son token. 
    // nous ne l'utilisons pas encore mais ce sera important pour celui qui laissera un commentaire
    // comme ça nous pourrons utliser le user.pseudo pour faire un current user au moment de l'envoi du comm dans la base de données

    return (
        <div>
            <h2 className="titreThread">Thread des Critiques Tendances</h2>
            {postsList.map((item) =>
                <div>
                    {!item.adminPost &&
                        <div className="post-card">
                            <div className="post-content">
                                <div className="googleStuff">
                                    {item?.thumbnail && <img className="thumb" src={`${item.thumbnail}`} alt="livre dans la critique" />}
                                    <div className="googleAgain">
                                        <div className="googleTitles">
                                            {item?.title && <p className="laCrit2"><span className="titleCritHome">Titre de la critique </span> : {item.title} </p>}
                                            {item?.livre && <p className="laCrit2"><span className="titleCritHome">Livre </span> : {item.livre} </p>}
                                            {item?.auteur && <p className="laCrit2"><span className="titleCritHome">Par </span> : {item.auteur} </p>}
                                        </div>
                                        {item?.resume && <p className="laCrit2"><span className="titleCritHome">Resumé pour se resituer </span> : {item.resume} </p>}
                                    </div>
                                </div>
                                <div className="post-critic">
                                    <div className="laCrit">{item.critic}</div>
                                    <div className="critCom">Cette critique vous a été proposé par {item.currentUser}</div>
                                </div>
                            </div>
                            <Comment currentPost={item._id} />
                        </div>}
                </div>
            )}  </div>
    )
}

export default Critic;
