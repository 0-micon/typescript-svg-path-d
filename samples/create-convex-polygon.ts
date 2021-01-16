import { createConvexPolygon } from "./create";
import { pathToString, pathToViewBox } from "./format";

export function createConvexPolygonElement(
  centerX: number,
  centerY: number,
  pointCount: number,
  radius: number
) {
  const path = createConvexPolygon(centerX, centerY, pointCount, radius);
  const data = pathToString(path);

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${pathToViewBox(path)}">
  <path fill="yellow" d="${data}">
  </path>
</svg>`;

  return element;
}
