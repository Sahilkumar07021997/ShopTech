const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        trim: true,
        maxlength:[100,'product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'please enter product price'],
        trim: true,
        maxlength: [5, 'product price cannot exceed greater than 5 digits'],
        default:0.0  
    },
    description: {
        type: String,
        required: [true, 'please enter product description']
    },
    ratings: {
        type: Number,
        default:0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required:true
        },
    }],
    category: {
        type: String,
        required: [true, 'please select category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
           // message:'please select category for the product'

        }
    },
    seller: {
        type: String,
        required: [true, 'please enter Seller name'],
    },
    stock: {
        type: Number,
        required: [true, 'please enter Product stock'],
        maxLength: [5, 'please stock value cannot exceed beyond this'],
        default:0
    },
    numOfReviews: {
        type: Number,
        default:0
    },
    reviews: [
        {
            user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required:true
        },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required:true
    },

    createdAt: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);