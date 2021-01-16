import * as SPD from "svg-path-d";

export function createCircle(
  centerX: number,
  centerY: number,
  radius: number
): SPD.PathNode[] {
  return SPD.makePath([
    { name: "M", x: centerX, y: centerY - radius },
    {
      name: "A",
      rx: radius,
      ry: radius,
      angle: 0,
      largeArcFlag: false,
      sweepFlag: false,
      x: centerX,
      y: centerY + radius
    },
    {
      name: "A",
      rx: radius,
      ry: radius,
      angle: 0,
      largeArcFlag: false,
      sweepFlag: false,
      x: centerX,
      y: centerY - radius
    },
    { name: "Z" }
  ]);
}

export function createCircleElement(
  centerX: number,
  centerY: number,
  radius: number
) {
  const path = createCircle(centerX, centerY, radius);
  const data = path.map(item => SPD.asString(item, 2)).join("");

  const x = Math.floor(centerX - radius) - 1;
  const y = Math.floor(centerY - radius) - 1;
  const w = Math.ceil(centerX + radius) + 1 - x;
  const h = Math.ceil(centerY + radius) + 1 - y;

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${x} ${y} ${w} ${h}">
  <path fill="red" d="${data}">
  </path>
</svg>`;

  return element;
}
