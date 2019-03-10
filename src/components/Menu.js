import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import * as ROUTES from '../routes';

class Menu extends Component {
    render() {
        return (
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_HOME}>
                            Главная
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_HEX_DUMP}>
                            Hex-dump
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_SMPP_DECODE}>
                            Smpp-decoder
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_ENCODING}>
                            encodings
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_ENCODING_GSM}>
                            Gsm encoding
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_ENCODING_LATIN1}>
                            Latin-1 encoding
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_ENCODING_ASCII}>
                            Ascii encoding
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to={ROUTES.PATH_ENCODING_UCS2}>
                            Ucs2 encoding
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;