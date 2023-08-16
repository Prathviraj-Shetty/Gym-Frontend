import React from 'react'
import Featurebox from './Featurebox'
import fimage1 from '../assets/images/1.svg'
import fimage2 from '../assets/images/2.svg'
import fimage3 from '../assets/images/3.svg'
import fimage4 from '../assets/images/4.svg'

export default function Feature() {
  return (
    <div id='features'>
      <head>FEATURES</head>
      <div className="a-container">
        <Featurebox image={fimage1} title="WeightLifting" body={"Lift weights, get strong, reach goals, transform your body."} />
        <Featurebox image={fimage2} title="Specific Muscle" body={"Flex your guns, show off your arm gains."} />
        <Featurebox image={fimage3} title="Flex Your Muscle" body={"Show off your strength, flex your muscle, own the spotlight"} />
        <Featurebox image={fimage4} title="Cardio Excercise" body={"Boost your heart health, burn calories, improve endurance, feel energized"}/>
      </div>

    </div>
  )
}
