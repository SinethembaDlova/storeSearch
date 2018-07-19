import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as session from 'express-session';
import { log } from 'util';

export class Server {
  //Sever

    public app: express.Application;
    constructor() {

        this.app = express();
        this.config();
        //this.routes();
    }

    public config() {
        //setup mongoose
        const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/storedSearches";

        mongoose.connect(mongoURL || undefined, {useMongoClient: true})
        .then(()=> {
            console.log("Connected to Mongo.");
            
        }).catch(err => {
            console.log(err);
            process.exit(1);
        });
        
        //config my dependencies
        this.app.set('view engine', 'hbs');
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(session({
            secret: 'keyboard cat',
            cookie: {
                maxAge: 6000 * 30
            }
        }));

        this.app.use(logger("dev"));

        this.app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
            return res.status(200).json({});
        }
            next();
        })

        
        //run Server    
        const port = process.env.PORT || 8000;
        this.app.listen(port, () => console.log("Server running on port " + port));

    }
}
