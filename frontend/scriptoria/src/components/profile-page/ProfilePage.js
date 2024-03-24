import BookShelf from "../book-shelf/BookShelf"
import FriendsList from "../friends-list/FriendsList";
import Navbar from "../navbar/Navbar";
import Profile from "../profile-info/ProfileInfo"
import "./ProfilePage.css"

const ProfilePage = () => {
    return (
        <div className="container-fluid profile-page-body">
            <Navbar />
            <Profile />
            <div className="row">
                <div className="col text-center">
                    <BookShelf />
                </div>
                <div className="col-md-4">
                    <FriendsList />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage