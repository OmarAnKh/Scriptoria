import './App.css';
import SignIn from './components/sign-in/SignIn';
import { Route, Routes } from 'react-router-dom';
import SingUp from "./components/sign-up/SignUp";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SingUp" element={<SingUp />} />
      </Routes>
    </div>
  )
}

export default App;
