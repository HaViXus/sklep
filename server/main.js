import { Meteor } from 'meteor/meteor';
import '../imports/api/products.js';

import { WebApp } from 'meteor/webapp';
import bodyParser from "body-parser"
import { Users } from '../imports/api/user.js';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use(bodyParser.json())
  WebApp.connectHandlers.use((req, res, next) => {
    if (req.url === '/api/register') {
      console.log(req.body);
      Users.insert({
        name: req.body.name,
        password: req.body.password,
        number: req.body.number,
        createdAt: new Date(), // current time
      });
      console.log(Users.find({}).fetch())

      res.end()
    } else {
      next();
    }
  });

});
