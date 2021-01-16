// Import stylesheets
import "./style.css";
import { createCircleElement } from "./samples/create-circle";
import { createConvexPolygonElement } from "./samples/create-convex-polygon";
import { createStarElement } from "./samples/create-star";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>SVG Path Examples</h1>`;

// Examples:
function appendSample(element: HTMLElement): void {
  element.style.setProperty("min-width", "48px");
  element.style.setProperty("max-width", "240px");

  document.body.appendChild(element);
}

appendSample(createCircleElement(512, 512, 500));
appendSample(createConvexPolygonElement(512, 512, 8, 500));
appendSample(createStarElement(512, 512, 9, 200, 500));
