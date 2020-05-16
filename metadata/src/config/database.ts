import  {Sequelize}  from 'sequelize';
const db=  new Sequelize('metadata', 'postgres', 'sindhu1234', {
    host: 'localhost',
    dialect:  'postgres' 
  });

  /*const db =new Sequelize({
    database: 'metadata',
    dialect: 'postgres',
    username: 'postgres',
    password: 'sindhu1234',
    storage: ':memory:',
    models: [__dirname + '../models']
  });*/
  export default db;