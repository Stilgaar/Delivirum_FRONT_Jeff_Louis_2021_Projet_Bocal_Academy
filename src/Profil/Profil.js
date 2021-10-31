import "./Profil.css";
import { useEffect, useState } from "react"


// le profil va chercher les informations sur le porteur de token
// pour cette raison on envoi le Authorisation directement dans le back pour qu'il puisse décoder le token là bas. 
// pour plus de simplification maintenant ça passe par l'APP.JS et tout est passé en props
// ça évitera également le fait de réitérer ces fonctions un peu partout. On en profite pour passer admin également à ce moment là
// c'est un state que nous récupérons de user de toutes manières

function Profil({user, admin}) {

  const [postsList, setPostsList] = useState([]); // pour plus tard
  const [bouquins, setBouquins] = useState([]); // pour je ne sais plus quand ?

  // je vais aller chercher les posts aussi, je vais mapper le pseudo de l'utilisateur avec le pseudo relié aux différentes critiques.
  // si elles sont équivalentes je les publie dans la box correspondante. 
  // notez que je repasserais probablement par un autre useState.

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
      <div className="boxProfil">
        <div><h2 className="titreProfil">Informations sur mon Profil</h2></div>
        <div> <span className="spanProf">Pseudo</span> : {user.pseudo}</div>
        <div> <span className="spanProf">Mail</span> : {user.email} </div>
        <div> <span className="spanProf">Password</span> : Pas de Placeholder pour le mot de passe nan nan</div>
        <div> <span className="spanProf">Des Features en plus</span> : mais ce sera un jour peut-être </div>
        {admin && <div> <span className="spanProf">Admin</span> Oui </div> }
      </div>
      <div className="boxProfil">
        <div><h2 className="titreProfil">Tes posts persos</h2></div>
        <div> En developpement </div>
        <div> </div>
      </div>
    </div>
  )
}

export default Profil;