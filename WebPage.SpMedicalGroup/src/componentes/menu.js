import React, { Component } from "react";

import ButtonLogout from "./buttonLogout";

import "../assets/css/style.css";
import iconLogo from "../assets/icon/icon-logo.png";

class Menu extends Component {
    render() {
        return (
            <div className="style__menu--container">
                <div className="style__menu--background">
                    <div className="style__menu">
                        <div className="style__menu--nav">
                            <div className="style__menu--nav-button">
                                <button type="submit" className="style__button--white style__menu--button-display-none">Menu</button>
                            </div>

                            <div className="style__logo--circtittle">
                                <div className="style__logo--circulo">
                                    <img src={iconLogo} />
                                </div>
                                <h1 className="style__nav--display-none">Sp Medical Group</h1>
                            </div>
                            
                            <ButtonLogout />
                        </div>

                        <div className="style__nav style__nav--display-none">
                            <div className="style__nav--links">
                                <p>Home</p>
                                <p>Consultas</p>
                                <p>Agendamentos</p>
                                <p>Fale Conosco</p>
                            </div>
                            <div className="style__menu--linha-white"></div>
                        </div>

                        <div>
                            <h2 className="style__menu--titulo">Consultas</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;