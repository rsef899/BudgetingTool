import './LoadingScreen.css';
import React from "react";
import logo from './images/logo.jpg';

function LoadingScreen(props){

    const handleLoginButton = (event) => {
        props.setOnHomeScreen(false);
    }

    return(
         <div className='loading-Screen-Container'>
            <img src={logo} alt="Logo" className='LoadingPageLogo'/>
            <div className="use-Lite-grid-cont">
            <h1 className='Loading-Screen-Header'>Budget-er</h1>
                <h1 className='Lite-Selection-Header'>Click to use</h1>
                <button className= "LiteButton" type="submit" onClick={handleLoginButton} >Budget-er Lite</button>
            </div>
            <div class="form-container">
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username"></input>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"></input>
                </form>
            </div>
        </div>

    );
}
export default LoadingScreen;