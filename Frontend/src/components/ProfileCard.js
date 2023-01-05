import React from 'react'
import { Card } from 'antd';
import { useState} from 'react';
const ProfileCard = (User) => {
  
    console.log(User)
  return (
    <div className="site-card-border-less-wrapper" type="flex" justify="center" align="middle" style={{minHeight: '100%'}}>
    <Card
      title="USER PROFILE"
      bordered={false}
      style={{
        width: 500,
        textAlign:'left'
      }}
    >
      <p>  <strong> UID :</strong> {User.id}</p>
      <p><strong> FirstName :</strong> {User.fname}</p>
      <p><strong> LastName :</strong> {User.sname}</p>
      <p><strong> Email : </strong>{User.email}</p>

    </Card>
  </div>
  )
}

export default ProfileCard