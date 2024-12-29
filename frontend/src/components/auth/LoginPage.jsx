import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import Logo from '../logo/Logo';
import './LoginPage.css';



function LoginPage(){
const [universityId, setUniversityId] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await UserService.login(universityId, password)
        console.log(userData)
        if (userData.token) {
            localStorage.setItem('token', userData.token)
            localStorage.setItem('role', userData.role)
            localStorage.setItem('universityId', userData.universityId)
            navigate('/dashboard')
        }else{
            setError(userData.message)
        }
        
    } catch (error) {
        console.log(error)
        setError(error.message)
        setTimeout(()=>{
            setError('');
        }, 5000);
    }
}


    return(
        <div className="auth-container">
            <Logo />
            <h2>ONLINE MAINTENANCE REQUEST SYSTEM</h2>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                        <input type="text" name="universityId" value={universityId} onChange={(e) => setUniversityId(e.target.value)} placeholder="Enter University ID" required/>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required/>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>        
    )

}

export default LoginPage;