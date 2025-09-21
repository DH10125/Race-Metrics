const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create metric categories for 6-Shooter class racing
  const categories = [
    {
      name: 'Engine Performance',
      description: 'Engine-related metrics including power, torque, and efficiency',
      color: '#ef4444'
    },
    {
      name: 'Suspension Setup',
      description: 'Suspension geometry, spring rates, and damping settings',
      color: '#f97316'
    },
    {
      name: 'Tire Performance',
      description: 'Tire pressure, temperature, and wear patterns',
      color: '#eab308'
    },
    {
      name: 'Aerodynamics',
      description: 'Downforce, drag, and aerodynamic balance',
      color: '#22c55e'
    },
    {
      name: 'Transmission',
      description: 'Gear ratios, shift points, and drivetrain efficiency',
      color: '#3b82f6'
    },
    {
      name: 'Braking System',
      description: 'Brake balance, pad compounds, and cooling',
      color: '#8b5cf6'
    },
    {
      name: 'Weight Distribution',
      description: 'Weight balance, ballast placement, and center of gravity',
      color: '#ec4899'
    },
    {
      name: 'Electronics',
      description: 'ECU settings, data logging, and electronic aids',
      color: '#06b6d4'
    },
    {
      name: 'Safety Equipment',
      description: 'Roll cage, harnesses, and safety system checks',
      color: '#64748b'
    },
    {
      name: 'Fuel System',
      description: 'Fuel consumption, pump performance, and delivery',
      color: '#84cc16'
    }
  ]

  for (const category of categories) {
    await prisma.metricCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  // Create a sample car
  const sampleCar = await prisma.car.upsert({
    where: { vin: 'SAMPLE123456789' },
    update: {},
    create: {
      name: 'Thunder Bolt',
      make: 'Custom',
      model: '6-Shooter Special',
      year: 2023,
      vin: 'SAMPLE123456789'
    }
  })

  console.log('Database seeded successfully!')
  console.log(`Created car: ${sampleCar.name}`)
  console.log(`Created ${categories.length} metric categories`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })