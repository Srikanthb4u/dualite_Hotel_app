import { collection, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const roomsData = [
  {
    number: '101',
    type: 'Standard',
    status: 'occupied',
    guest: 'John Smith',
    checkOut: '2025-01-25',
    price: 120,
    amenities: ['wifi', 'coffee'],
    lastCleaned: '2025-01-24',
  },
  {
    number: '102',
    type: 'Standard',
    status: 'available',
    guest: null,
    checkOut: null,
    price: 120,
    amenities: ['wifi', 'coffee'],
    lastCleaned: '2025-01-24',
  },
  {
    number: '201',
    type: 'Premium',
    status: 'maintenance',
    guest: null,
    checkOut: null,
    price: 180,
    amenities: ['wifi', 'coffee', 'parking'],
    lastCleaned: '2025-01-23',
  },
  {
    number: '202',
    type: 'Premium',
    status: 'cleaning',
    guest: null,
    checkOut: null,
    price: 180,
    amenities: ['wifi', 'coffee', 'parking'],
    lastCleaned: '2025-01-24',
  },
  {
    number: '301',
    type: 'Suite',
    status: 'occupied',
    guest: 'Sarah Johnson',
    checkOut: '2025-01-26',
    price: 250,
    amenities: ['wifi', 'coffee', 'parking'],
    lastCleaned: '2025-01-24',
  },
  {
    number: '302',
    type: 'Suite',
    status: 'available',
    guest: null,
    checkOut: null,
    price: 250,
    amenities: ['wifi', 'coffee', 'parking'],
    lastCleaned: '2025-01-24',
  },
];

async function seedDatabase() {
  try {
    console.log('Starting to seed database...');
    const roomsCollection = collection(db, 'rooms');
    const batch = writeBatch(db);

    roomsData.forEach((room) => {
      const docRef = collection(roomsCollection).doc(); // Auto-generates an ID
      batch.set(docRef, room);
    });

    await batch.commit();
    console.log('Database seeded successfully with', roomsData.length, 'rooms.');
  } catch (error) {
    console.error('Error seeding database:', error);
    console.log('Please ensure your firebaseConfig.ts has the correct credentials and Firestore is enabled in your Firebase project.');
  }
}

seedDatabase();
