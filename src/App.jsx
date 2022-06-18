import { useEffect } from 'react';
import quotes from './quotes.json';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const random_quote = () => {
  let index = Math.floor(Math.random() * quotes.length);
  let quote = quotes[index].quote;
  let author = quotes[index].movie + ', ' + quotes[index].year;

  /* Input the quote and the author in the fields */
  const quote_field = document.getElementById('text');
  const author_field = document.getElementById('author');

  quote_field.innerText = quote;
  author_field.innerText = '~ ' +  author;
}


const App = () => {

  /* Load a random quote on load */
  useEffect(() => {
    random_quote();
  });

  return (
    <>
    {/* Title */}
      <div id="title">
        <span>.io</span> | Random Quote Generator
      </div>

      <div id="quote-box">
        <div id="text"></div>
        <div id="author"></div>
        <div id="border"></div>
        <div id="buttons">
          <button id="new-quote" onClick={random_quote}>
            <FontAwesomeIcon icon={ faArrowsRotate } />
          </button>
          <div id="tweet">
            <a href="twitter.com/intent/tweet" id="tweet-quote">
              <FontAwesomeIcon icon={ faTwitter } />
            </a>
          </div>
         
        </div>
      </div>
    </>
  )
}



export default App;
