# 🎲 Dice Roller Web Application

A beautiful, interactive dice rolling application built with vanilla HTML, CSS, and JavaScript. Roll any combination of standard gaming dice (D2, D4, D6, D8, D10, D12, D20, D100) with animated results and totals.

![Dice Roller Demo](https://img.shields.io/badge/Status-Ready-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)

## ✨ Features

- **Multiple Dice Types**: Support for D2, D4, D6, D8, D10, D12, D20, and D100
- **Arbitrary Quantities**: Roll up to 50 dice of each type simultaneously
- **Visual Dice Display**: Each die result is shown as an animated visual element
- **Smart Totals**: Individual totals per dice type plus optional grand total
- **Roll History**: Session-based history with detailed roll tracking and re-roll functionality
- **Sidebar Interface**: Elegant slide-out history panel with mobile-responsive design
- **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Beautiful UI**: Modern gradient design with glass-morphism effects
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Roll Animations**: Smooth rotation animations when dice are rolled
- **Containerized**: Ready-to-deploy Docker container

## 🚀 Quick Start

### Option 1: Local Development
1. Clone the repository
2. Open `dice-roller.html` in your web browser
3. Start rolling dice!

### Option 2: Docker Container
```bash
# Build the Docker image
docker build -t dice-roller .

# Run the container
docker run -p 8080:80 dice-roller

# Visit http://localhost:8080 in your browser
```

## 🎮 How to Use

1. **Select Dice**: Enter the number of each dice type you want to roll (0-50)
2. **Configure Options**: Toggle "Show Grand Total" if you want to see combined totals
3. **Roll**: Click the "🎲 Roll Dice! 🎲" button
4. **View Results**: See individual die results and totals
5. **Check History**: Click the 📜 button to view your roll history
6. **Re-roll Previous**: Use the "🎲 Re-roll" button in history to repeat configurations

### Roll History Features
- **Session Storage**: Keeps up to 50 recent rolls during your session
- **Detailed Records**: Timestamp, configuration, individual results, and totals
- **Quick Re-roll**: One-click to repeat any previous dice configuration
- **Clear History**: Remove all history with confirmation dialog
- **Sidebar Interface**: Slide-out panel with smooth animations
- **Mobile Optimized**: Touch-friendly controls and responsive layout

### Default Setup
The application loads with a default configuration:
- 2 × D6 dice (standard six-sided dice)
- 1 × D20 die (twenty-sided die)
- Grand total display enabled
- History sidebar closed

## 🏗️ Project Structure

```
.
├── dice-roller.html    # Main HTML file
├── styles.css         # CSS styling and animations
├── script.js          # JavaScript logic for dice rolling
├── Dockerfile         # Docker containerization
├── .dockerignore      # Docker ignore rules
└── README.md          # This file
```

## 🛠️ Technical Details

### Frontend Stack
- **HTML5**: Semantic structure with comprehensive ARIA support
- **CSS3**: Modern styling with gradients, animations, and responsive grid
- **Vanilla JavaScript**: Modern ES6+ features with performance optimizations
- **Accessibility**: WCAG-compliant with keyboard navigation and screen reader support
- **Performance**: DOM caching, event delegation, and document fragments

### Docker Setup
- **Base Image**: `nginx:alpine` (lightweight web server)
- **Port**: Exposed on port 80 (map to any local port)
- **Size**: Optimized for minimal container size

### Browser Compatibility
- Modern browsers supporting ES6+
- CSS Grid and Flexbox support required
- Tested on Chrome, Firefox, Safari, and Edge

## 🎨 Customization

### Modifying Dice Types
Edit the `DICE_TYPES` constant in `script.js` to add or remove dice types:

```javascript
const DICE_TYPES = [
    { sides: 2, inputId: 'd2', name: 'D2' },
    { sides: 4, inputId: 'd4', name: 'D4' },
    // Add custom dice here
    { sides: 30, inputId: 'd30', name: 'D30' }
];
```

Also add corresponding HTML input elements in `dice-roller.html`:

```html
<div class="dice-type">
    <label for="d30">D30</label>
    <input type="number" id="d30" min="0" max="50" value="0">
</div>
```

### Styling Changes
All visual styling is contained in `styles.css`. Key customizable elements:
- Color scheme (CSS custom properties at the top)
- Animation duration and effects
- Responsive breakpoints
- Dice visual appearance

### Roll History Configuration
Adjust history settings in `script.js`:

```javascript
const MAX_HISTORY_ENTRIES = 50; // Change maximum history size
```

### Roll Limits
Change the maximum number of dice per type by modifying:
- The `max` attribute in HTML inputs
- The `validateDiceInput()` function in JavaScript
- Update the `Math.min(50, num)` validation limit

### Grand Total Toggle
The grand total can be disabled by default by changing the HTML:

```html
<input type="checkbox" id="show-grand-total"> <!-- Remove 'checked' -->
```

## 🔧 Development

### Local Development
No build process required! Simply edit the files and refresh your browser.

### Code Architecture
The application follows modern JavaScript patterns:
- **Constants**: Centralized configuration in `DICE_TYPES`
- **DOM Caching**: Elements cached for performance
- **Event Delegation**: Efficient event handling for dynamic content
- **Input Validation**: Comprehensive bounds checking
- **XSS Protection**: HTML escaping for all user content
- **Accessibility**: ARIA labels and semantic HTML throughout

### Adding Features
Common enhancement ideas:
- ✅ ~~Dice roll history~~ (Complete!)
- Save/load dice configurations to localStorage
- Sound effects for dice rolls
- Different dice themes and colors
- Statistics tracking and analysis
- Custom dice types and shapes
- Export history to CSV/JSON
- Dice presets for popular games

## 📦 Deployment Options

### Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

### Container Platforms
Deploy the Docker container to:
- Docker Hub
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- Kubernetes

### Example Docker Commands
```bash
# Build with custom tag
docker build -t my-dice-roller:v1.0 .

# Run with custom port
docker run -d -p 3000:80 --name my-dice-app dice-roller

# Push to registry (after tagging)
docker tag dice-roller your-registry/dice-roller:latest
docker push your-registry/dice-roller:latest
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Roadmap

- [ ] Add dice roll sound effects
- [x] ~~Implement roll history~~ ✅ **Complete!**
- [ ] Add persistent storage (localStorage/IndexedDB)
- [ ] Add dice presets (common RPG configurations)
- [ ] Implement statistics and analytics
- [ ] Add export functionality (CSV, JSON)
- [ ] Create mobile app version
- [ ] Add multiplayer support
- [ ] Implement custom dice designer
- [ ] Add accessibility testing suite

---

**Built with ❤️ using vanilla web technologies**

*Perfect for tabletop gamers, RPG enthusiasts, and anyone who needs to roll some dice!*