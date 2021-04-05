import React from "react";

function Header() {
    return (
        <div className="navbar-div">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="dropdownMenu">
                    <i class="fas fa-leaf"></i><a class="navbar-brand header-logo" href="#Home">banana</a>
                </div>
                <ul class="navbar-nav list-group">
                    <li className="nav-item"><a href="#Home">Home</a></li>
                    <li className="nav-item"><a href="#Search">Search</a></li>
                    <li className="nav-item"><a href="#Favs">Favourites</a></li>
                </ul>
                </nav>
        </div>
    )
}

export default Header;

