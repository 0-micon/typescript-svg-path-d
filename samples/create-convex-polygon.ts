import * as SPD from "svg-path-d";
import { createConvexPolygon } from "./create";
import { pathToString, rectToViewBox } from "./format";

export function createConvexPolygonElement(
  centerX: number,
  centerY: number,
  pointCount: number,
  radius: number
) {
  const path = createConvexPolygon(centerX, centerY, pointCount, radius);
  const data = pathToString(path);
  const rect = SPD.getBoundingRect(path);
  const view = rectToViewBox(rect.left, rect.top, rect.right, rect.bottom);

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${view}">
  <path fill="yellow" d="${data}">
  </path>
</svg>`;

  return element;
}
