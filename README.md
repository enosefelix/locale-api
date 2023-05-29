# README.md

## Location Data API

This is a RESTful API built with Node.js and Express, which provides location data, specifically for regions, states and local governments.

This API uses a database of location data and a caching mechanism for better performance. You will need to provide an API key for authorization. The API endpoints can be found below.

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your local machine. [Install](https://nodejs.org/en/download/)
- MongoDB installed on your local machine. [Install](https://docs.mongodb.com/manual/installation/)
- Redis installed on your local machine. [this link](https://redis.io/docs/getting-started/) for guideline

I have hosted it on: 

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/enosefelix/locale-api.git
   ```
2. Navigate into the project directory:
   ```
   cd locale-api
   ```
3. Install the project dependencies:
   ```
   npm install
   ```
4. Make a copy of .env.sample as .env and populate file with required credentials

    ```sh
    cp .env.sample .env
    ```

5. Start the development server:
   ```
   npm start:dev
   ```

---

## API Endpoints

The API provides the following endpoints:

1. **Get Regions**: `/region`

   Fetches the data of a specific region or all regions if no region name is provided. You can also specify whether you want to include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

2. **Get States**: `/state`

   Fetches the data of a specific state or all states if no state name is provided. You can also specify whether you want to include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

3. **Get Local Government**: `/lga`

   Fetches the data of a specific or all local government.

---

### API Usage

To test on your local with swagger, use
```
localhost:3000/api-docs
```

The API uses bearer token for authorization, so you have to include your API key in the Authorization header as follows:

```
Authorization: your_api_key
```

Here is an example of how to use the API:

**Request:**

```
GET /state?state_name=lagos&lga=true
Authorization: your_api_key
```

**Response:**

```
{
    "states": {
  "states": [
    {
      "_id": "64707c54230400407f446809",
      "region": "South West",
      "state": "Lagos",
      "capital": "Ikeja",
      "slogan": "Centre of Excellence",
      "landmass": "3,577 km2 (1,380 sq mi)",
      "population": "9,013,534",
      "dialect": "Yoruba",
      "latitude": "6.5244",
      "longitude": "3.3792",
      "created_date": "1967-05-26T23:00:00.000Z",
      "senatorial_districts": [
        "Lagos West",
        "Lagos Central",
        "Lagos East"
      ],
      "borders": [
        "Ogun",
        "Ondo"
      ],
      "known_for": [
        "National Museum Lagos",
        "National Arts Theatre",
        "National Museum Lagos",
        "National Arts Theatre"
      ]
    }
  ]
}
}
```

---

## Contributing

If you would like to contribute to this project, please feel free to fork the repository, create a feature branch, and open a Pull Request!

---

## Contact

If you have any questions about this project, please feel free to open an issue or directly contact the project owner.

---
