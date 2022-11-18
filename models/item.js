const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 150
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
    }],
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100000
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0
    },
    lastUpdated: {
        type: Date,
        required: true
    }
});

ItemSchema.virtual("url").get(function() {
    return `/items/${this._id}`;
});

module.export = mongoose.model("Item", ItemSchema);
