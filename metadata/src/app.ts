import express ,{ Application ,Request,Response} from 'express';
import bodyParser from 'body-parser';
import db from './config/database';
import { Routes } from './routes';


class App {
    public app: express.Application;
    public route: Routes = new Routes();
    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);

        const PORT = process.env.PORT || 4000;
        this.app.listen(PORT,()=>console.log(`metadata server running on ${PORT}`));

    }

    private config(): void {
        //testing connection
        db.authenticate()
        .then(()=> console.log('Connection has been established successfully.'))
        .catch ((error:any)=>console.error('Unable to connect to the database:', error));

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
      

    }
}

export default new App().app;
