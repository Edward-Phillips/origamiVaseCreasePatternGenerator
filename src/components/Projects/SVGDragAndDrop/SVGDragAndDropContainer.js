import React, { useEffect } from 'react';
import SVGCreasePatternContainer from '../SVGCreasePattern/SVGCreasePatternContainer';
import SVGDragAndDrop from './SVGDragAndDrop';
import './SVGDragAndDropContainer.css';
import defaultValues from './defaultValues';

export default function SVGContainer() {

  const [points, setPoints] = React.useState(defaultValues.points);
  // set up gore Number, default is 10
  const [goreNumber, setGoreNumber] = React.useState(defaultValues.goreNumber);
  // set up gore width, default is 10
  // set up gore height, default is 100
  const [goreLength, setGoreLength] = React.useState(defaultValues.goreLength);
  // set up totalWidth, default is 300
  const [totalWidth, setTotalWidth] = React.useState(defaultValues.totalWidth);

  const [displayCreasePattern, setDisplayCreasePattern] = React.useState(defaultValues.displayCreasePattern);
  
  const pointsArray = Object.keys(points).map(p => points[p]);
  const maxcx = Math.max(...pointsArray.map(p => p.cx));
  const goreWidth = totalWidth/goreNumber;
  
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
    <div className="mainWrapper">
      <div className="SVGOuterContainer">
        <div className="svgContainer">
          <svg viewBox="0 0 100 100">
            {shouldAddPolyline() ? generatePolyLine() : null}
            {mapPointsToSVGPoints()}
          </svg>
        </div>
        <div className="SVGControls">
          <button onClick={addPointToPointsObject}>Add Point</button>
          <button onClick={removeLastPointFromPointsObject}>Remove Last Point</button>
          <div className="goreInputs">
            <label for="gore-number-input">Gore Number:</label>
            <input id="gore-number-input" type="number" onChange={(e) => setGoreNumber(e.target.value)} value={goreNumber}></input>
            <label for="gore-width-input">Gore Width:</label>
            <input id="gore-width-input" type="number" value={goreWidth}></input>
            <label for="gore-height--input">Gore length:</label>
            <input id="gore-height-input" type="number" onChange={(e) => setGoreLength(e.target.value)} value={goreLength}></input>
            <label for="total-width-input">Total Width:</label>
            <input id="total-width-input" type="number" onChange={(e) => setTotalWidth(e.target.value)} value={totalWidth} min={maxcx * maxcx * Math.PI/ 100}></input>
            <label for="gore-width-input">Display Crease Pattern:</label>
            <button id="gore-width-input" onTouch={(e) => setDisplayCreasePattern(!displayCreasePattern)} onClick={(e) => setDisplayCreasePattern(!displayCreasePattern)}>{displayCreasePattern ? 'Hide' : 'Display'} Crease Pattern</button>
          </div>
        </div>
      </div>
      {displayCreasePattern && <SVGCreasePatternContainer points={points} goreWidth={goreWidth} goreLength={goreLength} goreNumber={goreNumber} />}
    </div>
  );
}
