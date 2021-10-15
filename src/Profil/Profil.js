import "./Profil.css";
import { useEffect, useState } from "react"

function Profil() {

    const [user, setUser] = useState({pseudo : "", email : ""});
    let token = localStorage.getItem("token")

    useEffect(() => {
        fetch("http://localhost:5000/users/info", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => res.json())
         .then((res) => {
           setUser(res)
         })

         console.log(user)
        }, [])


    return (
        <div className="boxProfil">
            <div><h2 className="titreProfil">Informations sur mon Profil</h2></div>

            <div>Pseudo : {user.pseudo}</div>
            <div>Mail : {user.email} </div>
            <div>Nan nan : Pas de Placeholder pour le mot de passe nan nan</div>


        </div>
    )
}

export default Profil; 