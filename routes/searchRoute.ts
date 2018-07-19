import * as bodyParser from 'body-parser';
import { Router, Request, Response, NextFunction } from 'express';
import storeSearchDB from '../models/storeSearchDB'
import * as session from 'express-session';
import * as mongoose from 'mongoose'

export class Search {

  constructor() { }

  //get route
  public getAllSearches(req: Request, res: Response): void {
    storeSearchDB.find({}, null, {sort: {counter : -1}})
      .then((allSearches) => {
        res.json({
          status: 200,
          message: "Got all the searches from the database.",
          data: allSearches
        });
      })
      .catch(error => (console.log(error)));
  }//end get homeRoute method

  //post route to store the search in DB
  public storeSearch(req: Request, res: Response): void {

    var enteredSearch = req.body.takeSearch;
    if (!enteredSearch) {
      return;
    }

    var newSearch = new storeSearchDB({
      search : enteredSearch.toLowerCase(),
      time: Date.now(),
      counter: 1
    });

    newSearch.save()
   .then((search) => {
    res.json({
      status : 200,
      message: "Search saved in the database.",
      data: newSearch
      });
    })
  .catch((err) => {
    if(err.code === 11000){
      storeSearchDB.findOne({search: enteredSearch.toLowerCase()}).then((matchingSearch) =>{
      
        console.log("matching search: ", matchingSearch);
        matchingSearch.counter++;
        matchingSearch.save().then((updatedSearch) =>{
          res.json({
            status : 200,
            message: "Updated counter.",
            data: newSearch
          })
        })
      })
    }
  })
  
  }
}

