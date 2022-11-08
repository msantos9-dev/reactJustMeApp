import React, { useState } from "react";
import "../styles/global.css";

const DarkMode = () => {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let current = "";
  let theme;
  const [buttonText, setButtonText] = useState(localStorage.getItem("theme") === "light" ? " Dark" : " Light") ;
  const [buttonIcon, setButtonIcon] = useState(localStorage.getItem("theme") === "light" ? "moon" : "sunny") ;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      setButtonIcon("moon")
      setButtonText(" Dark")
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      current="light"
      setButtonIcon("sunny")
      setButtonText(" Light")
      theme = darkTheme;
    }
  };

  return (
    <>
    
      
    <ion-icon id="darkMode"
    onClick={(e) => switchTheme(e)} name={buttonIcon }></ion-icon>
    </>
  );
};

export default DarkMode;