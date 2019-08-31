# AdsBoardBackend
This is backend for https://github.com/uldiszigurs/AdsBoardFrontend

Postman collection : https://www.getpostman.com/collections/bed7497c4fd0e8bdebdd

How to run : 
npm install
npm run dev
Make sure .env file exists, add your own values. Use .ENV.TEMPLATE as a template for creating .ENV

Issues : 
- sending actual image (can get path for media though)


## TODO: 
- merge schemas who share same info, e.g. comment & media are both bound to postId 
- add update & delete methods for comments & posts
- add whitelist for category names
- add additional event handler which scans post body for category, save category name in array
- add category list endpoint
- if merged schemas, change url paths to be more appropriate (for the payload to expect)