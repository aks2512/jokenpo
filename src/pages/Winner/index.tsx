import { useGameContext } from "contexts/game";
import { Gesture } from "../../components/Gesture";
import "./style.css";

import x from 'assets/images/X.png';
import { useEffect } from "react";
import Cookies from "js-cookie";

export function Winner() {
  const {CPUGesture, selectedGesture, playAgain, handleResult, result, score, getScore} = useGameContext();

  useEffect(() => {
    handleResult();
    if (Cookies.get('token') !== undefined) {
      getScore()
    }
  },[])

  if (CPUGesture && selectedGesture && result) {
    return (
      <section className="interna">
        <div className="game">
          <div>
            <h1>{result}</h1>
            <span className="score">{score !== 0 ? `Score: ${score}` : ''}</span>
          </div>
          <div className="gestures">
            <Gesture
              id={0}
              name={selectedGesture}
              active={false}
            />
            <img className="separator" src={x} alt="" />
            <Gesture
              id={1}
              name={CPUGesture}
              active={false}
            />
          </div>
          <button onClick={playAgain} className="play">Play Again</button>
        </div>
      </section>
    )
  } else {
    return (
      <section className="interna">
        <div className="error">
          <h1>Erro 500</h1>
        </div>
      </section>
    )
  }
}