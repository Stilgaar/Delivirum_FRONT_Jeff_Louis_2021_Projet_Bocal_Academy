import './Navbar.css'
import { Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";


// TODO : faire un navbar conditionnelle avec le ISLOGGED?
// J'ai pris la vidéo d'Antonin en train de parler là dessus =)

function Navigation() {


    return (
        <div>
            <Navbar className="navigation">
                <Container>
                    <Navbar.Brand>
                        <Link className="navElement" to="./">
                            <span className="navText">De-Livre-Ium</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Text>
                        <Navbar.Collapse className="justify-content-end">
                            <Link className="navElement" to="./">
                                <span className="navText2">Login</span>
                            </Link>
                            <Link className="navElement" to="./Signin">
                                <span className="navText2">Sign In</span>
                            </Link>
                        </Navbar.Collapse>
                    </Navbar.Text>
                </Container>
            </Navbar>


        </div >
    )
}

export default Navigation;