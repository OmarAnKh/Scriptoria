import './App.css';
import SignIn from './components/sign-in/SignIn';
import { Route, Routes } from 'react-router-dom';
import SingUp from "./components/sign-up/SignUp";
import HomePage from './components/home-page/HomePage';
import WritingPage from './components/writing-page/WrtitingPage';
import StoryDetails from './components/story-details/StoryDetails';
import GettingEmail from './components/password-reset/GettingEmail';
import EmailVerifing from './components/password-reset/EmailVerifing';
import ResetPassword from './components/password-reset/ResetPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SingUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/WritingPage' element={<WritingPage />} />
        <Route path='/StoryDetails' element={<StoryDetails />} />
        <Route path='/GetEmail' element={<GettingEmail />} />
        <Route path='/EmailVerifing/:email' element={<EmailVerifing />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />
      </Routes>

    </div>
  )
}

export default App;
