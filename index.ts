// Import stylesheets
import './style.css';
import { createCircleElement } from './samples/create-circle';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>SVG Path Examples</h1>`;

// Examples:
const circleElement = createCircleElement(512, 512, 500);
circleElement.style.setProperty("min-width", "200px");
circleElement.style.setProperty("max-width", "320px");
document.body.appendChild(circleElement);
