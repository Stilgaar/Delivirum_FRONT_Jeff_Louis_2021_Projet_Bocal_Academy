import './Footer.css'
import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="footerBox">
            <div>
                <div className="texteFoot">Louis &#x00026; Jeff Pour le 
                    Bocal Academy &#x0003C;3
                </div>
            </div>
            <div className="linkBox">
                <div>
                   <Link className="linkFoot" to="/Contact"> Contact </Link>
                </div>
                
         <Link className="linkFoot" to="/RGPD">RGPD</Link>
                
            </div>
        </footer>

    )

}

export default Footer;