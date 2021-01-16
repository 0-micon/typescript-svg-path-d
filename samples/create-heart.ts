import { makeInterpolator } from "svg-path-d";
import { createHeart, createStar } from "./create";
import { pathToViewBox } from "./format";

export function createHeartElement(
  centerX: number,
  centerY: number,
  radius: number
) {
  const pathH = createHeart(centerX, centerY, radius);
  const pathS = createStar(centerX, centerY, 32, 0.5 * radius, radius);
  const morph = makeInterpolator(pathH, pathS);

  const src = morph(0).join("");
  const dst = morph(0.2).join("");

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${pathToViewBox(pathH)}">
  <path fill="red" d="${src}" >
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
