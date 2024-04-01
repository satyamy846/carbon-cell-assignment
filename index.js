import express from 'express';
import dotenv from 'dotenv';
import { mongooseConnection } from './config/Connection.js';

import globalErrorResponse from './utilities/errorHelpers/GlobalErrorResponse.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/User.js';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS API Project for mongodb',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: [`./routes/User.js`]
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));




app.get("/", (req, res) => {
    res.send(`Server is running`);
})

mongooseConnection();
app.use(globalErrorResponse);

app.use(userRoute);

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(__dirname)
    console.log(`Server instance running http://localhost:${PORT}`);
})