//Importation du css et des dépendances
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Importation des composants
import Navigation from './Navbar/Navbar'
import Login from './Login/Login'
import Signin from './Signin/Signin'
import Footer from './Footer/Footer'
import Splashscreen from './Splashscreen/Splashscreen';
import RGPD from './Rgpd/Rgpd'
import Contact from './Contact/Contact'
import Homepage from './Homepage/Homepage'


function App() {

  const [user, setUser] = useState({});
  const [isLog, setIsLog] = useState(false);
  const [token, setToken] = useState(null);

  const isLoggedIn = token !== null;

  function getInfos() {
    let token = localStorage.getItem("token");
  
    return fetch("http://localhost:5000/users/infos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
  

  useEffect(() => {
    let tokenFromLocalStorage = localStorage.getItem("token");
    setToken(tokenFromLocalStorage);
  }, []);

  useEffect(() => {
    if (token === null) {
      setUser({});
      return;
    }
    getInfos()
    .then((serverResponse) => setUser(serverResponse))
    .catch((err) => console.log(err));
  }, [token]);


  return (
    <div>
      <Router>
        <Navigation isLog={isLog} setIsLog={setIsLog} />
        <Switch>
          <Route exact path="/" >
            <Homepage isLog={isLog} />
            <Splashscreen isLog={isLog} setIsLog={setIsLog}/>
            <Login isLog={isLog} setIsLog={setIsLog} />
          </Route>
          <Route path="/Login">
            <Login isLog={isLog} setIsLog={setIsLog} />
            <Splashscreen isLog={isLog} setIsLog={setIsLog} />
          </Route>
          <Route path="/Signin">
            <Signin />
            <Splashscreen isLog={isLog} setIsLog={setIsLog} />
          </Route>
          <Route path="/RGPD">
            <RGPD />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
