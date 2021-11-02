
import React, {useEffect, useState} from 'react'

function Glass({x, y, highRes}) {
  console.log(highRes);
  return(
    <>
    <div style={{
      width: "64px", height: "64px", border: "1px solid red", borderRadius: "50%", position: "absolute", left: `${x - 32}px`, top: `${y - 32}px`,
      backgroundImage: `url(https://interview.plaid.com/mg/mg_high_res.jpg)`,
      backgroundPosition: `${(x * -4) + 90}px ${(y * -4) + 90}px`, backgroundRepeat: "no-repeat"
    
    }}></div>
    </>
  )
} 

export default function Magnify({lowResSrc, highResSrc }) {
  const [xCoord, setX] = useState(null);
  const [yCoord, setY] = useState(null);

  return (
    <div>
      <Glass x={xCoord} y={yCoord} highRes={highResSrc}/>
      <img src="https://interview.plaid.com/mg/mg_low_res.jpg" alt="img" onMouseMove={(e) => {
        console.log((e.pageX * -4), (e.pageY  * -4));
        setX(e.pageX)
        setY(e.pageY)
      }} />
    </div>
  )
}


// Glass 64 x 64
//  Glass should have a border
//  Glass should be center on mouse cursor

// API
// <Magnify lowResSrc={path to image} highResSrc={path to image} />

