import React, {useState, useEffect} from "react";
import axios from "axios";

const CommentList = ({comments}) => {
// const CommentList = ({postId}) => {
//     const [comments, setComments] = useState([]);
//     const fetchComments = async () => {
//         const res = await axios.get(
//             `http://localhost:4001/posts/${postId}/comments`
//         );
//         setComments(res.data);
//     };
//
//     useEffect(() => {
//         fetchComments();
//     }, []);
    const renderedComments = comments.map((comment) => {
        let content
        if (comment.status === 'approved') {
            content = comment.content
        }
        if (comment.status === 'pending') {
            content = 'This comment is waiting for Moderation'
        }
        if (comment.status === 'rejected') {
            content = 'This comment is rejected '
        }
        // return <li key={comment.id}>{comment.content}</li>;
        return <li key={comment.id}>{content}</li>;

    });
    return <ul>{renderedComments}</ul>;
};
export default CommentList;