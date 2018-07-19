import * as bodyParser from 'body-parser';
import {Router, Request, Response, NextFunction} from 'express';
import storeSearchDB from '.././models/storeSearchDB';

export class FilterRoute {

    constructor() { };

    public filter(req: Request, res: Response): void {
        var filterSearch = req.body.takeSearch;

        console.log(filterSearch);

        storeSearchDB.find({ searcj: { $regex: filterSearch } })
            .then((searchResults) => {
                res.json({
                    status: 200,
                    message: "Got the searchs with your typed text.",
                    data: searchResults
                })
            })
            .catch(error => console.log(error));
    }
}
