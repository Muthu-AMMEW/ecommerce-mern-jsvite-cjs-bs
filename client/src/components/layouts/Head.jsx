import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import UserDropDown from './UserDropDown';
import { useEffect } from "react";
import axios from 'axios';


export default function Head() {

    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout);
    }

    const QuickStartApi = () => {
        return axios.get('/api/v1/quickstart');
    }
    QuickStartApi();   //only for server delay start

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid d-flex">
                <div className="d-flex">
                    <Link className="navbar-brand d-flex" to={"/"}>
                        <img src="./images/logo.png" alt="logo" width="60" height="60" />
                        <h5 className="mt-3">APL Foods</h5>
                    </Link>
                    <div className="m-2 d-md-none"></div>
                    <Link to={"/home"} className="btn btn-outline-danger d-none d-sm-block my-3 mx-1">Home</Link>
                    {!isAuthenticated && <Link to={"/login"} className="btn btn-outline-success d-lg-none my-3 mx-1">Login</Link>}

                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle ms-lg-2 me-2" href="www.google.com" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                    className="fa-brands fa-slack fa-spin fa-lg me-2"></i>
                                Social Networks
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="https://www.facebook.com">
                                    <i className="fa-brands fa-facebook fa-beat me-2" style={{ color: "#2568ef" }}></i>Facebook</a>
                                </li>
                                <li><a className="dropdown-item" href="https://www.x.com">
                                    <i className="fa-brands fa-twitter fa-shake me-2" style={{ color: "#1da1f2" }}></i>Twitter</a></li>
                                <li><a className="dropdown-item" href="https://www.youtube.com">
                                    <i className="fa-brands fa-youtube fa-beat-fade me-2" style={{ color: "#ff0000" }}></i>Youtube</a></li>
                                <li><a className="dropdown-item" href="https://www.instagram.com">
                                    <i className="fa-brands fa-square-instagram fa-beat-fade me-2" style={{ color: "#ff7b00" }}></i>Instagram</a></li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li><a className="dropdown-item me-2" href="https://m.me/Muthu.AMMEW"><i
                                    className="fa-brands fa-facebook-messenger fa-shake fa-lg me-2" style={{ color: "#0080f7" }}></i>Chat(Via FB)</a></li>
                            </ul>
                        </li>
                    </ul>
                    <Search />

                    {!isAuthenticated && <Link to={"/login"} className="btn btn-outline-success my-3 mx-1 d-none d-lg-block">Login</Link>}

                    {!isAuthenticated && <Link to={"/signup"} className="btn btn-outline-warning my-3 mx-1">Sign Up</Link>}
                    {isAuthenticated && <UserDropDown />}
                    {/*eslint-disable-next-line*/}
                    {isAuthenticated && <Link to={"/login"} className="nav-link d-flex flex-column m-3 align-items-start" onClick={logoutHandler}>
                        <div className=" d-flex flex-column justify-content-center"><i className="fa-solid fa-arrow-right-from-bracket fa-xl" style={{ color: "#63E6BE" }}>
                        </i><h6>Logout</h6></div></Link>}

                    {isAuthenticated && <Link className="d-flex flex-column justify-content-center mx-3 align-items-start" to={"/cart"}>
                        <h5 className="badge text-black m-1 mt-0">{cartItems.length}</h5>
                        <i className="fa-solid fa-cart-shopping fa-beat fa-xl mt-0 pt-0" style={{ color: "#FFD43B" }}></i>
                    </Link>}
                    {/* <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
                    <span className="ml-1" id="cart_count">{cartItems.length}</span> */}
                    <Link to={"/home"} className="btn btn-outline-danger d-block d-sm-none my-3 mx-1">Home</Link>
                </div>
            </div >
        </nav >
    )
}