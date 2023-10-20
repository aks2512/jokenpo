import "./style.css";
import { useGameContext } from "contexts/game";

interface IGestureProps {
  id: number
  name: String
  active: boolean
  title?: string
}

export function Gesture(props: IGestureProps) {
  const { handleSelectGesture, isSelectGesture } = useGameContext();

  function activeGesture() {
    if (props.id !== undefined && props.active) {
      handleSelectGesture(props.id);
    }
  }

  return (
    <div id={`gesture_${props.id}`} className="gesture_container">
      { props.title && <span className="title">{props.title}</span> }
      <button 
        onClick={() => activeGesture()} 
        className={`gesture ${props.name.toLowerCase()} ${isSelectGesture(props.id) === true && props.active === true 
          ? 'active' 
          : ''}`
        }
      >
        <img src={`/${props.name.toLowerCase()}.png`} alt="" />
      </button>
    </div>
  );
}
