import { PathBuilder, PathNode } from "svg-path-d";

export class ShapeBuilder extends PathBuilder {
  constructor(path: PathNode[] = []) {
    super(path);
  }

  addCircle(radius = 1, anticlockwise?: boolean): this {
    const sweep = anticlockwise ? 0 : 1;
    return this
      .a(radius, radius, 0, 0, sweep, 0,  2 * radius)
      .a(radius, radius, 0, 0, sweep, 0, -2 * radius);
  }

  addRing(radius1 = 0.5, radius2 = 1, anticlockwise?: boolean): this {
    return this
      .addCircle(radius2, anticlockwise)
      .z()
      .m(0, radius2 - radius1)
      .addCircle(radius1, !anticlockwise);
  }
}
