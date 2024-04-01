import express from 'express';
const router = express.Router();
import { signupUser, loginUser, getapiData, getDataByCategory } from '../controllers/User.js';

import authenticate from '../middlewares/auth.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Entries:
 *        type: object
 *        properties:
 *          API:
 *            type: string
 *          Description:
 *            type: string
 *          Auth:
 *            type: string
 *          HTTPS:
 *            type: boolean
 *          Cors:
 *            type: string
 *          Link:
 *            type: string
 *          Category:
 *            type: string
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto generated id by mongodb
 *              name:
 *                  type: string
 *              description: Name of the person
 *              email:
 *                  type: string
 *                  description: Valid email
 *              password:
 *                  type: string
 *                  description: Valid strong password Password must be minLength 8, minLowercase 1, minUppercase 1, minNumbers 1, minSymbols 1
 *          example:
 *              _id: 660962df116deb2a509c5b17
 *              name: Example Yadav
 *              email: example@gmail.com
 *              password: Example11@
 */

/**
 * @swagger
 * tags:
 *      name: User
 *      description: Contains all the routes of User
 */

/**
 * @swagger
 * tags:
 *      name: Entries
 *      description: Contains all the routes of public api Entries
 */
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     description: Register a new user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       '200':
 *         description: A successful response
 */

router.post("/auth/signup", signupUser);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application using email and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */

router.post("/auth/login", loginUser);


/**
 * @swagger
 * /api/getData:
 *   get:
 *     summary: Get public APIs entries
 *     description: Get public APIs entries
 *     tags: [Entries]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entries'
 */
router.get("/api/getData", authenticate, getapiData);


/**
 * @swagger
 * /api/getDataBycategory:
 *   get:
 *     summary: Get public APIs entries by category
 *     description: Get public APIs entries
 *     tags: [Entries]
 *     parameters:
 *          - in : query
 *            name: category
 *            schema:
 *              type: string
 *              required: true
 *            description: fetch all the entries by category
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entries'
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */
router.get("/api/getDataBycategory", authenticate, getDataByCategory);
export default router;
