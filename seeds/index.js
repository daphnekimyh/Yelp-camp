const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64352a97827437b4207c2bc8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum recusandae. Tenetur libero nisi ratione delectus sed saepe nam, dolorum eius dolores dolor accusamus magni placeat doloribus itaque praesentium autem!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwby9yti9/image/upload/v1681474127/YelpCamp/omhqaro7ajuwno6me8rb.jpg',
                    filename: 'YelpCamp/omhqaro7ajuwno6me8rb',
                },
                {
                    url: 'https://res.cloudinary.com/dwby9yti9/image/upload/v1681474128/YelpCamp/qzkvdnbmxakmehlbgyne.jpg',
                    filename: 'YelpCamp/qzkvdnbmxakmehlbgyne',
                },
                {
                    url: 'https://res.cloudinary.com/dwby9yti9/image/upload/v1681474130/YelpCamp/nnw2woovruxesvwqs8vq.jpg',
                    filename: 'YelpCamp/nnw2woovruxesvwqs8vq',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
