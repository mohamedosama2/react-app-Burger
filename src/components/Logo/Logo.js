import React from 'react'
import LogoUrl from '../../assets/Images/127 burger-logo.png'
import classes from './Logo.css'

const logo=(props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={LogoUrl} alt="my burger"  />
    </div>
)
export default logo
