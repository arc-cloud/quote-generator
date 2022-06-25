import { useEffect } from 'react';
import quotes from './quotes.json';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


const App = () => {
  let load_state = true;
  
  /* Loading a random quote from quotes.json */
  const random_quote = () => {
    let index = Math.floor(Math.random() * quotes.length);
    let quote = quotes[index].quote;
    let author = quotes[index].movie + ', ' + quotes[index].year;
    
    const quote_field = document.getElementById('text');
    const author_field = document.getElementById('author');
    
    /* Input the quote and the author in the fields */
    if (quote_field && author_field) {
      author_field.innerText = '~ ' + author;
      quote_field.innerText = '" ' + quote + ' "';
    }
  };
  
  let particle_x = 150;
  let particle_y = 75;
  let particle_radians = 0;
  
  let particle = {
    x: particle_x,
    y: particle_y + 10,
    radius: 5,
    radians: particle_radians,
  }
  
  const loading = (canvas) => {
    if (load_state) {
      
      const ctx = canvas.getContext('2d');
      
      particle.radians += 0.1;
      particle.x += Math.cos(particle.radians) * 2;
      //load_particle.y += Math.sin(load_particle.radians) * 2;
      ctx.fillStyle = 'rgb(53, 53, 85, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
      
      
    }
    //requestAnimationFrame(loading(canvas));
  };

  const bg_color_change = (el) => {
    console.log(el.style.background);
  }
  
  
  const load_new_quote = () => {
    const quote_box = document.getElementById('quote-box');
    const sub_wrapper = document.getElementById('sub-wrapper');
    bg_color_change(quote_box);
    
    let interval_1, interval_2;
    
    if (load_state) {
      sub_wrapper.innerHTML = '<canvas id="canvas"></canvas>';
      const canvas = document.getElementById('canvas');
      
      interval_1 = setInterval(() => {
        loading(canvas);
      }, 10);
      
      interval_2 = setInterval(() => {
        load_state = false;
        sub_wrapper.innerHTML = '<div id="text"></div> <div id="author"></div>';
        random_quote();
        load_state = true;
        clearInterval(interval_1);
        clearInterval(interval_2);
      }, Math.floor(Math.random() * 4000));
    }
  }
  
  
  /* App.onload */
  useEffect(() => {
    random_quote();    
  });
  
  return (
    <>
      {/* Title */}
      <div id="title">
        <span>arc</span> | random quote generator
      </div>
      
      <div id="quote-box">
        <div id="sub-wrapper">
          <div id="text"></div>
          <div id="author"></div>
        </div>
        <div id="border"></div>
        <div id="buttons">
          <button id="new-quote" onClick={load_new_quote}>
            <FontAwesomeIcon icon={ faArrowsRotate } />
          </button>
          <div id="tweet">
            <a href="https://twitter.com/intent/tweet" id="tweet-quote" target="_blank">
              <FontAwesomeIcon icon={ faTwitter } />
            </a>
          </div>
        
        </div>
      </div>
    </>
    )
  }
  
  
  
  export default App;
  