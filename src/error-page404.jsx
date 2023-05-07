import React from 'react';
import Page404 from './assets/imgs/not-found-error.png'

function NotFound() {
  return (
    <div>
      <div className="body-notfound">
        <img src={Page404} style={{ height: "auto", width: "100%" }} />
      </div>
      <div className="button-homepage"> 
        <a href="/"><button type="button" className="btn btn-primary">Go to Home</button></a>
      </div>
    </div>
  );
}

export default NotFound;