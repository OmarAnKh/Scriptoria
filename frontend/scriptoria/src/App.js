import './App.css';
import SignIn from './components/sign-in/SignIn';
import { Route, Routes } from 'react-router-dom';
import SingUp from "./components/sign-up/SignUp";
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
import StoryPage from './components/story-page/StoryPage.js';
import AllMembers from './components/team-members/AllMembers.js';
import BookToDisplay from './components/book-holder/book-to-display/BookToDisplay.js';
import StoryHeader from './components/story-header/StoryHeader.js';
import LogedOut from './components/loged-out/LogedOut.js'
import StoryCard from "./components/story-overview/StoryPage.js"
import Layout from './components/layout/Layout.js';
import PersistLogin from './components/persist-login/PersistLogin.js';
import RequireAuth from './components/require-auth/RequireAuth.js';
import ServersErrorPage from './components/server-error-page/ServersErrorPage.js';
import StoryErrorsPage from './components/server-error-page/StoryErrorsPage.js';
import AllListsPage from './components/all-lists-page/AllListsPage.js'
import ListPage from './components/list-page/ListPage.js'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          {/*public routes*/}
          <Route path='ServersErrorPage' element={<ServersErrorPage />} />
          <Route path='StoryErrorsPage' element={<StoryErrorsPage />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SingUp />} />
          <Route path='SignUpVerificationCode' element={<SignUpVerificationCode />} />
          <Route path='GetEmail' element={<GettingEmail />} />
          <Route path='EmailVerifing/:email' element={<EmailVerifing />} />
          <Route path='ResetPassword' element={<ResetPassword />} />
          <Route path='logout' element={<LogedOut />} />
          <Route path='/test/:id' element={<StoryCard />} />
          {/*we want to protect these routes*/}
          <Route element={<PersistLogin />}>
            <Route path='/' element={<HomePage />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path='Search/:criteria' element={<SearchResultsPage />} />
            <Route path='StoryPage' element={<StoryPage />} />
            <Route path='TeamMembers' element={<AllMembers />} />
            <Route path='book' element={<BookToDisplay />} />
            <Route path='stories/:id' element={<StoryHeader />} />
            <Route path='settings/:id' element={<Settings />} />
            <Route path=':userName/lists' element={<AllListsPage />} />
            <Route path=':userName/lists/:id' element={<ListPage />} />
            <Route path='story/:id' element={<StoryHeader />} />
            <Route element={<RequireAuth />}>
              <Route path='WritingPage/:id' element={<WritingPage />} />
              <Route path='StoryDetails' element={<StoryDetails />} />
              <Route path='StoryDetails/:id' element={<StoryDetails />} />
              <Route path='settings/:id' element={<Settings />} />
            </Route>
          </Route>
          {/*catch all*/}
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
