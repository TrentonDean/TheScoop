import React from "react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate("")

    const onLoginHandler = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/login', {email, password},{withCredentials:true, credentials:"include"})
            .then((res) => {
                navigate("/home")
            }).catch((err) => {
                console.log(err)
            })
    }

    return(
        <div>
            <h1 className="title divider">THE SCOOP</h1>
            <div className="form-container mt-4 text-center game-font">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form onSubmit={onLoginHandler}>
                            <h3 className="mb-4 divider line razor">Login</h3>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="Email" name="email" value={email} onChange = {(e) => {setEmail(e.target.value)}}/>
                            </div>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="Password" name="password" value={password} onChange = {(e) => {setPassword(e.target.value)}}/>
                            </div>
                            <div>
                                <Link to={'/register'} className="logreg-link">Don't have an account?</Link>
                            </div>
                            <button className="logreg btn mt-3" type="button submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login