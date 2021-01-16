import { createReveresed } from "svg-path-d";
import { createCircle, createStar } from "./create";
import { pathToString, pathToViewBox } from "./format";

export function createStarElement(
  centerX: number,
  centerY: number,
  pointCount: number,
  rMin: number,
  rMax: number
) {
  const path = createCircle(centerX, centerY, rMax * 1.2);
  const hole = createReveresed(createCircle(centerX, centerY, rMax * 1.1));
  const star = createStar(centerX, centerY, pointCount, rMin, rMax);

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${pathToViewBox(path)}">
  <path fill="black" d="${pathToString(path) + pathToString(hole)}" />
  <path fill="green" d="${pathToString(star)}" />
</svg>`;

  return element;
}
