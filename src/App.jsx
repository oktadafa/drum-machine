import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const data = [
  {
    name: "Heater 1",
    id: "Q",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
  },
  {
    name: "Heater 2",
    id: "W",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
  },
  {
    name: "Heater 3",
    id: "E",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
  },
  {
    name: "Heater 4",
    id: "A",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
  },
  {
    name: "Clap",
    id: "S",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
  },
  {
    name: "Open HH",
    id: "D",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
  },
  {
    name: "Kick n Hat",
    id: "Z",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
  },
  {
    name: "Kick",
    id: "X",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
  },
  {
    name: "Closed-HH",

    id: "C",
    linkAudio:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
  },
];
function App() {
  const [volume, setVolume] = useState(50);
  const [action, setAction] = useState("");
  const [isOn, setIsOn] = useState(true);
  return (
    <div
      id="drum-machine"
      style={{
        background: "#8d8d8d",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#b3b3b3",
          width: 660,
          padding: 20,
          border: "3px solid yellow",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "335px",
            height: "300px",
          }}
        >
          {data.map((item, i) => {
            const refAudio = useRef(null);
            const refWrap = useRef(null);
            const playSound = () => {
              if (!isOn) return;
              setAction(item.name);

              refWrap.current.style.backgroundColor = "yellow";
              setTimeout(() => {
                if (refWrap.current)
                  refWrap.current.style.backgroundColor = "#b3b3b3";
              }, 100);

              refAudio.current.currentTime = 0;
              refAudio.current.volume = volume / 100;
              refAudio.current.play().catch((err) => console.log(err));
            };
            useEffect(() => {
              const handleKeyDown = (e) => {
                if (e.key.toUpperCase() === item.id) {
                  playSound();
                }
              };

              window.addEventListener("keydown", handleKeyDown);
              return () => window.removeEventListener("keydown", handleKeyDown);
            }, [isOn, volume]);

            return (
              <div
                key={i}
                className="drum-pad"
                id={item.id}
                ref={refWrap}
                onClick={playSound}
                style={{
                  width: "100px",
                  height: "80px",
                  border: "1px solid black",
                  margin: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "3px 3px 5px black",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <audio
                  src={item.linkAudio}
                  ref={refAudio}
                  className="clip"
                  id={item.id}
                ></audio>
                {item.id}
                <audio />
              </div>
            );
          })}
        </div>
        <div
          style={{
            border: "2px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: 20,
          }}
        >
          <button
            style={{
              padding: "3px 10px",
              fontSize: 12,
              background: isOn ? "green" : "red",
              color: "white",
            }}
            onClick={() => setIsOn(!isOn)}
          >
            {isOn ? "ON" : "OFF"}
          </button>
          <div>
            <input
              type="range"
              max={100}
              min={0}
              value={volume}
              disabled={!isOn}
              onChange={(e) => {
                setVolume(e.target.value);
                setAction("Volume: " + e.target.value);
              }}
            />
            <div
              id="display"
              style={{ width: 140, height: 30, background: "white" }}
            >
              {isOn ? action : "OFF"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
