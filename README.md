# AdsBoardBackend
This is backend for https://github.com/uldiszigurs/AdsBoardFrontend

Postman collection : https://www.getpostman.com/collections/bed7497c4fd0e8bdebdd

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
- merge schemas who share same info, e.g. comment & media are both bound to postId : 
current potential option 
addition
Post : {
  _id, 
  title, 
  description, 
  createdAt, 
  updatedAt, 
  media : {
    _id,
    postId,
    url/name
    createdAt, 
    updatedAt,
  }
  category : [
    {
      _id,
      categoryName,
      createdAt, 
      updatedAt,
      postId : Array < string >
    },
  ],
  comments : [
    {
      _id,
      postId ,
      content(message),
      createdAt,
      updatedAt,
    },
  ]
}
- add .put (update) & .delete methods for comments & posts; done for posts, still need for comments
- case sensitivity in categories list should not matter