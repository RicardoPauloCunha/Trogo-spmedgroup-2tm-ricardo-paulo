import React, { Component } from "react";
import { Link } from "react-router-dom";

import { logout } from "../services/logout";
import "../assets/css/style.css";

class ButtonLogout extends Component {
    render() {
        return (
            <div className="style__menu--nav-button">
                <Link to="/" onClick={logout}>
                    <button type="submit" className="style__button--white">Sair</button>
                </Link>
            </div>
        )
    }
}

export default ButtonLogout;