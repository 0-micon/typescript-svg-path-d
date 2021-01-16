import * as SPD from "svg-path-d";
import { createCircle, createStar } from "./create";
import { pathToString, rectToViewBox } from "./format";

export function createStarElement(
  centerX: number,
  centerY: number,
  pointCount: number,
  rMin: number,
  rMax: number
) {
  const path = createCircle(centerX, centerY, rMax * 1.2);
  const hole = SPD.createReveresed(createCircle(centerX, centerY, rMax * 1.1));
  const star = createStar(centerX, centerY, pointCount, rMin, rMax);

  const rect = SPD.getBoundingRect(path);
  const view = rectToViewBox(rect.left, rect.top, rect.right, rect.bottom);

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${view}">
  <path fill="black" d="${pathToString(path) + pathToString(hole)}" />
  <path fill="green" d="${pathToString(star)}" />
</svg>`;

  return element;
}
