const { venues } = require('../data/rooms');
const Room = require('../models/room');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://neutronstarkd:TCmt2LLgtOHczAzW@cluster0.vgnercb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });

const seedRooms = async () => {
    try {
        // Delete existing rooms
        await Room.deleteMany();
        console.log('Rooms are deleted');

        // Insert new rooms
        await Room.insertMany(venues);
        console.log('All Rooms are added.');

    } catch (error) {
        console.error('Error seeding rooms:', error.message);
    } finally {
        // Close the connection
        mongoose.connection.close();
        process.exit();
    }
}

seedRooms();
