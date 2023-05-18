# README.md

## Location Data API

This is a RESTful API built with Node.js and Express, which provides location data, specifically for regions, states and local governments.

This API uses a database of location data and a caching mechanism for better performance. You will need to provide an API key for authorization. The API endpoints can be found below.

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js and npm installed on your local machine. [Install](https://nodejs.org/en/download/)
* MongoDB installed on your local machine. [Install](https://docs.mongodb.com/manual/installation/)

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/location-data-api.git
    ```
2. Navigate into the project directory:
    ```
    cd location-data-api
    ```
3. Install the project dependencies:
    ```
    npm install
    ```
4. Start the development server:
    ```
    npm start
    ```

---

## API Endpoints

The API provides the following endpoints:

1. **Get Regions**: `/region`

   Fetches the data of a specific region or all regions if no region name is provided. You can also specify whether you want to include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

2. **Get States**: `/state`

   Fetches the data of a specific state or all states if no state name is provided. You can also specify whether you want to include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

3. **Get Local Government**: `/lga`

   Fetches the data of a specific local government.

---

### API Usage

The API uses bearer token for authorization, so you have to include your API key in the Authorization header as follows:

```
Authorization: Bearer your_api_key
```

Here is an example of how to use the API:

**Request:**

```
GET /state?state_name=lagos&lga=true
Authorization: Bearer your_api_key
```

**Response:**

```
{
    "states": [...]
}
```

---

## Contributing

If you would like to contribute to this project, please feel free to fork the repository, create a feature branch, and open a Pull Request!

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

If you have any questions about this project, please feel free to open an issue or directly contact the project owner.

---

## Acknowledgements

Thanks to everyone who has contributed to this project and supported it.
