import Cookies from "js-cookie";
import { api } from "lib/api";
import { ReactElement, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomIntInclusive } from "utils";

interface IGameProviderProps {
  children: ReactElement;
}

interface IGameContext {
  selectedGesture?: String | null
  setSelectGesture?: Function
  CPUGesture?: String | null
  setCPUGesture?: Function
  result?: String
  setResult?: Function
  score?: Number
  setScore?: Function
}

export const gestures = ["Pedra", "Papel", "Tesoura"];

const GameContext = createContext<IGameContext>({});
GameContext.displayName = "Game";

export default function GameProvider(props: IGameProviderProps) {
  const [selectedGesture, setSelectGesture] = useState<String>();
  const [CPUGesture, setCPUGesture] = useState<String>();
  const [score, setScore] = useState<Number>(0);
  const [result, setResult] = useState<String>();

  return (
    <GameContext.Provider
      value={{
        selectedGesture,
        setSelectGesture,
        CPUGesture,
        setCPUGesture,
        result,
        setResult,
        score,
        setScore
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const navigate = useNavigate();
  const {
    selectedGesture,
    setSelectGesture,
    CPUGesture,
    setCPUGesture,
    result,
    setResult,
    score,
    setScore
  } = useContext(GameContext);

  function handleSelectGesture(id: number) {
    if (setSelectGesture) setSelectGesture(gestures[id]);
    if (setCPUGesture) setCPUGesture(gestures[getRandomIntInclusive(0, 2)]);
  }

  function isSelectGesture(id: number) {
    if (selectedGesture) return gestures[id] === selectedGesture;
    return false;
  }

  function playGame() {
    if (selectedGesture && CPUGesture) navigate("/vencedor");
  }

  function playAgain() {
    if (setSelectGesture && setCPUGesture) {
      setSelectGesture();
      setCPUGesture();
    }
    navigate("/jogo");
  }

  function handleResult() {
    if (setResult) {
      if (selectedGesture && CPUGesture) {
        // Draw
        if (selectedGesture === CPUGesture) {
          setResult("Draw");
        }
        // Win
        else if (
          (selectedGesture === "Pedra" && CPUGesture === "Tesoura") ||
          (selectedGesture === "Papel" && CPUGesture === "Pedra") ||
          (selectedGesture === "Tesoura" && CPUGesture === "Papel")
        ) {
          setResult("You Win");
          setNewScore();
        } else {
          setResult("You Lose");
        }
      }
    }
  }

  function setNewScore() {
    if (setScore && Cookies.get('token') !== undefined) {
        api.post(
          "/score",
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        ).then((response) => {
            setScore(response.data.score)
        });
    }
  }

  function getScore() {
    if (setScore) {
        api.get('/score', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then((response) => {
            setScore(response.data.score)
        });
    }
  }

  return {
    selectedGesture,
    handleSelectGesture,
    CPUGesture,
    isSelectGesture,
    playGame,
    playAgain,
    result,
    handleResult,
    score,
    getScore
  };
}
