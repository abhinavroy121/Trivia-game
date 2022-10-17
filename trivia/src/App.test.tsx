import React from 'react';
import { render, screen,fireEvent  } from '@testing-library/react';
import App from './App';

describe('renders react app', () => {
    beforeEach(() => {
        render(<App />);
    })
 
   test("should have navbar component", () => {
      let apppage = screen.getByTestId("apppage")
      expect(apppage).toBeInTheDocument()
   })
});
