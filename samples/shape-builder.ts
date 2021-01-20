import { getX, getY, PathBuilder, PathNode } from "svg-path-d";

export class ShapeBuilder extends PathBuilder {
  constructor(path: PathNode[] = []) {
    super(path);
  }

  circle(radius = 1, anticlockwise?: boolean): this {
    const sweep = anticlockwise ? 0 : 1;
    return this
      .a(radius, radius, 0, 0, sweep, 0,  2 * radius)
      .a(radius, radius, 0, 0, sweep, 0, -2 * radius);
  }

  convexPolygon(pointCount: number, radius = 1): this {
    const last = this.last;
    const cx = getX(last);
    const cy = getY(last) + radius;
    for (let i = 0; i < pointCount; i++) {
      const angle = (2 * (i + 1) * Math.PI) / pointCount;
      this.L(
        cx + radius * Math.sin(angle),
        cy - radius * Math.cos(angle)
      );
    }
    return this;
  }

  ring(radius1 = 0.5, radius2 = 1, anticlockwise?: boolean): this {
    return this
      .circle(radius2, anticlockwise)
      .z()
      .m(0, radius2 - radius1)
      .circle(radius1, !anticlockwise);
  }
}
