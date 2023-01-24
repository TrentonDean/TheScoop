import React from "react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [fNameError, setFNameError] = useState("")

    const [lastName, setLastName] = useState("")
    const [lNameError, setLNameError] = useState("")

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [cPassword, setCPassword] = useState("")
    const [cPasswordError, setCPasswordError] = useState("")

    const navigate = useNavigate("")
    const [errors, setErrors] = useState({})

    const onRegisterHandler = (e) => {

        e.preventDefault()

        axios.post(`http://localhost:8000/register`, {firstName, lastName, email, password},{withCredentials:true} )
            .then(res=>{
                console.log(res);                         
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setCPassword("")
                navigate(`/home`)
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.err.errors) 
            })
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
        if(e.target.value.length === 0){
            setFNameError("")
        }else if(e.target.value.length <= 1){
            setFNameError("First Name must be at least 2 characters");
        }else {
            setFNameError("");
        }
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
        if(e.target.value.length === 0){
            setLNameError("")
        }else if(e.target.value.length <= 1){
            setLNameError("Last Name must be at least 2 characters")
        }else {
            setLNameError("")
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        if(e.target.value.length === 0){
            setEmailError("")
        }else if(e.target.value.length <= 1){
            setEmailError("Email must be at least 2 characters")
        }else {
            setEmailError("")
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length === 0){
            setPasswordError("")
        }else if(e.target.value.length < 8){
            setPasswordError("Password must be at least 8 characters")
        }else {
            setPasswordError("")
        }
    }

    const handleCPassword = (e) => {
        setCPassword(e.target.value)
        if(e.target.value.length === 0){
            setCPasswordError("")
        }else if(e.target.value === password){
            setCPasswordError("")
        }else if(e.target.value !== password){
            setCPasswordError("Passwords must match")
        }else{
            setCPasswordError("")
        }
    }

    return (
        <div>
            <h1 className="title divider">THE SCOOP</h1>
            <div className="form-container game-font mt-4">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form onSubmit={onRegisterHandler}>
                            <h3 className="mb-3 divider line razor">Sign Up</h3>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="First Name" name="firstName" value={firstName} onChange = {handleFirstName}/>
                                {fNameError ? <p className="red-text">{fNameError}</p> : null }
                            </div>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="Last Name" name="lastName" value={lastName} onChange = {handleLastName}/>
                                {lNameError ? <p className="red-text">{lNameError}</p> : null }
                            </div>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="Email" name="email" value={email} onChange = {handleEmail}/>
                                {emailError ? <p className="red-text">{emailError}</p> : null }
                            </div>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="Password" name="password" value={password} onChange = {handlePassword}/>
                                {passwordError ? <p className="red-text">{passwordError}</p> : null }
                            </div>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="Confirm Password" name="cPassword" value={cPassword} onChange = {handleCPassword}/>
                                {cPasswordError ? <p className="red-text">{cPasswordError}</p> : null }
                            </div>
                            <div>
                                <Link to={`/login`} className="logreg-link">Already registered?</Link>
                            </div>
                            {errors.firstName ? <p className="red-text">{errors.firstName.message}</p> : null}
                            {errors.lastName ? <p className="red-text">{errors.lastName.message}</p> : null }
                            {errors.email ? <p className="red-text">{errors.email.message}</p> : null }
                            {errors.password ? <p className="red-text">{errors.password.message}</p> : null }
                            <button className="logreg btn mt-3" type="button submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register