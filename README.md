# Race Metrics - 6-Shooter Class Racing Analytics

A comprehensive tool for tracking and optimizing racing performance for 6-Shooter class amateur racing cars. This application helps drivers and mechanics monitor every modifiable variable of their race car, analyze performance trends, and receive data-driven recommendations for improvements.

## 🏁 Features

### Car Setup Management
- Complete configuration tracking for engine, suspension, wheels, weight, and electronics
- HSRA compliance checking for 6-Shooter class regulations
- Detailed specifications storage and history

### Session Data Tracking
- Track conditions and environmental data
- Lap time recording and analysis
- Telemetry data collection
- Driver feedback and mechanic notes

### Performance Analytics
- Real-time performance dashboard
- Trend analysis across sessions
- Best lap time tracking
- Speed and performance metrics

### Smart Recommendations
- AI-powered analysis of performance data
- Mechanic-reviewable improvement suggestions
- Priority-based recommendation system
- Implementation tracking and feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## 🏎️ Usage Guide

### 1. Car Setup Configuration
Start by configuring your car's specifications in the "Car Setup" tab:
- Basic information (car number, driver)
- Engine specifications (displacement, compression, timing, fuel mixture)
- Suspension settings (spring rates, shock settings, alignment)
- Wheel and tire setup (sizes, pressures, offsets)
- Weight distribution and balance
- Electronic systems (RPM limiter, data logger, etc.)

### 2. Recording Session Data
After each track session, enter your performance data:
- Track name and conditions
- Environmental data (temperature, humidity)
- Lap times and performance metrics
- Driver feedback and observations
- Mechanic notes and findings

### 3. Reviewing Recommendations
The system analyzes your data and provides recommendations:
- Review suggested changes and their expected impact
- Approve or deny recommendations with notes
- Track implementation and results
- Monitor performance improvements

### 4. Performance Monitoring
Use the dashboard to track your progress:
- View key performance metrics
- Analyze trends over time
- Compare session-to-session improvements
- Monitor setup changes and their effects

## 🏆 6-Shooter Class Compliance

This application is specifically designed for the 6-Shooter class of amateur racing and includes:
- HSRA (Hot Shoe Racing Association) regulation compliance checking
- Class-specific performance metrics
- Appropriate modification tracking for the class rules
- Safety-focused recommendations

## 🛠️ Technical Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready
- **Data Storage**: Local state (can be extended with database)

## 📊 Key Metrics Tracked

### Engine Performance
- Displacement and compression ratio
- Ignition timing and fuel mixture
- Power output estimates
- RPM data and shift points

### Suspension & Handling
- Spring rates and shock settings
- Camber, caster, and toe settings
- Weight distribution and cross-weight
- Handling characteristics

### Tire Performance
- Tire sizes and pressures
- Wear patterns and longevity
- Grip levels and performance
- Temperature effects

### Overall Performance
- Lap times and sector analysis
- Top speed and acceleration
- Consistency metrics
- Weather-adjusted performance

## 🔧 Customization

The application can be extended to include:
- Database integration for persistent storage
- Multi-user support with authentication
- Advanced telemetry data import
- Integration with popular racing data loggers
- Custom rule sets for different racing classes

## 📈 Future Enhancements

- Integration with popular data acquisition systems
- Machine learning-based performance prediction
- Multi-car fleet management
- Race weekend planning tools
- Maintenance scheduling and tracking
- Parts inventory management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 🏁 About 6-Shooter Class Racing

The 6-Shooter class is designed for affordable, competitive amateur racing with specific rules to maintain close competition and reasonable costs. This application helps teams optimize their performance within these regulations while maintaining the spirit of the class.

## 🚨 Safety Notice

Always prioritize safety over performance. Any recommendations from this system should be reviewed by qualified mechanics and tested in controlled conditions before implementation in competitive racing.
