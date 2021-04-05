import React from "react";

function Footer() {
        const date = new Date();
        const year = date.getFullYear();
    return (
        <div>
            <h6>Copyright {year}. Hyperion Dev Bootcamp. Alan Kow</h6>
            <a href="#top">Back to top of page</a>
        </div>
    )
}

export default Footer;