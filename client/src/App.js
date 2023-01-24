import './App.css';
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import GameForm from './components/GameForm';
import GameDetails from './components/GameDetails';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import YourGames from './components/YourGames';
import EditGame from './components/EditGame';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>} default />
          <Route path='/login' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/addgame' element={<GameForm/>} />
          <Route path='/game/:id' element={<GameDetails/>} />
          <Route path='/yourgames/:fullName' element={<YourGames/>} />
          <Route path='/game/:id/edit' element={<EditGame/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;