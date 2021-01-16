// Import stylesheets
import "./style.css";
import { createCircleElement } from "./samples/create-circle";
import { createConvexPolygonElement } from "./samples/create-convex-polygon";
import { createStarElement } from "./samples/create-star";
import { createHeartElement } from "./samples/create-heart";

// Examples:
function appendSample(element: HTMLElement): void {
  const appDiv: HTMLElement = document.getElementById("app");
  appDiv.appendChild(element);
}

appendSample(createCircleElement(512, 512, 500));
appendSample(createConvexPolygonElement(512, 512, 8, 500));
appendSample(createStarElement(512, 512, 9, 200, 500));
appendSample(createHeartElement(512, 512, 500));

// Write Your TypeScript code!
