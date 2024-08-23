# Module 18 - Social Network API (mongodb) 

Applying the concepts from unit 18, I created a social network api with the following functionalities:

### Database

- Installed & configured Node, MongoDb & Mongoose to set up database for this api.

### Models
- User.js
    - Created the database schema for User, allowing the following elements to be passed in:
        - ObjectId
        - username
        - email
        - thoughts (as an array - allowing thoughts from 'Thought' model to be pushed inside an associated User model)
        - friends (as a self-referencing array - allowing friends to be pushed inside an associated User model)
        - Virtual
            - used a get function to make a friendCount every time a friend is  passed inside an associated User.
- Thought.js
    - Created the database schema for Thought, allowing the following elements to be passed in:
        - reactionSchema
            - schema.type ID
            - reactionBody
            - username
            - createdAt (formatted time to localString)

        - thoughtSchema
            - thoughtText
            - createdAt (formatted time to localString)
            - userName(ObjectId from 'User' model)
            - reactions (as an array - passed in from reactionSchema)
            - Virtal
                - used a get function to make a friendCount every time a friend is  passed inside an associated Thought.

### Routes

The api's router chain was called in the following sequence of calls below, referencing the necessary functions inside the controller folder (see Controller section).

- Index.js (OUTSIDE API folder)
    - (/api)
- Index.js (INSIDE API folder)
    - (/users)
    - (/thoughts)
- userRoutes.js
    - /api/user
    - api/user/:id
    - /api/friends/
        - /:id/friends
        - /:id/friends/:id2
- thoughtRoutes.js
    - /api/thought
    - /api/thought/:id
    - /api/thought/:id/reactions
        - /:id/reactions/:id2

### Controllers

The central files at the end of the router paths, containing the functions for all api calls  inside their respective path.

- userController
    - getUsers
    - getSingleUser
    - createUser
    - updateUser
    - deleteUser
    - createFriend
    - deleteFriend

- thoughtController
    - getThought
    - getSingleThought
    - createThought
    - updateThought
    - deleteThought
    - createReaction
    - deleteReaction

### Postman
- Using the application Postman, I succesfully tested GET, GET/:ID, POST, PUT & DELETE calls required in this assignment with dummy data (see walkthrough vid below)


## Link to Walkthrough Vid

[Click here to see the walkthrough vid](https://drive.google.com/file/d/1CwJ4McfuwupLP1BgmPC6tvl95fWP5HV4/view)



