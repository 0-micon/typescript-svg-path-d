import {
  createReversed,
  getBoundingRect,
  makeInterpolator,
  makePath
} from "svg-path-d";
import { createBatman, createCircle, createSun } from "./create";
import { rectToViewBox } from "./format";

export function createBatmanElement(
  centerX: number,
  centerY: number,
  radius: number
) {
  const pathB = createBatman(centerX, centerY, radius);
  const pathS = makePath(
    createSun(
      centerX,
      centerY,
      12,
      radius * 0.65,
      radius,
      -Math.PI / 12
    ).concat(createReversed(createCircle(centerX, centerY, radius * 0.5)))
  );
  const morph = makeInterpolator(pathB, pathS, {
    groupClosePoints: [{ x: centerX, y: centerY }, { x: centerX, y: centerY }]
  });

  const src = morph(0).join("");
  const dst = morph(1).join("");

  const element = document.createElement("div");

  const rc = getBoundingRect(pathS, getBoundingRect(pathB));

  element.innerHTML = `
<svg viewBox="${rectToViewBox(rc.left, rc.top, rc.right, rc.bottom)}">
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
