import './header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo.png";
import logoutIcon from "../../assets/logout-icon.svg"

export default function Header() {
    const location = useLocation();

    return(                        
            !(location.pathname === '/') && 
            <div className="header">
                <Link className='logo-anchor' to="/articles">
                    <img className='logo-img' src={logo} alt="Company logo featuring a stylized globe with interconnected lines symbolizing global connectivity. The logo is composed of blue and teal colors, emphasizing a modern and digital look."/>
                    <h1>NC NEWS</h1>                
                </Link>
                <div className='logout-container'>
                    <h2 className='logout-text'>Logout</h2>
                    <img className='logout-img' src={logoutIcon} alt="Icon depicting a logout symbol, which consists of a right-pointing arrow exiting an open door." />                    
                </div>
            </div>      
    )
}