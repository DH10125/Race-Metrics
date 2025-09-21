# Race Metrics Tracker

A comprehensive tool designed specifically for 6-Shooter class amateur racing to track, analyze, and optimize every aspect of your race car's performance with data-driven insights and AI-powered recommendations.

## Features

### 🏁 **Comprehensive Tracking**
- Log every modifiable variable - from engine tuning to suspension setup
- Track both physical and electronic modifications
- Organize metrics by category (Engine, Suspension, Tires, Aerodynamics, etc.)
- Real-time data entry with validation

### 📊 **Performance Analytics**
- Visual dashboard with key performance indicators
- Trend analysis over time
- Category-based metric organization
- Historical data tracking

### 🤖 **AI-Powered Recommendations**
- Intelligent suggestions for performance improvements
- Data-driven insights based on metric patterns
- Priority-based recommendation system
- Expected impact analysis

### ✅ **Mechanic Approval Workflow**
- Individual approval/denial of recommendations
- Response tracking and history
- Implementation status monitoring
- Detailed feedback system

### 🏎️ **6-Shooter Class Compliance**
- HSRA (Hot Shoe Racing Association) standards compliance
- Category-specific tracking for amateur racing
- Safety equipment monitoring
- Regulation adherence checking

## Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (development) / PostgreSQL (production) with Prisma ORM
- **Deployment**: Vercel
- **UI Components**: Custom React components with Heroicons

## Getting Started

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

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

The application includes proper Vercel configuration and is production-ready.

## Database Schema

### Core Models
- **Car**: Vehicle information and metadata
- **MetricCategory**: Organized categories for different car systems
- **Metric**: Individual measurements and modifications
- **Recommendation**: AI-generated suggestions with approval workflow

### Metric Categories
1. **Engine Performance** - Power, torque, efficiency metrics
2. **Suspension Setup** - Geometry, spring rates, damping
3. **Tire Performance** - Pressure, temperature, wear patterns
4. **Aerodynamics** - Downforce, drag, balance
5. **Transmission** - Gear ratios, shift points
6. **Braking System** - Balance, compounds, cooling
7. **Weight Distribution** - Balance, ballast, center of gravity
8. **Electronics** - ECU settings, data logging
9. **Safety Equipment** - Roll cage, harnesses, systems
10. **Fuel System** - Consumption, delivery, performance

## API Structure

The application uses Next.js API routes for backend functionality:

- `/api/cars` - Car management
- `/api/metrics` - Metric recording and retrieval  
- `/api/categories` - Metric categories
- `/api/recommendations` - AI recommendations and responses

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Racing Class Information

### 6-Shooter Class
The 6-Shooter class is designed for amateur racers with specific regulations:
- Engine displacement limits
- Weight requirements  
- Safety equipment mandates
- Tire specification compliance
- HSRA standards adherence

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.

---

**Built for racers, by racers.** 🏁
