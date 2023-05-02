import React from 'react';
import Page404 from './assets/imgs/not-found-error.png'

function NotFound() {
  return (
    <div>
      <div class="body-notfound">
        <img src={Page404} style={{ height: "auto", width: "100%" }} />
      </div>
      <div class="button-homepage"> 
        <a href="/"><button type="button" class="btn btn-primary">Go to Home</button></a>
      </div>
    </div>
  );
}

export default NotFound;