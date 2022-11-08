import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'
import brandLogo from '../../images/justMeLogo.png'
import { useSelector } from 'react-redux'
import DarkMode from '../DarkMode'

const Header = () => {
const [color, setColor] = useState(false)


const changeColor = () => {
    if(window.scrollY >= 30){
        setColor(true)
    }else{
        setColor(false)
    }
}
window.addEventListener("scroll", changeColor)
    return (
        <div className="header"  >
            <nav style={{borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}} className={`navbar navbar-expand-sm  
        justify-content-between align-middle `}>

                <Link to="/" className="logo">
                    <h1 className="navbar-brand  p-0 m-0"
                    onClick={() => window.scrollTo({top: 0})}>
                        <span ><img  style={{width: '80px'}} alt="" src={brandLogo} /></span>
                    </h1>
                </Link>
                <Search />
                

                <Menu />
            </nav>
        </div>
    )
}

export default Header
