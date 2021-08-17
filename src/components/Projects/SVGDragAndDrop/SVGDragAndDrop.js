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
      <circle style={{cursor: "move"}} onMouseDown={handleClick} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} cx={coords.cx} cy={coords.cy} r="5" />
  )
}