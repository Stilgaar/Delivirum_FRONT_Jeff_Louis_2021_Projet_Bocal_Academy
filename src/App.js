//Importation du css et des dépendances
import './App.css';
import { useState } from "react";
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

  const [isLog, setIsLog] = useState(false);

  return (
    <div>
      <Router>
        <Navigation isLog={isLog} setIsLog={setIsLog} />
        <Switch>
          <Route exact path="/">
            <Login isLog={isLog} setIsLog={setIsLog} />
            <Splashscreen />
          </Route>
          <Route path="/Signin">
            <Signin />
            <Splashscreen />
          </Route>
          <Route path="/RGPD">
            <RGPD />
          </Route>
          <Route path="/Homepage">
            <Homepage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
