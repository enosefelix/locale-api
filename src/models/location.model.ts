import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    slogan: {
        type: String,
        required: true
    },
    senatorial_districts: {
        type: Array,
        required: true
    },
    lgas: {
        type: Array,
        required: true
    },
    landmass: {
        type: String,
        required: true
    },
    population: {
        type: String,
        required: true
    },
    dialect: {
        type: String,
        required: true
    },
    map: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    geo_politcal_zone: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    past_governors: {
        type: Array,
        required: true
    },
    borders: {
        type: Array,
        required: true
    },
    known_for: {
        type: Array,
        required: true
    }
});

export const locationModel = mongoose.model('map', locationSchema);