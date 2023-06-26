/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       retype_password:
 *         type: string
 *       API_key_id:
 *         type: string
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registers a new user
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User details for registration
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *             - retype_password
 *           properties:
 *             username:
 *               type: string
 *               description: User's preferred username
 *             email:
 *               type: string
 *               description: Email of the user
 *             password:
 *               type: string
 *               description: User's password
 *             retype_password:
 *               type: string
 *               description: Confirmation of the user's password
 *     responses:
 *       201:
 *         description: Signup successful. Returns user details and API key
 *       400:
 *         description: Passwords do not match
 *       409:
 *         description: User already exists
 */
exports.signupDoc = {}

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verifies a user's API key
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user's credentials.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - API_key
 *           properties:
 *             email:
 *               type: string
 *               description: Email to use for login.
 *             API_key:
 *               type: string
 *               description: User's API key.
 *     responses:
 *       200:
 *         description: API key has been verified and is valid.
 *       401:
 *         description: Invalid credentials or API key.
 *       404:
 *         description: User does not exist.
 */
exports.verifyDoc = {}


/**
 * @swagger
 * definitions:
 *   Location:
 *     properties:
 *       state:
 *           type: String,
 *       capital:
 *           type: String
 *       region:
 *           type: String
 *       slogan:
 *           type: String
 *       senatorial_districts:
 *           type: Array
 *       lgas:
 *           type: Array
 *       landmass:
 *           type: String
 *       population:
 *           type: String
 *       dialect:
 *           type: String
 *       map:
 *           type: String
 *       latitude:
 *           type: String
 *       longitude:
 *           type: String
 *       website:
 *           type: String
 *       geo_politcal_zone:
 *           type: String
 *       created_date:
 *           type: Date
 *       created_by:
 *           type: String
 *       past_governors:
 *           type: Array
 *       borders:
 *           type: Array
 *       known_for:
 *           type: Array
 */

/**
 * @swagger
 * /location:
 *   get:
 *     summary: Get all locations
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - All locations
 *     parameters:
 *       - in: query
 *         name: state_sort
 *         required: false
 *         type: string
 *         enum: [asc, desc]
 *         description: Descending or Ascending order
 *       - in: query
 *         name: population_sort
 *         required: false
 *         type: string
 *         enum: [asc, desc]
 *         description: Descending or Ascending order
 *       - in: query
 *         name: maxPopulation
 *         required: false
 *         type: number
 *         description: max population number
 *       - in: query
 *         name: minPopulation
 *         required: false
 *         type: number
 *         description: min population number
 *       - in: query
 *         name: page
 *         required: false
 *         type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         type: number
 *         description: number of items per page
 *     responses:
 *       200:
 *         description: A list of all locations
 *       401:
 *         description: Missing or Invalid Authorization header
 *       404:
 *         description: Region not found
 */
exports.allLocationDoc = {}

/**
 * @swagger
 * /location/region:
 *   get:
 *     summary: Get regions based on the provided region name
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - Regions
 *     parameters:
 *       - in: query
 *         name: region_name
 *         required: false
 *         type: string
 *         description: Name of the region
 *       - in: query
 *         name: lgas
 *         required: false
 *         type: string
 *         enum: [true]
 *         description: Local Government Area
 *     responses:
 *       200:
 *         description: A list of regions
 *       401:
 *         description: Missing or Invalid Authorization header
 *       404:
 *         description: Region not found
 */
exports.regionsDoc = {}

/**
 * @swagger
 * /location/state:
 *   get:
 *     summary: Get states based on the provided state name
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - States
 *     parameters:
 *       - in: query
 *         name: state_name
 *         required: false
 *         type: string
 *         description: Name of the state
 *       - in: query
 *         name: lgas
 *         required: false
 *         type: string
 *         enum: [true]
 *         description: Local Government Area
 *     responses:
 *       200:
 *         description: A list of states
 *       401:
 *         description: Missing or Invalid Authorization header
 *       404:
 *         description: State not found
 */
exports.stateDoc = {}

/**
 * @swagger
 * /location/lga:
 *   get:
 *     summary: Get local governments based on the provided LGA name
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - Local Government
 *     parameters:
 *       - in: query
 *         name: lga_name
 *         required: false
 *         type: string
 *         description: Name of the Local Government Area
 *     responses:
 *       200:
 *         description: A list of local governments
 *       401:
 *         description: Missing or Invalid Authorization header
 *       404:
 *         description: Local Government not found
 */
exports.lgaDoc = {}

