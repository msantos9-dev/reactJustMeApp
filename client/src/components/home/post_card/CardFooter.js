import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction'
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'


const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [isShare, setIsShare] = useState(false)

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // Likes
    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }, [post.likes, auth.user._id])

    const handleLike = async () => {
        if(loadLike) return;
        
        setLoadLike(true)
        await dispatch(likePost({post, auth, socket}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;

        setLoadLike(true)
        await dispatch(unLikePost({post, auth, socket}))
        setLoadLike(false)
    }


    // Saved
    useEffect(() => {
        if(auth.user.saved.find(id => id === post._id)){
            setSaved(true)
        }else{
            setSaved(false)
        }
    },[auth.user.saved, post._id])

    const handleSavePost = async () => {
        if(saveLoad) return;
        
        setSaveLoad(true)
        await dispatch(savePost({post, auth}))
        setSaveLoad(false)
    }

    const handleUnSavePost = async () => {
        if(saveLoad) return;

        setSaveLoad(true)
        await dispatch(unSavePost({post, auth}))
        setSaveLoad(false)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton 
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                    />

                    <Link to={`/post/${post._id}`} style={{ color: "gray "}}>
                        <i className="far fa-comment-alt" />
                    </Link>

                    <i style={{ color:  isShare ? "#3c68b1 ":"gray"}} className="fas fa-share-alt" onClick={() => setIsShare(!isShare)} />
                    
                </div>

                {
                    saved 
                    ?  <i style={{ color: "#3c68b1 "}} className="fas fa-bookmark "
                    onClick={handleUnSavePost} />
                    

                    :  <i style={{ color: "gray "}}  className="far fa-bookmark"
                    onClick={handleSavePost} />
                }
               
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.likes.length} {post.likes.length < 2 ? "like": "likes"}
                </h6>
                
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.comments.length} {post.comments.length < 2 ? "comment":"comments"} 
                </h6>
            </div>

            {
                isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={""} />
            }
        </div>
    )
}

export default CardFooter
