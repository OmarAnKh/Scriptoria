import { createAvatar } from '@dicebear/core';
import { useLocation, useNavigate } from "react-router-dom";
import { updateDocument } from '../../api/API\'s';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const Character =  (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [avatarPicture, setAvatarPicture] = useState('')
  const [handle, setHandle] = useState(false)
  const [signUpHandle, setSignUpHandle] = useState(false)
  const { accountInfo } = location.state || {};
  const { auth } = useAuth()

  const avatar = createAvatar(props.style, props.options);
  const avatarOptions = Object.entries(props.options)?.map(([key, value]) => `${key}=${value}`).join('&');

  const setAvatar = async () => {
    try {
      const avatarResponse = await fetch(`https://api.dicebear.com/8.x/${props.name}/png?${avatarOptions}`)

      if (avatarResponse.ok) {
        setAvatarPicture(avatarResponse.url)

      } else {
        const picture = await avatar.png().toDataUri()
        setAvatarPicture(picture)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    const handelSaveAvatar = async () => {
      try {
          const response = await updateDocument("account", { profilePicture: avatarPicture, _id: auth?.userInfo?._id });
  
          if(response.ok === false) {
            props.setSave(!props.save)
            toast.error('Failed to save avatar!')
  
          } else {
            toast.success('Avatar saved!')
            return navigate(`/settings/${auth?.userInfo?._id}`);
          }
  
        } catch (error) {
          console.log("error", error)
      }
    }
    
    if (handle) {
      handelSaveAvatar()
    }
  }, [handle])

  useEffect(() => {

    const avatarSignUp = () => {
      accountInfo.profilePicture = avatarPicture
      return navigate(`/SignUpVerificationCode`, { state: { accountInfo } });
    }
     
    if (signUpHandle) {
      avatarSignUp()
    }
  }, [signUpHandle])
  

  const saveAvatar = async () => {
    await setAvatar();

    if (accountInfo) {
      setSignUpHandle(true)

    } else {
      setHandle(true)
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