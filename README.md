# Run Web Client at Local with Node.js
these projects are made via "create react app" command.

you can run this with just move to the directory that package.json exists.
and run npm start
```
cd client
npm start
```


# Local Test and Server Setup
you can use local server for testing service.

The file "db.json" is database.

To use this, run
```
npm install -g json-server
```
and move directory that db file exsting.

To run server, type this. You have to set port number different from React App is running.
```
json-server -w db.json --port 3004
```
BOOM!



How to (https://qiita.com/roana0229/items/547437b6314fd283ddca)