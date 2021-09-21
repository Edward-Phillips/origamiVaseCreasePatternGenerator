import React from "react";
import SVGDragAndDropContainer from "./Projects/SVGDragAndDrop/SVGDragAndDropContainer";
import "./Projects.css";
// import SVGDisplay from './Projects/SVGDisplay';

export default function Projects() {
  return (
    <section>
      <article>
        <h1>SVG Display</h1>
      <div>
        <SVGDragAndDropContainer />
      </div>
      </article>
    </section>
  );
}
