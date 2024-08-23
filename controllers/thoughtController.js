const mongoose = require('mongoose')
const Thought  = require('../models/Thought');
const User = require('../models/User')

module.exports = {
  // /api/thoughts
  // GET
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // /api/thoughts/:id
  // GET/:id 
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // /api/thoughts
  // POST 
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      console.log(thought)

      const user = await User.findByIdAndUpdate(
        req.body.userId, // Assuming userId is sent in the request body
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      
      res.status(200).send({message: "thought successfully created"})
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // /api/thoughts/:id
  // PUT 
  async updateThought (req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      console.log(thought)
      res.status(200).send({message: "thought successfully updated"})
    } catch(err) {
      res.status(500).send({ message: 'Internal Server Error' })
    }
  },

  // /api/thoughts/:id
  // DELETE
  async deleteThought (req, res) {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id)

        console.log(thought)
        res.status(200).send({message: "thought successfully deleted"})
      } catch(err) {
        res.status(500).send({ message: 'Internal Server Error' })
      }
  },

  // /api/thoughts/:id/reactions
  // POST
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: {
          reactions: req.body
        }},
        { new: true }
      )
      res.status(200).send({message: "reaction successfully created"});
      console.log(thought);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating friend' });
    }
 },
//  /api/thoughts/:id/reactions/:id
// DELETE
async deleteReaction(req, res) {
    try {
      console.log(req.params.id)
      console.log(req.params.id2)
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.id },
            { $pull: { 
              reactions: { 
                _id: req.params.id2 
              } 
            } 
          },
        { new: true }
      );
      console.log(reaction)
      res.status(200).send({message: "reaction successfully deleted"});
    } catch(err) {
      res.status(500).send({ message: 'Error deleting reaction' })
      console.log(err)
    }
 }
};
