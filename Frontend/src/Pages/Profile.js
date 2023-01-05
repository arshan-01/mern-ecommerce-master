import React from 'react'
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';

import ProfileCard from '../components/ProfileCard';

const Profile = () => {
  const [User,setUser] = useState({})
  const [Loading,setLoading] = useState(true)

  // let user= useSelector((state)=>state.UserReducer.CurrentUser);
  // console.log(user)
  async function getUser() {
  
  }
 
  return (
    <div>
    {Loading ? <div className="site-card-border-less-wrapper" type="flex" justify="center" align="middle" style={{minHeight: '100%'}}>
    <h5>Loading...</h5>
    </div> : 
    <ProfileCard {...User}/>
    }
    
    </div>
  )
}

export default Profile