//Importation du css et des dépendances
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
//Importation des composants
import Navigation from './Navbar/Navbar'
import Login from './Login/Login'
import Signin from './Signin/Signin'
import Footer from './Footer/Footer'
import Splashscreen from './Splashscreen/Splashscreen';
import RGPD from './Rgpd/Rgpd'
import Contact from './Contact/Contact'
import Homepage from './Homepage/Homepage'
import Profil from './Profil/Profil';
import Search from './Search/Search';
import New from './New/New';
import Admin from './ADMIN/Admin';



function App() {

  // les constantes d'état
  // notez que isLog et setIsLog est une constant d'état que nous envoyons en props aux enfants de APP, c'est ce qui nous sert à faire l'affichage conditionnel sur plusieurs pages

  const [user, setUser] = useState({});
  const [isLog, setIsLog] = useState(null);
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(false);

  // au lancement de la page on check sur le token est là
  // on va aussi le checker dans le back
  // tous les useEffects qui suivent se déroulent une fois au chargement de la page. 
  // ils consistent essentiellement à voir si le token est présent et a changer l'état de isLog

  function getInfos() {
    let token = localStorage.getItem("token");

    return fetch("https://delivriumback.osc-fr1.scalingo.io/users/id", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json());
  }

  let currenttoken = localStorage.getItem("token")

function refrech() {
  fetch("https://delivriumback.osc-fr1.scalingo.io/users/info", {
    headers: { Authorization: `Bearer ${currenttoken}` }
  })
    .then((res) => res.json())
    .then((res) => {
      setUser(res)
      if (res.admin === true ) {
        setAdmin(true)
      }  } ) }

// la on va chopper le token dans le localStorage avec la fonction localStorage.getitem
// s'il y en a pas nous passons le setToken en false

useEffect(() => {
  let tokenFromLocalStorage = localStorage.getItem("token");
  if (tokenFromLocalStorage === null) {
    setToken(false)
    return;
  }
  setToken(tokenFromLocalStorage);
}, []);

// le setToken nous injecte le token existant (tokenfromlocalstorage) dans token. Ce qui nous permet de passer à l'useffect d'après. Je me demande d'ailleurs 
// si pour plus d'éfficacité il ne serait pas plus simple de faire plutôt un seul gros useEffect. 
// du coup après il check si le token est là
// nous avons rajouté un token === null et un token === false pour éviter un clignottement moche à un éventuel rechargement de page

useEffect(() => {
  if (token === null) return;
  if (token === false) {
    setUser({});
    setIsLog(false);
    return;
  }
  setIsLog(true)
  getInfos()
    .then((serverResponse) => setUser(serverResponse))
    .catch((err) => console.log(err));
}, [token]);


// une differente façon d'écrire le ternaire est avec le {isLog && } C'est un peu comme si on écrivais IF ça alors ça, mais sans else. 
// ça nous permet de ne pas afficher certains éléments à certains moments. 
// Je me demande d'ailleurs si ce ne serait pas plus facile de faire ça directement plutôt que dans les composants directement. 
// notez que le routeur de l'app sert à faire rejoindre tous les éléments dans chaque route/link que nous lui avons indiqué.

return (
  <div>
    <Router>
      <div className="main">
        <Navigation isLog={isLog} setIsLog={setIsLog} admin={admin} />
        <Switch>
          <Route exact path="/" >
            <Homepage isLog={isLog} setIsLog={setIsLog} user={user} admin={admin} refrech={refrech} />
            {isLog !== null && <Splashscreen isLog={isLog} setIsLog={setIsLog} />}
            {isLog !== null && <Login isLog={isLog} setIsLog={setIsLog} refrech={refrech} token={token} />}
          </Route>
          <Route path="/Homepage">
            <Homepage isLog={isLog} setIsLog={setIsLog} user={user} admin={admin} refrech={refrech}/>
          </Route>
          <Route path="/Login">
            {isLog !== null && <Login isLog={isLog} setIsLog={setIsLog} token={token}/>}
            {isLog !== null && <Splashscreen isLog={isLog} setIsLog={setIsLog} />}
          </Route>
          <Route path="/Signin">
            <Signin />
            <Splashscreen isLog={isLog} setIsLog={setIsLog} />
          </Route>
          <Route path="/Profil">
            <Profil user={user} admin={admin} />
          </Route>
          <Route path="/RGPD">
            <RGPD />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/New">
            <New user={user} admin={admin} />
          </Route>
          <Route path="/Critique">
            <Search user={user} admin={admin} />
          </Route>
          <Route path="/Admin">
            <Admin user={user} admin={admin} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  </div>
);
}

export default App;
