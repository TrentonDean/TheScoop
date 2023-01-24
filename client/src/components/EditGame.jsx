import React from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cookies from "js-cookie";

const EditGame = () => {

    const {id} = useParams()
    const [gameName, setGameName] = useState("")
    const [gameNameError, setGameNameError] = useState('')

    const [rating, setRating] = useState("")

    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState('')

    const [otherNotes, setOtherNotes] = useState("")

    const [firstName, setFName] = useState(cookies.get("firstName"))
    const [lastName, setLName] = useState(cookies.get("lastName"))
    const [fullName, setFullName] = useState(firstName + ' ' + lastName)

    const [uploadedBy, setUploadedBy] = useState(fullName)

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/game/${id}`)
            .then( res => {
                setGameName(res.data.gameName);
                setRating(res.data.rating)
                setDescription(res.data.description)
                setOtherNotes(res.data.otherNotes)
            })
            .catch( err => console.log(err) );
    }, []);

    const updateGame = (e) => {

        e.preventDefault()

        axios.put(`http://localhost:8000/api/game/${id}/edit`, {gameName:gameName, rating:rating, description:description, otherNotes:otherNotes})
        .then(res => {
            console.log(res)
            navigate(`/game/${id}`)
        })
        .catch(err => {
            console.log(err)
            setErrors(err.response.data.err.errors)
        })
    }

    const logoutHandler = (e) => {
        e.preventDefault()

        axios.get('http://localhost:8000/api/logout')
            .then((res) => {
                navigate("/login")
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleGameName = (e) => {
        setGameName(e.target.value)
        if(e.target.value.length === 0){
            setGameNameError("")
        }else if(e.target.value.length <= 1){
            setGameNameError("Game Name must be at least 2 characters");
        }else {
            setGameNameError("");
        }
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
        if(e.target.value.length === 0){
            setDescriptionError("")
        }else if(e.target.value.length <= 19){
            setDescriptionError("Game Name must be at least 20 characters");
        }else {
            setDescriptionError("");
        }
    }

    return(
        <div>
            <div className="nav">
                <h3>Welcome {firstName}!</h3>
                <span className="align-self-center"><NavLink to={'/home'} className="navlink">Home</NavLink> | <NavLink to={`/yourgames/${fullName}`} className="navlink">Your Games</NavLink> | <NavLink to={'/addgame'} className="navlink">Add New Game</NavLink> | <Link onClick={logoutHandler} className="navlink">Logout</Link></span>
                <hr className="nav-line mt-3"/>
            </div>
            <div className="form-container game-font">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form onSubmit={updateGame}>
                            <h3 className="mb-3 divider line glow">Edit Game</h3>
                            <div className="mb-3">
                                <input className="form-control text-center" placeholder="gameName" name="gameName" value={gameName} onChange = {handleGameName}/>
                                {gameNameError ? <p className="red-text">{gameNameError}</p> : null }
                            </div>
                            <div>
                                <select className="form-select text-center" aria-label="Rating" onChange={(e)=>setRating(e.target.value)}>
                                    <option selected>Rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control text-center mt-3" rows={4} placeholder="Description" name="description" value={description} onChange = {handleDescription}/>
                                {descriptionError ? <p className="red-text">{descriptionError}</p> : null }
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control text-center" rows={4} placeholder="Other Notes" name="otherNotes" value={otherNotes} onChange = {(e) => setOtherNotes(e.target.value)}/>
                            </div>
                            <input type="hidden" name="uploadedBy" value={uploadedBy} />
                            {errors.gameName ? <p className="red-text">{errors.gameName.message}</p> : null}
                            {errors.rating ? <p className="red-text">{errors.rating.message}</p> : null }
                            {errors.description ? <p className="red-text">{errors.description.message}</p> : null }
                            <button className="btn btn-success mt-3" type="button submit">Confirm</button>
                            <Link to={'/home'}><button className="btn btn-danger mt-3 ms-3">Cancel</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditGame