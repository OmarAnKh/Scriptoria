import './App.css';
import SignIn from './components/sign-in/SignIn';
import { Route, Routes } from 'react-router-dom';
import SingUp from "./components/sign-up/SignUp";
import StoryCard from './components/story-card/StoryCard';
import HomePage from './components/home-page/HomePage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SingUp />} />
        <Route path='/' element={<HomePage />} />
      </Routes>

    </div>
  )
}

export default App;
