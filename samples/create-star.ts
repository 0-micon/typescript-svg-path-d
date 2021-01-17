import { createRing, createStar } from "./create";
import { pathToString, pathToViewBox } from "./format";

export function createStarElement(
  centerX: number,
  centerY: number,
  pointCount: number,
  rMin: number,
  rMax: number
) {
  const ring = createRing(centerX, centerY, rMax * 1.1, rMax * 1.2);
  const star = createStar(centerX, centerY, pointCount, rMin, rMax);

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${pathToViewBox(ring)}">
  <path fill="black" d="${pathToString(ring)}" />
  <path fill="green" d="${pathToString(star)}" />
</svg>`;

  return element;
}
