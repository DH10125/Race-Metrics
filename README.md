# Race Metrics Pro
**GM 3.8L FWD Performance Logging & Optimization System for HSRA Racing**

A comprehensive car performance logging and optimization system specifically designed for GM 3.8L engine FWD cars used in HSRA racing. This application provides real-time data logging, performance analysis, and machine learning-based recommendations to optimize racing performance.

## Features

### 🏎️ Comprehensive Data Logging
- **Engine Metrics**: Spark advance, fuel milliseconds, rev limits, stoichiometric ratios, RPM, and temperature monitoring
- **Suspension & Chassis**: Camber, caster, toe-in settings, and rebound adjustments for all four corners
- **Tire Management**: Individual tire pressures, tread depth, wear patterns, and temperature monitoring
- **Transmission Settings**: Line pressure, shift points, and gear ratios
- **Weight Distribution**: Corner weights and balance optimization
- **Race Data**: Lap times, fuel consumption, and performance metrics
- **Environmental Tracking**: Track conditions, ambient temperature, humidity, and track surface temperature

### 📊 Performance Analysis & Visualization
- Interactive charts and graphs for trend analysis
- Lap time progression and consistency scoring
- Tire pressure and temperature correlation analysis
- Engine performance metrics visualization
- Multi-session comparison capabilities
- Data export functionality for external analysis

### 🤖 Intelligent Recommendations
- Machine learning algorithms analyze historical performance data
- Predictive feedback on setting changes and their impact
- Optimization suggestions based on track conditions and performance trends
- Consistency analysis and improvement recommendations

### 💾 Session Management
- Create and manage multiple racing sessions
- Session-specific notes and track condition tracking
- Historical data preservation and comparison
- Detailed session analytics and reporting

### 🔧 Car Setup Management
- Save and manage multiple car configurations
- Comprehensive setup templates for different track types
- Suspension geometry, transmission, and engine parameter storage
- Setup comparison and optimization tools

## Technology Stack

- **Frontend**: Next.js 13+ with React 18
- **Charts & Visualization**: Recharts for interactive data visualization
- **Data Storage**: Browser localStorage with structured data management
- **Styling**: Inline CSS with modern design patterns
- **Analytics**: Custom algorithms for performance analysis and recommendations

## Getting Started

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DH10125/Race-Metrics.git
cd Race-Metrics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### 1. Dashboard
View real-time insights, performance summaries, and quick access to all features. The dashboard displays:
- Total sessions and lap statistics
- Recent lap time trends
- Engine RPM patterns
- Performance recommendations
- Quick session management

### 2. Data Logging
Start a new racing session and log comprehensive performance data:
- Create named sessions with track and condition information
- Real-time data entry for all performance metrics
- Structured data capture for consistent analysis
- Session notes and environmental tracking

### 3. Performance Analysis
Analyze session data with advanced visualization:
- Detailed charts and trend analysis
- Consistency scoring and improvement areas
- Comparative analysis between sessions
- Export capabilities for external tools

### 4. Race Sessions
Manage and review historical sessions:
- Complete session history with searchable data
- Detailed performance breakdowns
- Session comparison tools
- Data point exploration and analysis

### 5. Car Settings
Configure and save car setups:
- Comprehensive setup templates
- Engine, suspension, transmission, and weight settings
- Setup comparison and optimization
- Export/import functionality for setup sharing

## Data Categories

### Engine Performance
- Spark advance timing
- Fuel injection duration
- Rev limiter settings
- Air/fuel ratio targets
- Real-time RPM and temperature

### Suspension & Handling
- Camber angles (all four corners)
- Caster settings (front wheels)
- Toe-in/toe-out adjustments
- Shock absorber rebound settings
- Spring rates and anti-roll bar settings

### Tire Management
- Individual tire pressures
- Tire temperature monitoring
- Tread depth tracking
- Wear pattern analysis

### Drivetrain
- Transmission line pressure
- Automatic transmission shift points
- Gear ratios and final drive settings

### Vehicle Dynamics
- Corner weight distribution
- Total vehicle weight
- Balance optimization

### Environmental Factors
- Track surface temperature
- Ambient air temperature
- Humidity levels
- Track surface conditions

## Performance Optimization

The system uses advanced algorithms to:
- Identify optimal tire pressure ranges based on track conditions
- Analyze suspension settings impact on lap times
- Recommend engine tuning adjustments
- Predict performance improvements from setup changes
- Track long-term trends and degradation patterns

## Data Export & Sharing

- JSON export for external analysis tools
- Session summary reports
- Performance data visualization export
- Setup configuration sharing

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, feature requests, or bug reports, please open an issue on the GitHub repository.

---

**Race Metrics Pro** - Optimizing HSRA FWD Racing Performance Through Data-Driven Analysis