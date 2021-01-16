// Import stylesheets
import './style.css';
import { createCircleElement } from './samples/create-circle';
import { createConvexPolygonElement } from './samples/create-convex-polygon';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>SVG Path Examples</h1>`;

// Examples:
const circleElement = createCircleElement(512, 512, 500);
circleElement.style.setProperty("min-width", "200px");
circleElement.style.setProperty("max-width", "320px");
document.body.appendChild(circleElement);

const polyElement = createConvexPolygonElement(512, 512, 7, 500);
polyElement.style.setProperty("min-width", "200px");
polyElement.style.setProperty("max-width", "320px");
document.body.appendChild(polyElement);
