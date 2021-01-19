import * as SPD from "svg-path-d";

export function createCircle(
  centerX: number,
  centerY: number,
  radius: number
): SPD.PathNode[] {
  return new SPD.PathBuilder()
    .M(centerX, centerY - radius)
    .a(radius, radius, 0, 0, 1, 0, 2 * radius)
    .a(radius, radius, 0, 0, 1, 0, -2 * radius)
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

export function createStar(
  centerX: number,
  centerY: number,
  pointCount: number,
  rMin: number,
  rMax: number
): SPD.PathNode[] {
  const arr: SPD.DrawTo[] = [
    {
      name: "M",
      x: centerX,
      y: centerY - rMax
    }
  ];
  for (let i = 0; i < pointCount; i++) {
    const angle1 = ((1 + 2 * i) * Math.PI) / pointCount;
    arr.push({
      name: "L",
      x: centerX + rMin * Math.sin(angle1),
      y: centerY - rMin * Math.cos(angle1)
    });

    const angle2 = (2 * (i + 1) * Math.PI) / pointCount;
    arr.push({
      name: "L",
      x: centerX + rMax * Math.sin(angle2),
      y: centerY - rMax * Math.cos(angle2)
    });
  }
  arr.push({
    name: "Z"
  });
  return SPD.makePath(arr);
}

export function createRing(
  centerX: number,
  centerY: number,
  rMin: number,
  rMax: number
): SPD.PathNode[] {
  const ring = createCircle(centerX, centerY, rMax);
  // To cut a hole we should reverse the hole path.
  const hole = SPD.createReversed(createCircle(centerX, centerY, rMin));
  return SPD.makePath(ring.concat(hole));
}

export function createSun(
  centerX: number,
  centerY: number,
  pointCount: number,
  rMin: number,
  rMax: number,
  shiftAngle: number
): SPD.PathNode[] {
  const rMid = (rMax + rMin) / 2;
  const arr: SPD.DrawTo[] = [
    {
      name: "M",
      x: centerX,
      y: centerY - rMax
    }
  ];
  for (let i = 0; i < pointCount; i++) {
    const angle1 = ((1 + 2 * i) * Math.PI) / pointCount;
    arr.push({
      name: "Q",
      x1: centerX + rMid * Math.sin(angle1 + shiftAngle),
      y1: centerY - rMid * Math.cos(angle1 + shiftAngle),
      x: centerX + rMin * Math.sin(angle1),
      y: centerY - rMin * Math.cos(angle1)
    });

    const angle2 = (2 * (i + 1) * Math.PI) / pointCount;
    arr.push({
      name: "Q",
      x1: centerX + rMid * Math.sin(angle2 + shiftAngle),
      y1: centerY - rMid * Math.cos(angle2 + shiftAngle),
      x: centerX + rMax * Math.sin(angle2),
      y: centerY - rMax * Math.cos(angle2)
    });
  }
  arr.push({
    name: "Z"
  });
  return SPD.makePath(arr);
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
