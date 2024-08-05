import { useNavigate } from 'react-router-dom'
import './loginHomepage.css'

export default function LoginHomepage() {
    const navigate  = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        navigate('/articles')
    }

    return (
        <div className="login-container">
            <h1 className="header">Welcome to NC News</h1>
            <section className="login-section">
                <form action="" className="login-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" className="form-input" />
                    </div>
                    <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
                </form>
            </section>
        </div>       
    )
}