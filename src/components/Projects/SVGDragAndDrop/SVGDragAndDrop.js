import React from "react";


export default function SVGDragAndDrop({coords, setCoords}) {

  const [dragging, setDragging] = React.useState(false);

  const handleClick = () => {
    setDragging(true);
  }

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
    }
  }

  const handleMouseMove = (event) => {
    if (dragging) {
      const newCoords = getNewCoords(event);
      setCoords(coords.key, newCoords);
    }
  }

  const getMousePosition = (event) => {
    const screenCTM = event.target.getScreenCTM();
    if (event.touches) {event = event.touches[0]}
    return {
      cx: (event.clientX - screenCTM.e) / screenCTM.a,
      cy: (event.clientY - screenCTM.f) / screenCTM.d,
    };
  }

  const getNewCoords = (event) => {
    const { cx, cy } = getMousePosition(event);
    return { cx , cy, key: coords.key };
  }

  return (
      <circle style={{cursor: "move", fill: "blue", opacity: "0.5"}} onMouseDown={handleClick} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} onTouchStart={handleClick} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp} onTouchLeave={handleMouseUp} onTouchCancel={handleMouseUp} cx={coords.cx} cy={coords.cy} r="5" />
  )
}