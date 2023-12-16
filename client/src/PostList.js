import React, {useState, useEffect} from 'react'
import axios from "axios";
import CommentCreate from "./CommentCreate";

export default () => {
    const [posts, setPost] = useState({})
    const fetchPost = async () => {
        const res = await axios.get('http://localhost:4000/posts')
        setPost(res.data);
    }
    useEffect(() => {
        fetchPost()
    }, [])
//we need to loop in Posts to get the title and render it
    const renderPosts = Object.values(posts).map((post) => {
        return (
            <div className="card" style={{width: '30%', marginBottom: '20px'}} key={post.id}>
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        )
    })

    // console.log(posts)
    return <div>
        <h2>{renderPosts}</h2>

        <CommentCreate/>


    </div>
};