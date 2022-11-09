import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "../styles/darkMode.css"

const UserCard = ({children, user, border, handleClose, setShowFollowers, setShowFollowing, msg}) => {

    const handleCloseAll = () => {
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }

    const isdarkMode = localStorage.getItem("theme");
    

    const showMsg = (user) => {
        return(
            <>
                <div style={{maxWidth: "300px", wordWrap: "break-word"}}>
                    {user.text.length > 60 ? user.text.slice(0, 60) + " ...":user.text}
                </div> 
                {
                    user.media.length > 0 && 
                    <div>
                        {user.media.length} <i className="fas fa-image" />
                    </div>
                }

                {
                    user.call &&
                    <span className="material-icons">
                        {
                            user.call.times === 0
                            ? user.call.video ? 'videocam_off' : 'phone_disabled'
                            : user.call.video ? 'video_camera_front' : 'call'
                        }
                    </span>
                }
            </>
        )
    }


    return (
        <div className={` d-flex p-2 align-items-center justify-content-between w-100 `} id="searchResults">
            <div>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                className="d-flex align-items-center " style={{textDecoration: 'none'}} >
                    
                    <Avatar src={user.avatar} size="big-avatar" className="me-2"/>

                    <div id="userCard" className="ml-2" style={{transform: 'translateY(-2px)'}}>
                        <span className="d-block">@{user.username}</span>
                        
                        <small style={{opacity: 0.7}}>
                            {
                                msg 
                                ? showMsg(user)
                                : user.fullname
                            }
                        </small>
                    </div>
                </Link>
            </div>
            
            {children}
        </div>
    )
}

export default UserCard
