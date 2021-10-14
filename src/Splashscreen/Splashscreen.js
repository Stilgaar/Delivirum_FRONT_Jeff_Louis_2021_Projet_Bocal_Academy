import './Splashscreen.css'

function Splashscreen({ isLog, setIsLog }) {

    return (
        <div>
            {isLog ?
                <div></div>
                :
                <div className="splash">
                    <div className="boxTitre">
                        <h1 className="titreSplash">CatchPhrase +
                            <br />
                            Slogan de Dingue !
                        </h1>
                    </div>
                    <div className="boxSplash1"></div>
                    <div className="boxSplash2"></div>
                </div>
            }
        </div>)
}

export default Splashscreen;