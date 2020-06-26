import React from 'react';
import {Link} from "react-router-dom"
function Header() {
    
    return(
        <div>
            
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Graficos">Graficos</Link></li>
                
            </ul>
        </div>
    );
    
}

export default Header;