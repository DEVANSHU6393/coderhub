import { prisma } from "../src/lib/prisma"

async function main() {
  // Clear existing events
  await prisma.event.deleteMany({})

  console.log('Seeding events...')

  const event1 = await prisma.event.create({
    data: {
      title: 'Intro to Web3 and Smart Contracts',
      description: 'Join us for a hands-on workshop on building your first decentralized application (dApp). We will cover Solidity, Ethereum, and deploying smart contracts.',
      date: '2023-10-15',
      time: '14:00',
      venue: 'CS Dept, Room 301',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f4fec07?q=80&w=2000&auto=format&fit=crop',
      registrationLink: 'https://example.com/register/1',
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: 'Coder Hub Hackathon 2023',
      description: 'Our flagship 24-hour hackathon! Build innovative solutions to real-world problems. Mentors will be available, and there are prizes for the top 3 teams.',
      date: '2023-11-20',
      time: '09:00',
      venue: 'University Main Auditorium',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop',
      registrationLink: 'https://example.com/register/2',
    },
  })

  const event3 = await prisma.event.create({
    data: {
      title: 'Data Structures & Algorithms Bootcamp',
      description: 'A 2-day intensive bootcamp covering essential data structures and algorithms to ace your technical interviews. Perfect for beginners and intermediate coders.',
      date: '2024-01-10',
      time: '10:00',
      venue: 'CS Dept, Lab 4',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000&auto=format&fit=crop',
    },
  })

  console.log({ event1, event2, event3 })
  console.log('Seeding complete.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
