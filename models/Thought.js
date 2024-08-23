const { Schema, model } = require('mongoose');
const { User } = require('./User')

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => (newObjectId)
    },

    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    }, 

    username: {
        type: String,
        required: true
    },
    
    createdAt:{
        type: Date,
        default: () => Date.now(),
        get: function (timestamp) {
            return new Date(timestamp).toLocaleString()
        }
    }
})

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      unique: true,
      minLength: 1,
      maxLength: 280,
    },
  
    createdAt: {
        type: Date,  
        default: () => Date.now(),
        get: function (timestamp) {
            return new Date(timestamp).toLocaleString()
        }
    },

    userName: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reactions: [reactionSchema],
  },
    {
    toJSON: {
      virtuals: true
    },
      id: false,
  }
);
  
  
thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.reactions.length}`;
});



  
const Thought = model('Thought',thoughtSchema);

module.exports = Thought;

/*
* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

* `username` (The user that created this thought)
  * String
  * Required

* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`

  * Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
*/


/*
* `reactionId`
  * Use Mongoose's ObjectId data type
  * Default value is set to a new ObjectId

* `reactionBody`
  * String
  * Required
  * 280 character maximum

* `username`
  * String
  * Required

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query
*/