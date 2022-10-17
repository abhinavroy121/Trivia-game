import React from 'react';
import { render, screen,fireEvent  } from '@testing-library/react';
import Navbar from "../components/Navbar"


describe('Navbar testing', () => {
    beforeEach(() => {
        render(<Navbar/>)
    })

  test("Navbar should have title", () => {
     let heading = screen.getByTestId("heading")
     expect(heading).toBeInTheDocument()
     expect(heading).toHaveTextContent('Trivia Game')
  })
})