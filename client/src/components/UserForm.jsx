import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserForm = () => {

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

    const onSubmitHandler = (e) => {

        e.preventDefault()

        axios.post(`http://localhost:8000/user`, {firstName, lastName, email, password} )
            .then(res=>{
                console.log(res);                         
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setCPassword("")
                navigate("/home")
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
        }else if(e.target.value.length <= 8){
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
            <div className="form-container">
                <form onSubmit={onSubmitHandler}>
                    <div className="row">
                        <div className="col">
                            <h5>Sign Up</h5>
                            <div className="form-floating mb-3">
                                <input className="form-control" placeholder="firstName" name="firstName" value={firstName} onChange = {handleFirstName}/>
                                <label htmlFor="firstName">First Name</label>
                                {fNameError ? <p className="red-text">{fNameError}</p> : null }
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" placeholder="lastName" name="lastName" value={lastName} onChange = {handleLastName}/>
                                <label htmlFor="lastName">Last Name</label>
                                {lNameError ? <p className="red-text">{lNameError}</p> : null }
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" placeholder="email" name="email" value={email} onChange = {handleEmail}/>
                                <label htmlFor="email">Email</label>
                                {emailError ? <p className="red-text">{emailError}</p> : null }
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" placeholder="password" name="password" value={password} onChange = {handlePassword}/>
                                <label htmlFor="password">Password</label>
                                {passwordError ? <p className="red-text">{passwordError}</p> : null }
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" placeholder="cPassword" name="cPassword" value={cPassword} onChange = {handleCPassword}/>
                                <label htmlFor="cPassword">Confirm Password</label>
                                {cPasswordError ? <p className="red-text">{cPasswordError}</p> : null }
                            </div>
                        </div>
                    </div>
                        {errors.firstName ? <p className="red-text">{errors.firstName.message}</p> : null}
                        {errors.lastName ? <p className="red-text">{errors.lastName.message}</p> : null }
                        {errors.email ? <p className="red-text">{errors.email.message}</p> : null }
                        {errors.password ? <p className="red-text">{errors.password.message}</p> : null }
                        <button className="btn btn-success" type="button submit">Submit</button>
                </form>
            </div>
        </div>
    )

}

export default UserForm