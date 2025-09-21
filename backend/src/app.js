import express from 'express';
import cors from 'cors'
import cookieparser from 'cookie-parser'

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieparser());

// import routes
import userRouter from './routes/user.routes.js'
import campaignRouter from './routes/campaign.routes.js'

// routes declaration
app.use('/api/users', userRouter);

app.use('/api/campaigns', campaignRouter);

export { app }