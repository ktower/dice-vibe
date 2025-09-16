# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a vanilla web-based dice roller application for tabletop gaming and RPGs. The project consists of pure HTML, CSS, and JavaScript with no dependencies or build process required.

## Architecture

### Core Files
- `dice-roller.html` - Main HTML file, serves as entry point
- `script.js` - Pure JavaScript dice rolling logic and DOM manipulation
- `styles.css` - CSS3 styling with animations and responsive design
- `Dockerfile` - nginx:alpine container configuration

### Key Components
- **Dice Types**: Configurable in `diceTypes` array in script.js:712 (D2, D4, D6, D8, D10, D12, D20, D100)
- **Roll Logic**: `rollDie()` function uses Math.random() for dice simulation
- **UI State**: No state management - pure DOM manipulation on each roll
- **Styling**: Glass-morphism design with CSS animations and responsive grid layout

## Development Commands

### Local Development
```bash
# No build process - open directly in browser
open dice-roller.html
```

### Docker Development
```bash
# Build container
docker build -t dice-roller .

# Run locally
docker run -p 8080:80 dice-roller

# Access at http://localhost:8080
```

### Testing
No automated tests - manual browser testing required. Test on:
- Chrome, Firefox, Safari, Edge
- Desktop and mobile viewports
- All dice types and combinations

## Customization Points

### Adding Dice Types
Modify the `diceTypes` array in script.js:6-15 to add new dice:
```javascript
{ sides: 30, inputId: 'd30', name: 'D30' }
```
Also add corresponding HTML input in dice-roller.html.

### Styling Changes
- Color scheme: CSS custom properties in styles.css:6
- Animation timing: `rollAnimation` keyframes in styles.css:123-127
- Layout breakpoints: Grid settings in styles.css:27

### Roll Limits
Change max dice per type by modifying `max="50"` attributes in HTML inputs.

## Deployment

The application is designed for static hosting or containerized deployment:
- Static: Any web server can serve the files directly
- Container: Uses nginx:alpine as base image, exposes port 80