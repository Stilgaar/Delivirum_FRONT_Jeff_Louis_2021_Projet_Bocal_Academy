import "./NewCrit.css";

// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// dans cet element nous alons chopper l'user d'un côté via son token
// ce sera décodé dans le back pour qu'on puisse récupéré son pseudo
// une fois qu'on a le pseudo, on peut le rajouter dans une petite ligne, pour qu'il sache que ce qu'il dira pourra être retenu contre lui
// mais le currentUser/user.pseudo va aussi nous servir à l'injecter dans le commentaire. 
// comme ça chaque commentaire sera lié au pseudo et nous pourrons plus facilement sortir les informations en cas de besoin

function NewCrit() {

  // récuperation des données dans le formulaire
  const [title, setTitle] = useState();
  const [critic, setCritic] = useState();

  // récuperation d'utilisateur et son token pour lui dire coucou
  const [user, setUser] = useState({ pseudo: "", email: "" });
  let currentUser = user.pseudo
  let token = localStorage.getItem("token")

  // déplacer l'utilisateur sur les critiques une fois qu'il a terminé.
  const history = useHistory()
  
  // ce qui se passe au moment du click. 
  // il récupère le titre, la critic et le currentUser de l'useEffect d'au dessus, il va la poster directement dans la BD
  // notez qu'il serait utile de faire de même lors de la création de commentaire au niveau du CurrentUser.
  // notez aussi que c'est dans le même coin de la BD donc ça va être plutôt facile à mettre en place 

  function handleClick() {

    let click = { title, critic, currentUser }

    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(click),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        history.push("/Homepage")
      });
  }

  // Le useEffect pour récupérer le nom de l'utilisateur.
  useEffect(() => {
    fetch("http://localhost:5000/users/info", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res)
      })
  }, [])

  // la fonction sexy de jeremy, vous devriez vraiment l'écire sur un postit, même Antonin l'à grave trop kiffé
  // je vous invite à prendre cinq minutes pour la comprendre, franchement vous allez aimer

  function handleInput(e, setter) {
    setter(e.target.value);
  }

// COTE RECHERCHE DE LIVRES !! // TODO : à foutre dans son propre composant. 

  const [book, setBook] = useState(""); // ce qui est récupéré dans notre formulaire (au handlechange)
  const [result, setResult] = useState([]); // ce qui est récupéré après le handlesubmit
  const [apiKey, setApiKey] = useState('AIzaSyAwExowwTiBhd-qmxu5T8aIZbrVQWekT40') // mettre notre clefs api dans une variable, l'idéal aurait été dans un .env, certes...

  // récuperation de données au subit et injection dans le fetch 
  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=10`) // le maxresults monte de 10 à 40 sur l'api google books // le max résults je l'ai rajouté pour ne pas avoir un putain d'array de 40 à chaque réusltat
    .then((res) => res.json()                                                                         // rapidement le bordel
    .then((data) => {setResult(data)}) // envoi dans le result. (ce qui va nous servir à les afficher par la suite)
    ) }


    // récuperation de ce qu'il a dans l'input
  function handleChange(event) {
    const book = event.target.value 
    setBook(book);} //expedition dans le setter de books. c'est celui qu'on va récupérer pour faire le fetch sur l'API google books.

  return (
    <div>

      <Form className="newCrit-box" onSubmit={handleSubmit}>
        <h3>Recherhe ton bouquin/CHANTIER</h3>
        <FloatingLabel controlId="floatingTextarea2" label="Ton livre ? " className="mb-3" >
          <Form.Control as="textarea"
            type="texte"
            placeholder="Recherche ton livre"
            autocomplete="off"
            name="livre"
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button type="submit"> Recherche </Button>
      </Form>

      <Form className="newCrit-box">
        <h2 className="newCritH2">Balance ta critique!</h2>
        <FloatingLabel controlId="floatingTextarea" label="Titre du Livre" className="mb-3" >
          <Form.Control as="textarea" placeholder="Titre" name="title" onInput={(e) => handleInput(e, setTitle)} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Ta critique">
          <Form.Control as="textarea" placeholder="Ta critique" style={{ height: "200px" }} name="critic" onInput={(e) => handleInput(e, setCritic)} />
        </FloatingLabel>

        <div className="ladiv">Salut {user.pseudo}, ton commentaire sera visible par les autres </div>

        <Button className="boutonNewCrit" onClick={() => handleClick()}>
          Valider
        </Button>

      </Form>

     {/* {result.map(book => ( // FONCTION POUR RECUPERER LES IMAGES SUR LAPI GOOGLE. MALHEUREUSEMENT LES THUMBNAILS ONT APPAREMENT DISPARUS
     // Check à volumeInfo.imageLinks.thumbnail <<=== truc récupéré sur le net. sinon check l'adresse suivante : https://developers.google.com/books/docs/v1/reference/volumes
        {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
      ))}*/}
    </div>
  );
}

export default NewCrit;
