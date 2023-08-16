import React from 'react';
import { Link } from 'react-router-dom';

export default function Offer() {
  return (
    <div id="offer">
      <div className="pr-heading textshadow">
        <h1>A BIG <span> OFFER </span>FOR THIS SUMMER</h1>
        <div className="pr-btns">
          <Link to="/search" className='pr-btn'>JOIN NOW</Link>
        </div>
      </div>
    </div>
  )
}
