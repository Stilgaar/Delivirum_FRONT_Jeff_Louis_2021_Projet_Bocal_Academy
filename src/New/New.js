import "./New.css";
import { useEffect, useState } from "react";
import NewNews from "../NewNews/NewNews";

// Les news vont être mon premier coté "backoffice" pour tester le côté Admin. 
// Il y aura des fonctionnalités pour les users normaux, enfin ils pourront juste lire les nouvelles nouvelles
// quant à l'admin il aura la possiblité de poster quelque chose en plus, pour laisser plus de news.
//et ça c'est GOOD NEWS EVERYONE
// du coup, cette partie NEW.js sera visible par tout le monde
// par contre le newnews.js pour publier ne sera visilble QUE par le ou les admins.
// En cas de présence de plusieurs admins, j'ai aussi rajouté l'user comme ça 
// on pourra avoir l'username de l'admin en même temps
// sachant qu'Admin ce n'est qu'un simple boolean.


function New({ admin, user }) {


    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        fetch("https://delivriumback.osc-fr1.scalingo.io/posts/critic", {
        })
            .then((res) => res.json())
            .then((criticList) => {
                setPostsList(criticList)
            })
    }, [])

    return (

        <div className="News">
            <h3 className="titreNews">GOOD NEWS EVERYONE !!</h3>
            <div>
                {postsList.map((item) =>
                    <div>
                        <div>{item.adminTitle}</div>

                        <div>{item.adminPost}</div>

                        <div>{user.name}</div>
                    </div>
                )}
            </div>
            {admin && <NewNews user={user} admin={admin} /> }
        </div>


    )
}

export default New;