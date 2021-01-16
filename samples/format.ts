import * as SPD from "svg-path-d";

export function pathToString(path: SPD.PathNode[]): string {
  return path.map(item => SPD.asString(item, 2)).join("");
}

export function rectToViewBox(
  left: number,
  top: number,
  right: number,
  bottom: number,
  pad = 1
): string {
  const x = Math.floor(left) - pad;
  const y = Math.floor(top) - pad;
  const w = Math.ceil(right) + pad - x;
  const h = Math.ceil(bottom) + pad - y;

  return `${x} ${y} ${w} ${h}`;
}

export function pathToViewBox(path: SPD.PathNode[], pad = 1): string {
  const rect = SPD.getBoundingRect(path);
  return rectToViewBox(rect.left, rect.top, rect.right, rect.bottom, pad);
}
