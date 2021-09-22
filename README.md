
# Crease Pattern Generator


the objective of this this project is to produce a tool that can be used to generate a crease pattern for a given cross section of an origami vase.
It has been made using react.

In simple terms, a crease pattern is what you get if you unfold an origami model and draw a line over all the folds on the paper.

The inspiration for this project comes from the work done by Rebecca Glieseking: [http://rebecca.gieseking.us/](http://rebecca.gieseking.us/). I have also used [this guide](https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/) to help me understand how to use react to create a draggable svg.


To run this project locally, after cloning the repo:
- run ```npm install```
- run ```npm start```


## Feature Roadmap

- color coded crease pattern:
  - instead of being all black, the lines indicating a fold will be color coded red for a mountain fold /\ and blue for a valley fold \\/
- downloadable as SVG
  - you will be able to download the .svg file at a click of a button
- origamisimulator.org integration
  - this is more a of a pipe dream but ultimately if would be wonderful to use the software developed at origamisimulator.org to display what the crease pattern will ultimately look like. Currently it doesn't look like they have a library/API that can be accessed to do this, but when I reach this stage in the project I will write to the origamisimulator.org team to see if it is possible to integrate their software into this project.