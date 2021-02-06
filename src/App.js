import './App.scss';
import React, { useState, useEffect } from 'react';

// click on button

const getMurrays = () => {
  const murrays = [];
  for (let i = 1; i < 17; i++) {
    murrays.push(
      {
        key: i,
        image: `./images/murray${i}.png`
      }
    )
  }
  return murrays;
}
const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function App() {

  const [murrays, setMurrays] = useState([...getMurrays()])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)
  const [highscore, setHighScore] = useState(0)
  const [status, setStatus] = useState('')


  useEffect(() => {
    setMurrays((m) => [ ...shuffleArray( m ) ] );

    if (clicked.indexOf(clicked[clicked.length - 1]) !== clicked.length - 1) {
      setScore(() => 0)
      setClicked(c => [])
      setStatus(() => 'bad')
      return;
    }
    if (clicked.length) {
      setScore((s) => s + 10)
      setStatus(() => 'good')
    }

  }, [clicked])

  useEffect(() => {
    setHighScore(h => h < score ? score : h)
  }, [score])

  return (
    <div className="App">
      <div className="scoreboard-wrapper">
        <div className="scoreboard">
          <h1> Too Many Murrays </h1>
          <div className="rules-label label"> Rules </div>
            <span className="rules sidebar-content" >Don't click the same Murray twice!</span>
          <div className="score-label label"> Current Score </div>
            <div className="score-wrapper">
              <span className="score sidebar-content"> {score} </span>
            </div>
          <div className="highscore-label label"> High Score </div>
            <div className="highscore-wrapper">
              <span className="highscore sidebar-content"> {highscore} </span>
            </div>
          <div className="status-label label"> </div>
            <div className="status-wrapper">
              <span className="status sidebar-content"> {status ? (status === 'good' ? '✅' : '❌') : null} </span>
            </div>
          </div>

      </div>
      <div className="gameboard-wrapper">
        <div className={`gameboard ${status}`}>
          {
            murrays.map((m => {
              return (
                <div className="button-wrapper" key={m.key}>
                  <button
                    style={{backgroundImage: `url(${m.image})`}}
                    className="murray-button"
                    onClick= {(e) => setClicked([...clicked, m.key])}
                    >
                  </button>
                </div>
              )
            }))
          }
          </div>
          {status === 'bad' ? (
            <button
              className="restartButton"
              onClick= {(e) => setStatus('')}
              > Retry </button>
          ) : null}
        </div>
      </div>
  );
}

export default App;
