import React, { useEffect, useState } from "react";
import "./App.css";

const App = (props) => {
  const { size, close, z } = props;
  const [showChild, setShowChild] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState([0, 0]);
  const [offset, setOffset] = useState([0, 0]);
  const [bg, setBg] = useState(null);
  const [trigger, setTrigger] = useState(true);

  const styles = {
    transform: `translate(${pos[0]}px, ${pos[1]}px)`,
    border: "1px solid black",
    borderRadius: "2px",
    width: `${size}px`,
    height: `${size * 0.75}px`,
    margin: "15px 40px",
    zIndex: z,
    background: `#${bg}`,
  };

  const contentStyles = {
    width: "100%",
    height: "100%",
  };

  const closeHandler = () => {
    setShowChild(false);
  };

  function handleMouseUp(e) {
    setDragging(false);
  }

  function handleMouseDown(e) {
    setDragging(true);
    setOffset([e.clientX - pos[0], e.clientY - pos[1]]);
  }
  function handleMouseMove(e) {
    if (dragging) {
      const x = e.clientX - offset[0];
      const y = e.clientY - offset[1];
      const newx = Math.min(Math.max(x, -40), 40);
      const newy = Math.min(Math.max(y, -15), 15);
      setPos([newx, newy]);
    }
  }

  function trottledMouseMove(e) {
    if (!trigger) {
      return;
    }
    setTrigger(false);
    handleMouseMove(e);
    setTimeout(() => {
      setTrigger(true);
    }, 0);
  }

  useEffect(() => {
    setBg(Math.floor(Math.random() * 16777215).toString(16));
  }, []);

  return (
    <div className="modal-wrapper" style={styles}>
      <div
        className="modal-header"
        onMouseDown={handleMouseDown}
        onMouseMove={trottledMouseMove}
        onMouseUp={handleMouseUp}
      >
        Header
      </div>
      <div className="modal-content" style={contentStyles}>
        {showChild ? (
          <div>
            <App size={size - 80} close={closeHandler} z={z + 1} />
          </div>
        ) : (
          <>
            {size > 100 && (
              <button
                onClick={() => {
                  setShowChild(true);
                }}
              >
                Accept
              </button>
            )}
            {close && (
              <button
                onClick={() => {
                  close();
                }}
              >
                Reject
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
