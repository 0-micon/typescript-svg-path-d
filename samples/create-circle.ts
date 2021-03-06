import { createCircle } from "./create";
import { pathToString, pathToViewBox } from "./format";

export function createCircleElement(
  centerX: number,
  centerY: number,
  radius: number
) {
  const path = createCircle(centerX, centerY, radius);
  const data = pathToString(path);
  const view = pathToViewBox(path);

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${view}">
  <path fill="red" d="${data}" />
</svg>`;

  return element;
}
