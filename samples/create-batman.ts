import {
  align,
  createReversed,
  getBoundingRect,
  getGroups,
  makePath
} from "svg-path-d";
import { createBatman, createCircle, createSun } from "./create";
import { pathToString, rectToViewBox } from "./format";

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

  const [src, dst] = align(pathB, pathS, {
    groupClosePoints: [{ x: centerX, y: centerY }]
  })
    .map(path => getGroups(path))
    .map(groups => groups.map(group => pathToString(group)));

  const colors = ["black", "yellow"];
  let buf = "";
  for (let i = 0; i < src.length; i++) {
    buf += `
  <path fill="${colors[i % colors.length]}" d="${src[i]}" >
    <animate id="animate1" begin="1s;animate2.end + 1s"
      repeatCount="1" fill="freeze" attributeName="d"
      dur="0.5s" values="${src[i]}; ${dst[i]}" />
    <animate id="animate2" begin="animate1.end + 0.5s"
      repeatCount="1" fill="freeze" attributeName="d"
      dur="1s" values="${dst[i]}; ${src[i]}" />
  </path>`;
  }

  const element = document.createElement("div");

  const rc = getBoundingRect(pathS, getBoundingRect(pathB));

  element.innerHTML = `
<svg viewBox="${rectToViewBox(rc.left, rc.top, rc.right, rc.bottom)}">
${buf}
</svg>`;

  return element;
}
