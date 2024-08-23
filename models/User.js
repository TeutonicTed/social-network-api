const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  },

  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought',
  }], 

  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  },

  {
  toJSON: {
    virtuals: true,
  },
    id: false,
  }
);


userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length} `;
  })

const User = model('User',userSchema);

module.exports = User;

/*
* `username`
  * String
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)
*/