import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
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
  getanswer = getanswer.correct_answer.toLowerCase();

  // Declaring varibles to keep and update value in State
  const [data, setdata] = useState([]); // data fetched by API
  const [input, setinput] = useState(""); // Catching value from input
 const [modalvalue,setmodalvalue] = useState("")
 const [len,setlen] = useState(0)
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => setOpen(false);
  


  useEffect(() => {
    fetchquestion(); // invoking the function of API call on mounting any change occur
  }, []);

  function fetchquestion() {
    axios
      .get("https://opentdb.com/api.php?amount=1")
      .then((res: AxiosResponse) => {
        console.log(res.data.results[0]);
        setlen(res.data.results[0].incorrect_answers.length)
        setdata(res.data.results);

        localStorage.setItem(
          "answerinlocal",
          JSON.stringify(res.data.results[0])
        );
      })
      .catch((err: AxiosResponse) => {
        console.log(err);
      });
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
  

  const handlenext = ()=>{
     setOpen(false)
     fetchquestion()
     setinput("")
     
  }
  
  return  (
    <div className={styles.maindiv}>
      <div>
        {data.map((item: ResponseData, index: number) => (
          <div key={index} >
           
            <h3>Q: {item.question}</h3>
            <ul>
            <li>{item.incorrect_answers[0]}</li>
           <li>{item.incorrect_answers[1]}</li>
           <li>{item.incorrect_answers[2]}</li>
           <li>{getanswer}</li>
            </ul>
           
          
       
            <div className={styles.buttons}>
              <TextField  placeholder={"Answer"} type="text"value={input}  onChange={(e) => setinput(e.target.value)}  />
              <Button onClick={handleSubmit} variant={"contained"}>Check</Button>
            </div>
          </div>
        ))}:

       
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
          <Button variant={"contained"} onClick={handlenext}>Next</Button>
          </Typography>
        </Box>
      </Modal>
      </div>
    </div>
  );
};

export default Trivia;
