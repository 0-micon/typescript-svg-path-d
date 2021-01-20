import { getX, getY, PathBuilder, PathNode } from "svg-path-d";

export class ShapeBuilder extends PathBuilder {
  get lastX() {
    return getX(this.last);
  }

  get lastY() {
    return getY(this.last);
  }

  constructor(path: PathNode[] = []) {
    super(path);
  }

  circle(radius = 1, anticlockwise?: boolean): this {
    const sweep = anticlockwise ? 0 : 1;
    return this
      .a(radius, radius, 0, 0, sweep, 0,  2 * radius)
      .a(radius, radius, 0, 0, sweep, 0, -2 * radius);
  }

  convexPolygon(pointCount = 3, radius = 1): this {
    const cx = this.lastX;
    const cy = this.lastY + radius;
    for (let i = 0; i < pointCount; i++) {
      const angle = (2 * (i + 1) * Math.PI) / pointCount;
      this.L(
        cx + radius * Math.sin(angle),
        cy - radius * Math.cos(angle)
      );
    }
    return this;
  }

  heart(radius = 1): this {
    const r = radius / 2;
    return this
      .a(r, r, 0, 0, 1, 2 * r, 0)
      .q(0, 3 * r / 2, -2 * r, 3 * r)
      .q(-2 * r, -3 * r / 2, -2 * r, -3 * r)
      .a(r, r, 0, 0, 1, 2 * r, 0);
  }

  ring(radius1 = 0.5, radius2 = 1, anticlockwise?: boolean): this {
    return this
      .circle(radius2, anticlockwise)
      .z()
      .m(0, radius2 - radius1)
      .circle(radius1, !anticlockwise);
  }

  sun(pointCount = 3, radius1 = 0.5, radius2 = 1, shiftAngle = 0): this {
    const middle = (radius1 + radius2) / 2;
    const cx = this.lastX;
    const cy = this.lastY + radius2;

    for (let i = 0; i < pointCount; i++) {
      const angle1 = ((1 + 2 * i) * Math.PI) / pointCount;
      const angle2 = (2 * (i + 1) * Math.PI) / pointCount;

      this
        .Q(
          cx + middle * Math.sin(angle1 + shiftAngle),
          cy - middle * Math.cos(angle1 + shiftAngle),
          cx + radius1 * Math.sin(angle1),
          cy - radius1 * Math.cos(angle1))
        .Q(
          cx + middle * Math.sin(angle2 + shiftAngle),
          cy - middle * Math.cos(angle2 + shiftAngle),
          cx + radius2 * Math.sin(angle2),
          cy - radius2 * Math.cos(angle2));
    }
    return this;
  }
}
