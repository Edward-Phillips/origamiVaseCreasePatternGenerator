import React from 'react';
import SVGDragAndDrop from './SVGDragAndDrop';

export default function SVGContainer() {

  const [points, setPoints] = React.useState({"point0": {cx: 50, cy: 50, key: "point0"}});

  const mapPointsToSVGPoints = () => {
    return Object.keys(points).map((pointKey) => {
    return (<SVGDragAndDrop coords={points[pointKey]} setCoords={updateValueInPointsObject} />)
  });
  } 

  const updateValueInPointsObject = (key, value) => {
    points[key] = value;
    setPoints({...points});
  }

  const addPointToPointsObject = () => {
    const newKey = `point${Object.keys(points).length}`;
    const newPoint = {cx: 50, cy: 50, key: newKey};
    points[newKey] = newPoint;
    setPoints({...points});
  }
  return (
    <div className={"svgContainer"}>
    <svg viewBox="0 0 100 100">
      {mapPointsToSVGPoints()}
    </svg>
    <button onClick={addPointToPointsObject}>Add Point</button>
    </div>
  )
  
  }