import React, { useState } from 'react'

const Post = () => {
    const [posts,setPosts]=useState([])
    const fetchPost=async()=>{
        const res=fetch(`${import.meta.env.VITE_SERVER}/partner/post`,{
            method:"GET",
            credentials:"include",
            header:{
                "Content-Type":"application/json"
            }
        })
        const response=await res.json();
        console.log(response)
        if(response.succes){
            setPosts(response.data);
        }
    }
  return (
    <div>
       {posts.map((post,index)=>(<div>{post.caption}</div>))}
    </div>
  )
}

export default Post
