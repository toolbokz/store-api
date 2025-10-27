const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
        // enum:['ikea', 'liddy', 'caressa', 'marcos'],
    },
    images: {
        type: [
            {
                url: {
                    type: String,
                    required: true
                },
                filename: {
                    type: String
                },
                alt: {
                    type: String,
                    default: ''
                }
            }
        ],
        default: []
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);