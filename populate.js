require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')
const productsData = require('./products.json')

const start = async () => {
    try {
        // Connect to DB
        await connectDB(process.env.MONGO_URI)

        // Clean existing products
        await Product.deleteMany()
        console.log('Deleted existing products...')

        // Insert new products
        await Product.create(productsData)
        console.log(`Successfully added ${productsData.length} products`)

        // Exit successfully
        process.exit(0)
    } catch (error) {
        console.log('Error:', error)
        process.exit(1)
    }
}

// Run the population
console.log('Starting database population...')
start()
