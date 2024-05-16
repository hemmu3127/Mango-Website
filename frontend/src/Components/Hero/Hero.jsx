import React from 'react';
import './Hero.css'
import hand_icon from '../Assets/aam.png'
import hero_image from '../Assets/aam_1.jpg'

const Hero = () =>{


    return(
        <div className="hero">
            <div className="hero-left">
        <h2>New Arrivals</h2>
        <div>
            <div className="hero-hand-icon">
                <p>Eat</p>
                <img src={hand_icon} alt=''/>
            </div>
            <p>AAM</p>
            <p>BE CALM</p>
        </div>
       
            </div>
            <div className="hero-right">
            <img src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero