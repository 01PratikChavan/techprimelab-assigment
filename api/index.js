
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/database.js';
import authRoutes from '../api/routes/auth.route.js';
import projectRoutes from '../api/routes/project.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

//config env


const app = express();
app.use(cors({
    origin: true,
    credentials: true
}));

dotenv.config();
const PORT = process.env.PORT;
console.log(process.env.PORT);


//connect database


app.use(cookieParser());
app.use(cors());

connectDB();

//middleware
app.use(morgan('dev'))
app.use(express.json())


app.use('/auth/', authRoutes);
app.use('/project', projectRoutes);

//rest api
app.get('/', (req, res) => {
    res.send({ message: 'Welcome' })
})

//port  
app.listen(PORT, () => {
    console.log('Server running on', PORT)
})
//routes