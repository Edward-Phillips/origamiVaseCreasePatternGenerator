import React from 'react';
import './CreasePattern.css'
export default function SVGCreasePatternContainer({points, goreWidth, goreLength, goreNumber}) {

  const pointsArray = Object.keys(points).map(p => points[p]);
  const maxcx = Math.max(...pointsArray.map(p => p.cx));
  const mincx = Math.min(...pointsArray.map(p => p.cx));

  // function to calculate length of line from array of points
  const lengthAlongLine = (pointsArray) => {
    let length = 0;
    for (let i = 0; i < pointsArray.length - 1; i++) {
      length += Math.sqrt(Math.pow(pointsArray[i].cx - pointsArray[i + 1].cx, 2) + Math.pow(pointsArray[i].cy - pointsArray[i + 1].cy, 2));
    }
    return length;
  }

  // function to take in 2 points and return the length of the line between them

  const lineLength = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.cx - p2.cx, 2) + Math.pow(p1.cy - p2.cy, 2));
  }

  // function to take in a height and a width and return  an SVG with 4 lines that make a rectangle of that size
  const makeGoreOutline = (height, width, xOffset = 0) => {
    width = parseFloat(width);
    xOffset = parseFloat(xOffset);
    return (
      <>
        <line className="makeGoreOutLine" x1={xOffset} y1={0} x2={xOffset + width} y2={0} style={{stroke: 'black'}} strokeWidth="1px" strokeLinecap="round" />
        <line className="makeGoreOutLine" x1={xOffset} y1={height} x2={xOffset + width} y2={height} style={{stroke: 'black'}} strokeWidth="1px" strokeLinecap="round" />
        <line className="makeGoreOutLine" x1={xOffset} y1={0} x2={xOffset} y2={height} style={{stroke: 'black'}} strokeWidth="1px" strokeLinecap="round" />
        <line className="makeGoreOutLine" x1={xOffset + width} y1={0} x2={xOffset + width} y2={height} style={{stroke: 'black'}} strokeWidth="1px" strokeLinecap="round" />
      </>
    );
  }

  // function to take in 2 points and a yOffset and return a horizontal SVG line at a height of the lineLength between the points + the yOffset
  const makeSectionLine = (p1, p2, yOffset = 0, xMin = 0, xMax = 100) => {
    const distance = lineLength(p1, p2);
    const height = distance + yOffset;
    return (
      <line className="makeSectionLine" x1={xMin} y1={height} x2={xMax} y2={height} style={{stroke: 'black'}} />
    );
  }

  // function to iterate over an array of points and make section lines for each point, using the lengthAlongLine function passing the points up to the current point as the yOffset
  const makeSectionLines = (points, xMin, xMax) => {
    const sectionLines = [];
    for (let i = 0; i < points.length - 1; i++) {
      sectionLines.push(makeSectionLine(points[i], points[i + 1], lengthAlongLine(points.slice(0, i + 1)), xMin, xMax));
    }
    return sectionLines.map((line) => {
      return (
        <>
        {line}
        </>
      );
    });
  }

  // function to take a point and calculate the percentage of the maxc that the cx of the point is, then return that multiplied by the goreWidth
  const getPositionAlongGore = (point) => {
    return 0.5 * goreWidth + (point.cx)/(maxcx) * goreWidth / 2;
  }

  //function to take in two points and the yOffset and return a line between the two points with the x value as getPercentageOfGore of each point, the first y value as the yOffset and the second y value as the yOffset + the LineLength between the two points
  const makeGoreLine = (p1, p2, xOffset = 0, yOffset = 0) => {
    const distance = lineLength(p1, p2);
    const x1 = goreWidth - getPositionAlongGore(p1) + xOffset;
    const x2 = goreWidth - getPositionAlongGore(p2) + xOffset;
    const y1 = yOffset;
    const y2 = yOffset + distance;
    return (
      <line className="makeGoreLine" x1={x1} y1={y1} x2={x2} y2={y2} style={{stroke: 'black'}} strokeWidth="1px" strokeLinecap="round" />
    );
  }

  // function to take in an array of points and return a SVG line for each point with the x value as getPercentageOfGore of each point, the first y value as the yOffset and the second y value as the yOffset + the LineLength between the two points
  const makeGoreLines = (points, xOffset = 0) => {
    const goreLines = [];
    for (let i = 0; i < points.length - 1; i++) {
      goreLines.push(makeGoreLine(points[i], points[i + 1], xOffset, lengthAlongLine(points.slice(0, i + 1))));
    }
    return goreLines.map((line) => {
      return (
        <>
        {line}
        </>
      );
    });
  }

  // function to call makeGoreOutline, makeSectionLines and makeGoreLines, passing in the xOffset
  const makeGore = (gorePosition) => {
    const xOffset = gorePosition * goreWidth;
    return (
      <>
        {makeGoreOutline(lengthAlongLine(pointsArray), goreWidth, xOffset)}
        {makeSectionLines(pointsArray, xOffset, xOffset + goreWidth)}
        {makeGoreLines(pointsArray, xOffset)}
      </>
    );
  }

  // function to determine the viewbox of the svg based on the width and height of the svg
  const getViewBox = () => {
    return `0 0 ${goreNumber * goreWidth} ${lengthAlongLine(pointsArray)}`;
  }

  return (
    <div className="svgWrapper">
      <svg className="creasePatternSVG" viewBox={getViewBox()}>
        <g>
          {Array(parseFloat(goreNumber)).fill(0).map((_, i) => makeGore(i))}
        </g>
      </svg>
    </div>
  );
}