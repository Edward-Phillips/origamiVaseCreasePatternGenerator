import React from "react";

export default function SVGDragAndDrop() {

  const [cx, setCx] = React.useState(50);
  const [cy, setCy] = React.useState(50);
  const [dragging, setDragging] = React.useState(false);

  const handleClick = (event) => {
    console.log("circle has been clicked");
    setDragging(true);
  }

  const handleMouseUp = (event) => {
    if (dragging) {
      console.log("click released");
      setDragging(false);
    }
  }

  const handleMouseMove = (event) => {
    if (dragging) {
      const coords = getMousePosition(event);
      console.log(event);
      setCx(coords.x);
      setCy(coords.y);
    }
  }

  const getMousePosition = (event) => {
    const screenCTM = event.target.getScreenCTM();
    return {
      x: (event.clientX - screenCTM.e) / screenCTM.a,
      y: (event.clientY - screenCTM.f) / screenCTM.d
    };
  }

  return (
    <svg viewBox="0 0 100 100">
      <circle style={{cursor: "move"}} onMouseDown={handleClick} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} cx={cx} cy={cy} r="10" />
    </svg>
  )
}