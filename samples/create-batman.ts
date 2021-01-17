import { makeInterpolator } from "svg-path-d";
import { createBatman, createConvexPolygon } from "./create";
import { pathToViewBox } from "./format";

export function createBatmanElement(
  centerX: number,
  centerY: number,
  radius: number
) {
  const pathB = createBatman(centerX, centerY, radius);
  const pathS = createConvexPolygon(centerX, centerY, 8, radius);
  const morph = makeInterpolator(pathB, pathS, {
    groupClosePoints: [{ x: centerX, y: centerY }, { x: centerX, y: centerY }]
  });

  const src = morph(0).join("");
  const dst = morph(1).join("");

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${pathToViewBox(pathS)}">
  <path fill="black" d="${src}" >
    <animate id="animate1" begin="1s;animate2.end + 1s"
      repeatCount="1" fill="freeze" attributeName="d"
      dur="0.5s" values="${src}; ${dst}" />
    <animate id="animate2" begin="animate1.end + 0.5s"
      repeatCount="1" fill="freeze" attributeName="d"
      dur="1s" values="${dst}; ${src}" />
  </path>
</svg>`;

  return element;
}
