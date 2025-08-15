# 🎲 Dice Roller Web Application

A beautiful, interactive dice rolling application built with vanilla HTML, CSS, and JavaScript. Roll any combination of standard gaming dice (D2, D4, D6, D8, D10, D12, D20, D100) with animated results and totals.

![Dice Roller Demo](https://img.shields.io/badge/Status-Ready-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)

## ✨ Features

- **Multiple Dice Types**: Support for D2, D4, D6, D8, D10, D12, D20, and D100
- **Arbitrary Quantities**: Roll up to 50 dice of each type simultaneously
- **Visual Dice Display**: Each die result is shown as an animated visual element
- **Smart Totals**: Individual totals per dice type plus grand total across all rolls
- **Beautiful UI**: Modern gradient design with glass-morphism effects
- **Responsive Design**: Works on desktop and mobile devices
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
2. **Roll**: Click the "🎲 Roll Dice! 🎲" button
3. **View Results**: See individual die results, subtotals, and grand total
4. **Roll Again**: Modify quantities and roll again as many times as you want

### Default Setup
The application loads with a default configuration:
- 2 × D6 dice (standard six-sided dice)
- 1 × D20 die (twenty-sided die)

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
- **HTML5**: Semantic structure with accessibility considerations
- **CSS3**: Modern styling with gradients, animations, and responsive grid
- **Vanilla JavaScript**: No dependencies, pure ES6+ features

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
Edit the `diceTypes` array in `script.js` to add or remove dice types:

```javascript
const diceTypes = [
    { sides: 2, inputId: 'd2', name: 'D2' },
    // Add custom dice here
    { sides: 30, inputId: 'd30', name: 'D30' }
];
```

### Styling Changes
All visual styling is contained in `styles.css`. Key customizable elements:
- Color scheme (CSS custom properties at the top)
- Animation duration and effects
- Responsive breakpoints
- Dice visual appearance

### Roll Limits
Change the maximum number of dice per type by modifying the `max` attribute in the HTML inputs or the validation in JavaScript.

## 🔧 Development

### Local Development
No build process required! Simply edit the files and refresh your browser.

### Adding Features
Common enhancement ideas:
- Dice roll history
- Save/load dice configurations
- Sound effects
- Different dice themes
- Statistics tracking
- Custom dice types

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
- [ ] Implement roll history
- [ ] Add dice presets (common RPG configurations)
- [ ] Create mobile app version
- [ ] Add multiplayer support
- [ ] Implement custom dice designer

---

**Built with ❤️ using vanilla web technologies**

*Perfect for tabletop gamers, RPG enthusiasts, and anyone who needs to roll some dice!*