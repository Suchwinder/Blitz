import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * BrowserRouter is a version of react routing in order to match the
 * UI(User Interface) with the URL selected.
 * So it basically is one of many approaches 
 * to ensure what we see on the webpage matches the link we are at.
 * in other words
 * This provides the routing ability to change the URL to the 
 * appropriate link such that additional features can be loaded
 * in for our SPA(Single Page Application). It allowes the user to move backwards and
 * forwards in the webpage. Also provides deeplinking
 * where hyperlinks lead to a specific content instead of a 
 * general home page.
 * 
 * https://stackoverflow.com/questions/53065686/why-do-we-use-browserrouter-in-react
 */
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>, 
  document.getElementById('root')
);