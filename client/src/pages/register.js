import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import brandLogo from '../images/justMeLogo.png'

const Register = () => {
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = { 
        fullname: '', username: '', email: '', password: '', cf_password: '', gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { fullname, username, email, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    const [theme, setTheme] = useState(localStorage.getItem("theme")) ;
    const inputStyle = {
        backgroundColor: theme === "dark" ? "black": "white", 
        color: theme === "dark" ? "white": "black", 
        borderStyle: "solid", 
        borderWidth: theme === "dark" ? "2px": "1px", 
        borderColor: theme === "dark" ? "#151515": "lightgray", 
        borderRadius: "10px"
    }
    const labelStyle = {
        color: theme === "dark" ? "white": "black"
    }

    useEffect(() => {
        setTheme(theme)
      }, [theme]);

    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className="auth_page" style={{backgroundColor: theme === "dark" ? "black": "white"}}>
            <form onSubmit={handleSubmit} style={inputStyle}>
                <h3 className="text-uppercase text-center mb-4"><span ><img  style={{width: '90px'}} alt="" src={brandLogo} /></span></h3>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" name="fullname"
                    onChange={handleChangeInput} value={fullname}
                    style={inputStyle} />
                    
                    <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input  type="text" className="form-control" id="username" name="username"
                    onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
                    style={inputStyle} />
                    
                    <small className="form-text text-danger">
                        {alert.username ? alert.username : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input  type="email" className="form-control" id="exampleInputEmail1" name="email"
                    onChange={handleChangeInput} value={email}
                    style={inputStyle}/>
                    
                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password"
                        style={inputStyle} />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? <i className="fas fa-eye-slash mr-2" /> : <i className="fas fa-eye mr-2" />}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>

                    <div className="pass">
                        
                        <input type={ typeCfPass ? "text" : "password" } 
                        className="form-control" id="cf_password"
                        onChange={handleChangeInput} value={cf_password} name="cf_password"
                        style={inputStyle} />

                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? <i className="fas fa-eye-slash mr-2" /> : <i className="fas fa-eye mr-2" />}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>

                <div className="row justify-content-between mx-0 mb-1">
                    <label htmlFor="male">
                        Male: <input style={inputStyle} type="radio" id="male" name="gender"
                        value="male" defaultChecked onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="female">
                        Female: <input  style={inputStyle} type="radio" id="female" name="gender"
                        value="female" onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="other">
                        Prefer not to say: <input  style={inputStyle} type="radio" id="other" name="gender"
                        value="other" onChange={handleChangeInput} />
                    </label>
                </div>
                
                <button type="submit" className="btn w-100" style={{color: "white", backgroundColor:"#3c68b1 "}}>
                    Register
                </button>

                <p className="my-2">
                    Already have an account? <Link to="/login" className='font-weight-bold' style={{color: "gray"}}>Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
