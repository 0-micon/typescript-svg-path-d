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
      sweepFlag: true,
      x: centerX,
      y: centerY + radius
    },
    {
      name: "A",
      rx: radius,
      ry: radius,
      angle: 0,
      largeArcFlag: false,
      sweepFlag: true,
      x: centerX,
      y: centerY - radius
    },
    { name: "Z" }
  ]);
}

export function createHeart(
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
      sweepFlag: true,
      x: centerX + 2 * radius,
      y: centerY - radius
    },
    {
      name: "Q",
      x1: centerX + 2 * radius,
      y1: centerY + radius / 2,
      x: centerX,
      y: centerY + 2 * radius
    },
    {
      name: "Q",
      x1: centerX - 2 * radius,
      y1: centerY + radius / 2,
      x: centerX - 2 * radius,
      y: centerY - radius
    },
    {
      name: "A",
      rx: radius,
      ry: radius,
      angle: 0,
      largeArcFlag: false,
      sweepFlag: true,
      x: centerX,
      y: centerY - radius
    },
    { name: "Z" }
  ]);
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
