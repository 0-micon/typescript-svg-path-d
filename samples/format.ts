import * as SPD from "svg-path-d";

export function pathToString(path: SPD.PathNode[]): string {
  return path.map(item => SPD.asString(item, 2)).join("");
}

export function rectToViewBox(
  left: number,
  top: number,
  right: number,
  bottom: number
): string {
  const x = Math.floor(left) - 1;
  const y = Math.floor(top) - 1;
  const w = Math.ceil(right) + 1 - x;
  const h = Math.ceil(bottom) + 1 - y;

  return `${x} ${y} ${w} ${h}`;
}

export function pathToViewBox(path: SPD.PathNode[]): string {
  const rect = SPD.getBoundingRect(path);
  return rectToViewBox(rect.left, rect.top, rect.right, rect.bottom);
}
