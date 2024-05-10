import { createAvatar } from '@dicebear/core';
import { useLocation, useNavigate } from "react-router-dom";
import { updateDocument } from '../../api/API\'s';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const Character =  (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { accountInfo } = location.state || {};
  const { auth } = useAuth()

  const avatar = createAvatar(props.style, props.options);
  
  const handelSaveAvatar = async () => {
    const avatarPicture = await  avatar.png().toDataUri();

    try {
        const response = await updateDocument("account", { profilePicture: avatarPicture, _id: auth?.userInfo?._id });
        
        if(response.ok === false) {
          toast.error('Failed to save avatar!')
          props.setSave(!props.save)
        } else {
          toast.success('Avatar saved!')
          navigate(`/settings/${auth?.userInfo?._id}`);
        }

    } catch (error) {
        console.log("error", error)
    }
  }

  const saveAvatar = async () => {

    if (accountInfo) {
        accountInfo.profilePicture = await  avatar.png().toDataUri();
        console.log(accountInfo)
        navigate(`/SignUpVerificationCode`, { state: { accountInfo } });
    } else {
      handelSaveAvatar()
    }
  }

  if(props.save) {
    saveAvatar()
    
  } else if (props.cancel) {

      if(accountInfo) {
        navigate(`/registration/info`, { state: { accountInfo } }); 
      } else {
        navigate(`/settings/${auth?.userInfo?._id}`);
      }
  }

  return (
    <div style={{
      width: '250px',
      height: '250px',
      overflow: 'hidden',
      borderRadius: '15px', 
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    }}>
      <img src={avatar.toDataUriSync()} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export default Character;