import React from 'react'

const Account = () => {
  const fetchData=async()=>{
    const res=await fetch (`${import.meta.env.VITE_SERVER}/auth/account`,{
      method:"GET",
      credentials:"include",
      header:{
        "Content-Type":"application/json"
      }
    })
    const response=await res.json();
    console.log(response)
  }
  fetchData();
  return (
    <div className='h-screen '>
      
    </div>
  )
}

export default Account
