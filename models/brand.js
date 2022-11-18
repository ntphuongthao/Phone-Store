const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true,
    },
});

BrandSchema.virtual("url").get(function() {
    return `/brands/${this._id}`;
});

module.export = mongoose.model("Brand", BrandSchema);