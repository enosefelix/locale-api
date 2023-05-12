import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
    "state": "Abia",
    "capital": "Umuahia",
    "slogan": "God's Own State",
    "senatorial_districts": [
        "Abia Central",
        "Abia North",
        "Abia South"
    ],
    "lgas": [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Isuikwuato",
        "Osisioma-Ngwa",
        "Obioma-Ngwa",
        "Ohafia",
        "Ikwuano",
        "Umu-Nneochi",
        "Isiala Ngwa South",
        "Isiala Ngwa North",
        "Ugwunagbo",
        "Ukwa West",
        "Ukwa East",
        "Umuahia South",
        "Umuahia North"
    ],
    "landmass": "6,320 km2 (2,440 sq mi)",
    "population": "2,833,999",
    "dialect": "Igbo",
    "map": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Nigeria_Abia_state_map.png/250px-Nigeria_Abia_state_map.png",
    "latitude": "5.524913",
    "longitude": "7.494296",
    "website": "http://www.abiastate.gov.ng/",
    "geo_politcal_zone": "South East",
    "created_date": "27 August 1991",
    "created_by": "General Ibrahim Babangida",
    "past_governors": [
        "Ogbonnaya Onu",
        "Chris Akomas",
        "Orji Uzor Kalu",
        "Theodore Orji",
        "Okezie Ikpeazu"
    ],
    "borders": [
        "Akwa Ibom",
        "Cross River",
        "Ebonyi",
        "Enugu",
        "Imo",
        "Rivers"
    ],
    "known_for": {
        type: Array,
        required: true
    }
});

export const apiModel = mongoose.model('api', apiKeySchema);