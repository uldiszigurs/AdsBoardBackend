# AdsBoardBackend

This is backend for [AdsBoardFrontend](https://github.com/uldiszigurs/AdsBoardFrontend)

[Postman collection](https://www.getpostman.com/collections/bed7497c4fd0e8bdebdd)

How to run :

- `npm install`

- `npm run dev`

Make sure `.ENV` file exists, add your own values. Use `.ENV.TEMPLATE` as a template for creating `.ENV`;
currently added for the ability to instantly run

Note:

Frontend part is not yet updated to work with this version of API.

## TODO:

- endpoints related to media are not working

- if a controller in `controllerWrapper` fails no fallback actions are done (this is for later though)
