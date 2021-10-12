//Importation du css et des dépendances
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Importation des composants
import Navigation from './Navbar/Navbar'
import Login from './Login/Login'
import Signin from './Signin/Signin'
import Splashscreen from './Splashscreen/Splashscreen';


function App() {

  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Login />
            <Splashscreen />
          </Route>
          <Route path="/Signin">
            <Signin />
            <Splashscreen />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
