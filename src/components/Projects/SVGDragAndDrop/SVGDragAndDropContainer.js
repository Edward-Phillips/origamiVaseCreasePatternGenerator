import React from 'react';
import SVGDragAndDrop from './SVGDragAndDrop';
import './SVGDragAndDropContainer.css';

export default function SVGContainer() {

  const [points, setPoints] = React.useState({"point0": {cx: 0, cy: 100, key: "point0"}, "point1": {cx: 50, cy: 100, key: "point1"}});

  const mapPointsToSVGPoints = () => {
    return Object.keys(points).map((pointKey) => <SVGDragAndDrop coords={points[pointKey]} setCoords={updateValueInPointsObject} />);
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

  const removeLastPointFromPointsObject = () => {
    const lastKey = Object.keys(points).pop();
    delete points[lastKey];
    setPoints({...points});
  }

  const shouldAddPolyline= () => {
    return Object.keys(points).length > 1;
  }


  const generatePolylinePointsStringFromPointsObject = () => {
    const pointsString = Object.keys(points).map((pointKey) => {
      return `${points[pointKey].cx},${points[pointKey].cy}`;
    }).join(" ");
    return pointsString;
  }

  const generatePolyLine = () => {
    return <polyline points={generatePolylinePointsStringFromPointsObject()} fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
  }


  return (
    <div className="SVGOuterContainer">
      <div className={"svgContainer"}>
        <svg viewBox="0 0 100 100">
          {shouldAddPolyline() ? generatePolyLine() : null}
          {mapPointsToSVGPoints()}
        </svg>
      </div>
      <div className="SVGControls">
      <button onClick={addPointToPointsObject}>Add Point</button>
      <button onClick={removeLastPointFromPointsObject}>Remove Last Point</button>
      </div>
    </div>
  )
  
  }