import React from 'react'
import {useParams} from 'react-router-dom'
import NotFound from '../components/NotFound'
import { useSelector } from 'react-redux'

const generatePage = (pageName) => {
    const component = () => require(`../pages/${pageName}`).default
   
    try {
        
        return React.createElement(component())
        
    }catch(err){ 
        if(pageName){
            return <NotFound />
        }else{
            return null
        }  
    }
}

const PageRender = () => {
    const {page, id} = useParams()
    const { auth } = useSelector(state => state)

    let pageName = "";

    if(auth.token){
        if(id){
            pageName = `${page}/[id]`
        }else{
            pageName = `${page}`
        }
    }

    return generatePage(pageName)
}

export default PageRender
