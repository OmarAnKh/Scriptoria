import './App.css';
import SignIn from './components/sign-in/SignIn';
import { Route, Routes } from 'react-router-dom';
import SingUp from "./components/sign-up/SignUp";
import HomePage from './components/home-page/HomePage';
import WritingPage from './components/writing-page/WrtitingPage';
import StoryDetails from './components/story-details/StoryDetails';
import Profile from './components/profile-info/ProfileInfo';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SingUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/WritingPage' element={ <WritingPage/> }/>
        <Route path='/StoryDetails' element={ <StoryDetails/> }/>
      </Routes>
    </div>
  )
}

export default App;
