import useAuth from '../../hooks/useAuth'
import defaultPhoto from './../../img/group-chat.webp'

const Conversation = ({data}) => {
  const {auth} = useAuth()
  const users = data?.users?.filter(user => user.user._id !== auth?.userInfo?._id)
  const name = data.name !== '' ? data.name : (users.length > 0 ? users[0].user.userName : "Unnamed User");
  const photo = data.name==='' && users[0]?.user?.profilePicture ? `data:image/png;base64,${users[0]?.user?.profilePicture}` : defaultPhoto

  return (
      <div className='container d-flex flex-row bg-light p-1 my-2 rounded' style={{cursor : 'pointer'}}>
          <div>
              <img
                  className="rounded-circle border border-2"
                  src={photo}
                  alt="Profile"
                  width="60"
              />
          </div>
          <div className='px-2 d-flex flex-column'>
              <div  className='h4'>
                  {name}
              </div>
          </div>
      </div>
  )
}

export default Conversation
