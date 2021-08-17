import React from "react";
import SVGDragAndDropContainer from "./Projects/SVGDragAndDrop/SVGDragAndDropContainer";
import "./Projects.css";
// import SVGDisplay from './Projects/SVGDisplay';

export default function Projects() {
  return (
    <section>
      <div>
        this is the Projects component, I'm going to use the github API to
        populate this page, so again, going to need a backend to process that -
        not sure what language to do the backend in, recently I have been
        working mostly in javascript/react on the frontend and PHP (laravel) on
        the backend. I kind of want to get good with Python so maybe something
        in Django or Flask - or just use Express, it's what you know?
      </div>
      <article>
        <h1>SVG Display</h1>
      <div className={`svgContainer`}>
        <SVGDragAndDropContainer />
      </div>
      </article>
    </section>
  );
}
