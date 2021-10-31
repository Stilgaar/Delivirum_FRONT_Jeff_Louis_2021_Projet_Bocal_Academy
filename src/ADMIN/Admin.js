import './Admin.css';
import { useEffect, useState } from "react";

function Admin() {

    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        fetch("https://delivriumback.osc-fr1.scalingo.io/users/all", {}).then((res) => res.json()).then((Users) => {
            setAllUsers(Users);
        })
    }, [])

    const handleBan = (email) => {
        fetch("https://delivriumback.osc-fr1.scalingo.io/users/softban", {
            method: "PATCH",
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((json) => console.log(json))
    }


    const handleAdmin = (email) => {
        fetch("https://delivriumback.osc-fr1.scalingo.io/users/admin", {
            method: "PATCH",
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((json) => console.log(json))
    }
    return (
        <div>
            <div className="ladmin">
                <div><h3>Panneau Admin</h3></div>
                <div className="futursBannis">
                    {allUsers.map((utils, key) =>
                        <div className="oneLiner">
                            <div className="adminUserbox">
                                Pseudo de l'user : {utils.pseudo}
                                Email de l'user : {utils.email}
                                Admin : {utils.admin ? "Oui" : "Non"}
                            </div>
                            <div className="adminButtonsbox">
                                <button className="adminButtons" onClick={() => (handleBan(utils.email))}>Bannir</button>
                                <button className="adminButtons" onClick={() => (handleAdmin(utils.email))}>Set Admin</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Admin;