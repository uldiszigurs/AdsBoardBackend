# AdsBoardBackend

This is backend for [AdsBoardFrontend](https://github.com/uldiszigurs/AdsBoardFrontend)

[Postman collection](https://www.getpostman.com/collections/bed7497c4fd0e8bdebdd)

How to run :

- `npm install`

- `npm run dev`

Make sure `.ENV` file exists, add your own values. Use `.ENV.TEMPLATE` as a template for creating `.ENV`;
currently added for the ability to instantly run

Issues :

- any endpoints related to media are not working

- might be wrong http status codes when using `controllerWrapper` (controller should provide status code to send) partially done

- if a controller in `controllerWrapper` fails no fallback actions are done

- updating / deleting a post doesn't modify categories list (which it should in case of changes)

## TODO:

- Utilize mongoose built in features : validation, subdocuments, subdocument methods, `parent()` etc.

- add `.put` (update) & `.delete` methods for comments & posts; ~~done for posts~~, still need for comments
No longer the case really due to another endpoint revamp
- case sensitivity in categories list should not matter