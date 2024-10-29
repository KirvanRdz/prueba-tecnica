const dotenv= require('dotenv') ;

dotenv.config();

const varEnv= {
  PORT: process.env.PORT || '8080',
  DB_USER:process.env.DB_USER,
  DB_HOST:process.env.DB_HOST,
  DB_NAME:process.env.DB_NAME,
  DB_PASSWORD:process.env.DB_PASSWORD
};

module.exports=varEnv;