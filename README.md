# AdsBoardBackend
This is backend for https://github.com/uldiszigurs/AdsBoardFrontend

Postman collection : https://www.getpostman.com/collections/bed7497c4fd0e8bdebdd

How to run : 

npm install

npm run dev

Make sure .env file exists, add your own values. Use .ENV.TEMPLATE as a template for creating .ENV;
currently added for the ability to instantly run

Issues : 
- sending actual image (can get path for media though)
- might be wrong http status codes when using controllerWrapper (controller should provide status code to send)

## TODO: 
- merge schemas who share same info, e.g. comment & media are both bound to postId 
- add update & delete methods for comments & posts
- add whitelist for category names : optional
- remove unused dependencies, currently have babel-core and @babel/core