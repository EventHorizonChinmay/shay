import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { sliderData } from './slider-data'
import './Slider.scss'

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slideLength = sliderData.length

    const autoScroll = true;
    let slideInterval;
    let intervalTime =8000;
    const prevSlide=()=>{
        setCurrentSlide(currentSlide===0? (slideLength-1): (currentSlide-1))
        console.log('current Slide no: ',currentSlide)
    }
    const nextSlide =() =>{
        currentSlide===sliderData.length-1? setCurrentSlide(0): setCurrentSlide(currentSlide+1)
        // console.log('current Slide no: ',currentSlide)
    }
    useEffect(()=>{
        setCurrentSlide(0)
    },[])

    // const auto= ()=>{
    //     slideInterval=setInterval(nextSlide,intervalTime)
    // }
    useEffect(()=>{
        const auto= ()=>{
            slideInterval=setInterval(nextSlide,intervalTime)
        }
        autoScroll && auto();
        return () => clearInterval(slideInterval)
    },[currentSlide, slideInterval, autoScroll]) //waits for intervalTime secs everytime curerntSlide is chaged

    return (
    <div className='slider'> Slider
        <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
        <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>
        {sliderData.map((slide,index) => {
            const {image, heading, desc} = slide
            return(
                <div key={index} className={index===currentSlide? 'slide current' : 'slide'}> 
                    {index===currentSlide && (
                        <>
                            <img src={image} alt='slide'/>
                            <div className='content'>
                                <h2> {heading}</h2>
                                <p> {desc} </p>
                                <hr/>
                                <a href='#products' className='--btn-primary'> Shop Now</a>
                            </div>
                        </>
                    )}
                </div>
            )
        })}

    </div>
  )
}

export default Slider