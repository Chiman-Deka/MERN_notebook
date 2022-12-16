import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/login');
    }
    let location = useLocation();   // location is a object with propeties like pathname : "/"
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className= {`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>   {/*className is set as active when home is clicked location.pathname==="/" */}
                        </li>
                        <li className="nav-item">
                            <Link className= {`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>       {/*className is set as active when about is clicked location.pathname==="/about" */}
                        </li>
                    </ul>
                    {!localStorage.getItem('token')? <form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>: <button onClick={handleLogout} className="btn btn-primary">Log Out</button>}
                </div>
            </div>
        </nav>

    )
}

export default Navbar