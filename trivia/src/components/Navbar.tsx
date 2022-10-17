import React from 'react'
import styles from "./styles/Navbar.module.css"
const Navbar = () => {

    const element =  JSON.parse(localStorage.getItem("answerinlocal") || "false");


  return (

        <div className={styles.container}>
            <h2 data-testid='heading'>Trivia Game</h2>
        <h5>{`${element.type} Type`}</h5>
            <p className={styles.para}>{`Difficulty:${element.difficulty}`}</p>
        </div>
   
  )
}

export default Navbar