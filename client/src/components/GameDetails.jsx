import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate, Link } from "react-router-dom";
import cookies from "js-cookie"

const GameDetails = () => {

    const [game, setGame] = useState("")

    const [firstName, setFName] = useState(cookies.get("firstName"))
    const [lastName, setLName] = useState(cookies.get("lastName"))
    const [fullName, setFullName] = useState(firstName + ' ' + lastName)

    const {id} = useParams()
    const navigate = useNavigate()

    const getGame = () => {
        axios.get(`http://localhost:8000/game/${id}`)
        .then((res)=>{
            setGame(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const deleteGame = (id) => {
        axios.delete(`http://localhost:8000/delete/${id}`)
            .then(res => {navigate("/home")})
            .catch(err => console.log(err))
    }

    const logoutHandler = (e) => {
        e.preventDefault()

        axios.get('http://localhost:8000/logout')
            .then((res) => {
                navigate("/login")
            }).catch((err) => {
                console.log(err)
            })
    }

    const likeGame = (id) => {
        axios.put(`http://localhost:8000/like/${id}`)
            .then((res) => {
                console.log({res})
                getGame();
            })
            .catch(err => console.log(err))
            document.getElementById('like-button').setAttribute("disabled", "disabled");
    }

    useEffect(() => {
        getGame()
    },[])

    return(
        <div>
            <div className="nav">
                    <h3>Welcome {firstName}!</h3>
                    <span className="align-self-center"><NavLink to={'/home'} activeclassname="active" className="navlink">Home</NavLink> | <NavLink to={`/yourgames/${fullName}`} className="navlink">Your Games</NavLink> | <NavLink to={'/addgame'} className="navlink">Add New Game</NavLink> | <Link onClick={logoutHandler} className="navlink">Logout</Link></span>
                    <hr className="nav-line mt-3"/>
            </div>
            <div className="game-details game-font">
                <h1 className="divider glow line">{game.gameName}</h1>
                <h4>Uploaded By: {game.uploadedBy}</h4>
                <h4>Uploader Rating: {game.rating}/10</h4>
                <span className="d-flex justify-content-center mb-3"><button className="btn btn-info" onClick={(e) =>{likeGame(game._id)}} id="like-button">Like {game.gameName}</button><h6 className="align-self-center ms-3 mt-2">Likes: {game.likes}</h6></span>
                <h5 className="divider one-line line">Description: </h5>
                <h6>{game.description}</h6>
                <h5 className="divider one-line line">Other notes:</h5>
                <h6>{game.otherNotes}</h6>
            </div>
            {game.uploadedBy===fullName &&
            <div className="mt-5 game-font">
                <Link className="btn btn-success" to={`/game/${game._id}/edit`}>Edit</Link>
                <button className="btn btn-danger ms-3" onClick={(e) => {deleteGame(game._id)}}>Delete</button>
            </div>
            }
        </div>
    )

}

export default GameDetails