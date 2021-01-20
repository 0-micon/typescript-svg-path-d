import * as SPD from "svg-path-d";
import { ShapeBuilder } from "./shape-builder";

export function createCircle(
  centerX: number,
  centerY: number,
  radius: number
): SPD.PathNode[] {
  return new ShapeBuilder()
    .M(centerX, centerY - radius)
    .circle(radius)
    .z().path;
}

export function createHeart(
  centerX: number,
  centerY: number,
  radius: number
): SPD.PathNode[] {
  return new SPD.PathBuilder()
    .M(centerX, centerY - radius)
    .a(radius, radius, 0, 0, 1, 2 * radius, 0)
    .q(0, (3 * radius) / 2, -2 * radius, 3 * radius)
    .q(-2 * radius, (-3 * radius) / 2, -2 * radius, -3 * radius)
    .a(radius, radius, 0, 0, 1, 2 * radius, 0)
    .z().path;
}

export function createConvexPolygon(
  centerX: number,
  centerY: number,
  pointCount: number,
  radius: number
): SPD.PathNode[] {
  return new ShapeBuilder()
    .M(centerX, centerY - radius)
    .convexPolygon(pointCount, radius)
    .z().path;
}

export function createStar(
  centerX: number,
  centerY: number,
  pointCount: number,
  rMin: number,
  rMax: number
): SPD.PathNode[] {
  const maker = new SPD.PathBuilder().M(centerX, centerY - rMax);
  for (let i = 0; i < pointCount; i++) {
    const angle1 = ((1 + 2 * i) * Math.PI) / pointCount;
    maker.L(
      centerX + rMin * Math.sin(angle1),
      centerY - rMin * Math.cos(angle1)
    );

    const angle2 = (2 * (i + 1) * Math.PI) / pointCount;
    maker.L(
      centerX + rMax * Math.sin(angle2),
      centerY - rMax * Math.cos(angle2)
    );
  }
  return maker.z().path;
}

export function createRing(
  centerX: number,
  centerY: number,
  rMin: number,
  rMax: number
): SPD.PathNode[] {
  return new ShapeBuilder()
    .M(centerX, centerY - rMax)
    .ring(rMin, rMax)
    .z().path;
}

export function createSun(
  centerX: number,
  centerY: number,
  pointCount: number,
  rMin: number,
  rMax: number,
  shiftAngle: number
): SPD.PathNode[] {
  return new ShapeBuilder()
    .M(centerX, centerY - rMax)
    .sun(pointCount, rMin, rMax, shiftAngle)
    .z().path;
}

export function createBatman(
  centerX: number,
  centerY: number,
  radius: number
): SPD.PathNode[] {
  const r0 = 500;
  const logo =
    "M0-208h28l30-36 14 136c26 137 215 46 88-137a447 263 0 01109 455" +
    "c84-117-60-160-128-30-37-113-121-27-141 52-21-80-103-166-141-51-48-112-212-112-129 29" +
    "a447 263 0 01109-455c-123 180 59 277 89 137l14-136 30 36h28z";

  let path = SPD.fromString(logo);
  if (radius && radius !== r0) {
    const ms = SPD.utils.matrix.createScale(radius / r0, radius / r0);
    path = SPD.createTransformed(path, ms);
  }

  // Add an oval.
  let ring = SPD.createTransformed(
    createRing(0, 0, radius * 0.925, radius),
    SPD.utils.matrix.createScale(1, 0.6125)
  );
  path = SPD.makePath(ring.concat(path));

  if (centerX || centerY) {
    const mt = SPD.utils.matrix.createTranslate(centerX, centerY);
    path = SPD.createTransformed(path, mt);
  }
  return path;
}
