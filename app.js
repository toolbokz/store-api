require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve frontend static files from public/
app.use(express.static('public'));

// Product route for testing (kept for backwards compatibility)
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><a href="/api/v1/products">Go to Product Route</a>');
});

app.use('/api/v1/products', productsRouter);

// Error handling middleware    
app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT || 3000;

const start = async () => {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    try {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();