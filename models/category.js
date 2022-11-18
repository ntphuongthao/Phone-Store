const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500,
    }
});

CategorySchema.virtual("url").get(function() {
    return `/categories/${this._id}`
});

module.export = mongoose.model("Category", CategorySchema);