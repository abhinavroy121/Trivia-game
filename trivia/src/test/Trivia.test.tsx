import React from 'react';
import { render, screen,fireEvent  } from '@testing-library/react';
import Trivia from '../components/Trivia';

describe("first rendering", () => {
       beforeEach(() => {
        render(<Trivia/>)
       })

    test("should have navbar component", () => {
      let apppage = screen.getByTestId("maindivhere")
      expect(apppage).toBeInTheDocument()
   })

   test("should have main div", () => {
    let maindivhere = screen.getByTestId("maindivhere")
    expect(maindivhere).toBeInTheDocument()
   })

   xtest("should have button to change question", () => {
     let change = screen.getByTestId("change")
     expect(change).toBeInTheDocument()
   })
    
   xtest("should have button to check answer", ()=>{
       let triviabutton = screen.getByTestId("triviabutton")
       expect(triviabutton).toHaveTextContent('check')
   })
})