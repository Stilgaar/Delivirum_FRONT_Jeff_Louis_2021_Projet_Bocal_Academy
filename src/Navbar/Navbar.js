import './Navbar.css'
import { Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";


// TODO : faire un navbar conditionnelle avec le ISLOGGED?
// J'ai pris la vidéo d'Antonin en train de parler là dessus =)

function Navigation({ isLog, setIsLog }) {


    return (
        <div>
            <Navbar className="navigation">
                {isLog ?
                    <Container>
                        <Navbar.Brand>
                            <Link className="navElement" to="./">
                                <span className="navText">De~Livre~ium</span>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Text>
                            <Navbar.Collapse className="justify-content-end">
                                <Link className="navElement" to="./Homepage">
                                    <span className="navText2">Critiques</span>
                                </Link>
                                <Link className="navElement" to="./Critique">
                                    <span className="navText2">Ma Critique</span>
                                </Link>
                                <Link className="navElement" to="./Profil">
                                    <span className="navText2">Profil</span>
                                </Link>
                            </Navbar.Collapse>
                        </Navbar.Text>
                    </Container>
                    :
                    <Container>
                        <Navbar.Brand>
                            <Link className="navElement" to="./">
                                <span className="navText">De~Livre~ium</span>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Text>
                            <Navbar.Collapse className="justify-content-end">
                                <Link className="navElement" to="./Login">
                                    <span className="navText2">Login</span>
                                </Link>
                                <Link className="navElement" to="./Signin">
                                    <span className="navText2">Sign In</span>
                                </Link>
                            </Navbar.Collapse>
                        </Navbar.Text>
                    </Container>


                }
            </Navbar>

        </div >
    )
}

export default Navigation;