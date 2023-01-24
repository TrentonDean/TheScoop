import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import cookies from "js-cookie"
import { Link, NavLink, useNavigate } from "react-router-dom";

const YourGames = () => {

    const [firstName, setFName] = useState(cookies.get("firstName"))
    const [lastName, setLName] = useState(cookies.get("lastName"))

    const [fullName, setFullName] = useState(firstName + ' ' + lastName)

    const [games, setGames] = useState([])

    const navigate = useNavigate()

    const getMyGames = () => {                                                 // grabs games uploaded by the logged in user
        axios.get(`http://localhost:8000/yourgames/${fullName}`)
        .then((res)=>{
            setGames(res.data)
        }).catch((err)=>{
            console.log(err)
        })
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
                getMyGames();
            })
            .catch(err => console.log(err))
            document.getElementById('like-button').setAttribute("disabled", "disabled");
    }

    useEffect(() => {
        getMyGames()
    },[]);

    return(
        <div>
            <div className="nav">
                    <h3>Welcome {firstName}!</h3>
                    <span className="align-self-center"><NavLink to={'/home'} className="navlink">Home</NavLink> | <NavLink to={`/yourgames/${fullName}`} activeclassname="active" className="navlink">Your Games</NavLink> | <NavLink to={'/addgame'} className="navlink">Add New Game</NavLink> | <Link onClick={logoutHandler} className="navlink">Logout</Link></span>
                    <hr className="nav-line mt-3"/>
            </div>
            <div className="main-page-container">
                <h1 className="mb-3 divider line glow">Your Games</h1>
            {games.map((game,index) => {
                return(
                    <div key={index}>
                        <div className="row d-flex justify-content-between game-font">
                            <div className="col-3 game-info">
                                <h5><NavLink to={`/game/${game._id}`} className="gamelink">{game.gameName}</NavLink></h5>
                                <h6>Uploaded by: {game.uploadedBy}</h6>
                                <h6>Uploader Rating: {game.rating}/10</h6>
                                <span className="d-flex align-self-center mb-3"><button className="btn btn-info" onClick={(e) =>{likeGame(game._id)}} id="like-button">Like {game.gameName}</button><h6 className="ms-3 mt-2">Likes: {game.likes}</h6></span>
                            </div>
                            <div className="col-8 align-self-center">
                                <h6>{game.description}</h6>
                            </div>
                        </div>
                        <hr className="nav-line" />
                    </div>
                )
            })}
            </div>
        </div>
    )

}

export default YourGames