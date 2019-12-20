import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}

const pool = new pg.Pool(connection)

pool.on('connect', () => {});

const UserTable = async () => {
    const CreateTable = `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY UNIQUE,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL, 
        email VARCHAR(50) NOT NULL,
        password VARCHAR(20) NOT NULL
        )`
        try{
         await pool.query(CreateTable)
         console.log('user table created')

        }
        catch(e) {
            console.log(e)
        }
        
}

const MealTable = async () => {
    const CreateMealTable = `CREATE TABLE IF NOT EXISTS
    meal(
        id SERIAL PRIMARY KEY UNIQUE,
        mealImg VARCHAR(80) NOT NULL,
        mealName VARCHAR(50) NOT NULL,
        amount INT NOT NULL,
    )`
    try{
        await pool.query(CreateMealTable)
        console.log('meal table created')
    }
    catch(e){
        console.log(e);
    }
}

MealTable()
UserTable();

export default pool;