import * as SPD from "svg-path-d";

export function createConvexPolygon(
  centerX: number,
  centerY: number,
  pointCount: number,
  radius: number
): SPD.PathNode[] {
  const arr: SPD.DrawTo[] = [
    {
      name: "M",
      x: centerX,
      y: centerY - radius
    }
  ];
  for (let i = 0; i < pointCount; i++) {
    const angle = (2 * (i + 1) * Math.PI) / pointCount;
    arr.push({
      name: "L",
      x: centerX + radius * Math.sin(angle),
      y: centerY - radius * Math.cos(angle)
    });
  }
  arr.push({
    name: "Z"
  });
  return SPD.makePath(arr);
}

export function createConvexPolygonElement(
  centerX: number,
  centerY: number,
  pointCount: number,
  radius: number
) {
  const path = createConvexPolygon(centerX, centerY, pointCount, radius);
  const data = path.map(item => SPD.asString(item, 2)).join("");
  const rect = SPD.getBoundingRect(path);

  const x = Math.floor(rect.left) - 1;
  const y = Math.floor(rect.top) - 1;
  const w = Math.ceil(rect.right) + 1 - x;
  const h = Math.ceil(rect.right) + 1 - y;

  const element = document.createElement("div");

  element.innerHTML = `
<svg viewBox="${x} ${y} ${w} ${h}">
  <path fill="yellow" d="${data}">
  </path>
</svg>`;

  return element;
}
