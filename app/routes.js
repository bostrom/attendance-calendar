 // app/routes.js

 // grab the attendee model we just created
 var Attendee = require('./models/attendee');

 module.exports = function (app) {

   // server routes ===========================================================
   // handle things like api calls
   // authentication routes

   // sample api route
   app.get('/api/attendees', function (req, res) {
     // use mongoose to get all attendees in the database
     Attendee.find(function (err, attendees) {

       // if there is an error retrieving, send the error.
       // nothing after res.send(err) will execute
       if (err)
         res.send(err);

       res.json(attendees); // return all attendees in JSON format
     });
   });

   // route to handle creating goes here (app.post)
   // route to handle delete goes here (app.delete)

   // frontend routes =========================================================
   // route to handle all angular requests
   app.get('*', function (req, res) {
     res.sendfile('./public/views/index.html'); // load our public/index.html file
   });

 };
