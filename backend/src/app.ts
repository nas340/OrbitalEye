import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;