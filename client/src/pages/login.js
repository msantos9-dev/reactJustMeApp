import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import brandLogo from '../images/justMeLogo.png'
import DarkMode from '../components/DarkMode'


const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData
    

    const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    

    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    

    return (

        <div className="auth_page" >
           
            <form onSubmit={handleSubmit} style={{borderRadius: "10px"}}>
                          <h3 className="text-uppercase text-center mb-4"><span ><img  style={{width: '180px'}} alt="" src={brandLogo} /></span></h3>

                <div className="form-group" hidden>
                    <label htmlFor="exampleInputEmail1" className='mr-2 mb-4'>Toggle to Change theme </label>
                    <span className='darkModeSpan form-control'><DarkMode />  </span>   
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input style={{borderRadius: "10px"}} type="email" className="form-control" id="exampleInputEmail1" name="email"
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />
                    
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        
                        <input style={{borderRadius: "10px"}} type={ typePass ? "text" : "password" } 
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password" />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? <i className="fas fa-eye-slash mr-2" /> : <i className="fas fa-eye mr-2" />}
                        </small>
                    </div>
                   
                </div>
                
                <button type="submit" className="btn  w-100" style={{color: "white", backgroundColor:"#3c68b1 "}}
                disabled={email && password ? false : true}>
                    Login
                </button>

                <p className="my-2" >
                    You don't have an account? <Link to="/register" className='font-weight-bold' style={{color: "gray"}}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
