const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
  } = require('../../controllers/userController.js');

  // /api/user
  router.route('/')
    .get(getUsers)
    .post(createUser)
  
  // api/user/:id
  router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

  // /api/friends/
  router.route('/:id/friends')
    .post(createFriend)
  
  router.route('/:id/friends/:id2')
    .delete(deleteFriend)


module.exports = router;


/*
* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`
*/