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
}
