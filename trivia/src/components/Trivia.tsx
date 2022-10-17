import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdDoneAll,MdDangerous } from "react-icons/md";
import { TextField } from "@mui/material";

import styles from "./styles/Trivia.module.css"

// Assigning schema for data received by API call
type ResponseData = {
  category: string;
  question: string;
  answer: string;
  incorrect_answers: string;
  difficulty: string;
  type: string;
};


// styles for modal imported from material-ui library
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const Trivia = () => {

  // Getting the hidden answer from local Storage
  var getanswer = JSON.parse(localStorage.getItem("answerinlocal") || "false");
   if(getanswer){
    getanswer = getanswer.correct_answer.toLowerCase();
   }


  // Declaring varibles to keep and update value in State
  const [data, setdata] = useState([]); // data fetched by API
  const [input, setinput] = useState(""); // Catching value from input
 const [modalvalue,setmodalvalue] = useState("") // for catching the status of answer in modal

  const [open, setOpen] = React.useState(false); // imported from material-ui to open the modal
  
  const handleClose = () => setOpen(false);  //  function to close modal
 

  useEffect(() => {
    fetchquestion(); // invoking the function of API call on mounting any change occur
  }, []);

  function fetchquestion() {
 
    fetch("https://opentdb.com/api.php?amount=1")
    .then(response => response.json())
    .then(data => {
        setdata(data.results)                   // adding fetched data to data variable in state
               localStorage.setItem(         // adding answer of the question to localStorage
          "answerinlocal",
          JSON.stringify(data.results[0])
        );
        // console.log(data.results[0])
    })
  }

  // Function to invoked on the click of the button to check the answer

  const handleSubmit = () => {
    if (input.length < 1) {
      alert("Please Enter an Answer");
      return;
    }
    let texttolower = input.toLowerCase();
    if (getanswer == texttolower) {
      console.log("true");
     setmodalvalue("Correct Answer")
    } else if (texttolower.length > 0) {
      console.log("false");
      setmodalvalue("Wrong Answer")
    }

    setOpen(true);
  };
  
  // function to go to next question  from the modal pop-up
  const handlenext = ()=>{
     setOpen(false)
     fetchquestion()
     setinput("")
     
  }

  return  (
    <div className={styles.maindiv} data-testid="maindivhere" >
      <div>
        {/* mapping data for better view and understanding */}
        {data.map((item: ResponseData, index: number) => (
          <div key={index} >
           
          <div className={styles.middlediv}>
          <h3>Q: {item.question}</h3>
         { item.type== "multiple"?  <ul>
            <li>{item.incorrect_answers[0]}</li>
           <li>{item.incorrect_answers[1]}</li>
           <li>{item.incorrect_answers[2]}</li>
           <li>{getanswer}</li>
            </ul> : 
            <ul>
                <li>{item.incorrect_answers[0]}</li>
                <li>{getanswer}</li>
            </ul>
            } 
           
          </div>
             <div className={styles.buttons}>
              <TextField  placeholder={"Answer"} type="text"value={input}  onChange={(e) => setinput(e.target.value)} data-testid="inputtag"  />
              <Button onClick={handleSubmit} variant={"contained"}  data-testid="triviabutton" >Check</Button>
            </div>
          </div>
        ))}

       {/* // modal for showing right or wrong choice */}
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
         {modalvalue=="Correct Answer"?<MdDoneAll style={{color:"green"}}/>: <MdDangerous style={{color:"red"}}/>} {modalvalue}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button variant={"contained"} onClick={handlenext} data-testid="change">Next</Button>
          </Typography>
        </Box>
      </Modal>
      </div>
    </div>
  );
};

export default Trivia;
