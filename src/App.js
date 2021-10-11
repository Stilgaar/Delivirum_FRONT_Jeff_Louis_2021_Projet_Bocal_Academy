//Importation du css et des dépendances
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Importation des composants
import Login from './Login/Login'
import Signin from './Signin/Signin'


function App() {

  return (
    <div>
<Router>
    <Switch>
      <Route path="/Login">
        <Login/>
      </Route>
      <Route path="/Signin">
        <Signin/>
      </Route>
    </Switch>

</Router>
  </div>
  );
}

export default App;
