import { gestures, useGameContext } from "contexts/game";
import { Gesture } from "../../components/Gesture";
import "./style.css";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function Game() {
  const { playGame, score, getScore } = useGameContext();

  useEffect(() => {
    if (Cookies.get('token') !== undefined) {
      getScore()
    }
  },[])

  return (
    <section className="interna">
      <div className="game">
        <div>
          <h1>Choose your best choice</h1>
          <span className="score">{score !== 0 ? `Score: ${score}` : ''}</span>
        </div>
        <div className="gestures">
          { gestures.map((gesture, id) => 
            <Gesture 
              key={`gesture-${id}`}
              id={id}
              name={gesture}
              active={true}
            />
          )}
        </div>
        <button onClick={playGame} className="play">Play</button>
      </div>
    </section>
  )
}