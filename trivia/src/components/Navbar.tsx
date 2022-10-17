import React from 'react'
import styles from "./styles/Navbar.module.css"
const Navbar = () => {

    const element =  JSON.parse(localStorage.getItem("answerinlocal") || "false");


  return (
    <div>
        <div className={styles.container}>
        <h5>{`Question Type: ${element.type}`}</h5>
            <p>{`Difficulty:${element.difficulty}`}</p>
        </div>
    </div>
  )
}

export default Navbar