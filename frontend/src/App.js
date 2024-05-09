import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-tooltip/dist/react-tooltip.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/home-page/HomePage';
import WritingPage from './components/writing-page/WrtitingPage';
import StoryDetails from './components/story-details/StoryDetails';
import SignUpVerificationCode from './components/sign-up-info/SignUpVerificationCode';
import GettingEmail from './components/password-reset/GettingEmail';
import EmailVerifing from './components/password-reset/EmailVerifing';
import ResetPassword from './components/password-reset/ResetPassword';
import ErrorPage from './components/Error-page/ErorrPage.js';
import SearchResultsPage from './components/search-results/SearchResults.js'
import Settings from './components/settings/Settings.js';
import Profile from './components/profile-page/Profile.js';
import AllMembers from './components/team-members/AllMembers.js';
import LogedOut from './components/loged-out/LogedOut.js'
import Layout from './components/layout/Layout.js';
import PersistLogin from './components/persist-login/PersistLogin.js';
import RequireAuth from './components/require-auth/RequireAuth.js';
import MyWorks from './components/my-works/MyWorks.js'
import ServersErrorPage from './components/server-error-page/ServersErrorPage.js';
import StoryErrorsPage from './components/server-error-page/StoryErrorsPage.js';
import AllListsPage from './components/all-lists-page/AllListsPage.js'
import ListPage from './components/list-page/ListPage.js'
import NoAccessPage from './components/no-access-pages/NoAccessPage.js';
import StoryPage from './components/story-page/StoryPage.js';
import ReadingPage from './components/reading-page/flip-book/FlipBook.js'
import Registration from './components/sign-in/Registration.js';
import SignUpInfo from './components/sign-up-info/SignUpInfo.js';
import Chat from './components/chat-app/Chat.js';
import useAuth from './hooks/useAuth.js';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react';
import { getRooms } from './api/roomsApi.js';


function App() {
  const {auth} = useAuth()
  const [chats, setChats] = useState([])
  const [socket, setSocket] = useState(null)
  useEffect(()=>{
    if(auth?.userName){
      const s = io('http://localhost:5000');
        setSocket(s);

      const fetchChats = async()=>{
        const res = await getRooms(auth?.userInfo?._id, auth?.token)
        if(res?.status===200) setChats(res.data)
      }
    fetchChats()
        return () => {
          s.disconnect();
        };
    }
  },[auth])

  useEffect(()=>{
    chats.map((chat)=>{
      socket?.emit('joinRoom', chat); 
    })

    return()=>{
      socket?.off('joinRoom')
    }
  },[chats])

  useEffect(()=>{
    if(auth?.userName){
      socket.on('sendNotification', (message)=>{
        console.log(message)
        if(window.location.pathname!=='/chats')
          toast((t) => (
            <div className='container notification p-1 gap-2 d-flex flex-row mw-25'>
            <div className='p-0 m-0'>
              <img width="45" className='rounded-circle img-fluid object-fit-cover rounded-5' src={`data:image/png;base64,${message?.owner?.profilePicture}`} />
            </div>
            <div className='d-flex flex-column justify-content-between'>
              <div>
                <b>
                  {message?.owner?.userName} {message.roomName === '' ? '' : `to '${message.roomName}'`}
                </b>
              </div>
              <div className='text-break'>
                <small>
                  {message.text.length > 30 ? (`${message.text.substring(0, 30)}...` ) : (message.text)}
                </small>
              </div>
            </div>
          </div>       
          ));     
      })
    }

    return()=>{
      socket?.off('sendNotification')
    }
  },[socket])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* error pages  */}
          <Route path="NoAccessPage" element={<NoAccessPage />} />
          <Route path='ServersErrorPage' element={<ServersErrorPage />} />
          <Route path='StoryErrorsPage' element={<StoryErrorsPage />} />
          <Route path='logout' element={<LogedOut />} />


          {/* registration pages */}
          {/* <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SingUp />} /> */}
          <Route path='registration' element={<Registration />} />
          <Route path='registration/info' element={<SignUpInfo />} />
          <Route path='SignUpVerificationCode' element={<SignUpVerificationCode />} />
          <Route path='GetEmail' element={<GettingEmail />} />
          <Route path='EmailVerifing/:email' element={<EmailVerifing />} />
          <Route path='ResetPassword' element={<ResetPassword />} />

          {/* refresh pages && protected routers */}
          <Route element={<PersistLogin />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/chats' element={<Chat socket={socket} chats={chats} setChats={setChats}/>} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path='Search/:criteria' element={<SearchResultsPage />} />
            <Route path='TeamMembers' element={<AllMembers />} />
            <Route path='settings/:id' element={<Settings />} />
            <Route path='profile/:userName/lists' element={<AllListsPage />} />
            <Route path='profile/:userName/lists/:id' element={<ListPage />} />
            <Route path='story/:id' element={<StoryPage />} />
            <Route path='MyWorks/:id' element={<MyWorks />} />
            <Route path='ReadingPage/:id' element={<ReadingPage />} />
            <Route element={<RequireAuth />}>
              <Route path='WritingPage/:id' element={<WritingPage />} />
              <Route path='StoryDetails' element={<StoryDetails />} />
              <Route path='StoryDetails/:id' element={<StoryDetails />} />
              <Route path='settings/:id' element={<Settings />} />
            </Route>
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
