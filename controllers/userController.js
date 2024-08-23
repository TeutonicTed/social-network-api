const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate(['friends', 'thoughts']);
      res.json(users);
    } catch(err) {
      res.status(500).json(err);
      console.log(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).send({message: "user successfully created"});
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async updateUser (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      console.log(user)
      res.status(200).send({message: "user successfully updated"})
    } catch(err) {
      res.status(500).send({ message: 'Internal Server Error' })
    }
  },
  async deleteUser (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send({message: "user successfully deleted"})
      } catch(err) {
        res.status(500).send({ message: 'Internal Server Error' })
      }
  },
  async createFriend(req, res) {
    try {
      const { id } = req.body; // Assuming id is the friend's _id

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { friends: id }},
      { new: true }
    );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).send({message: "friend successfully created"});
      console.log(user);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating friend' });
    }
   },
   async deleteFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.id },
            { $pull: { 
              friends: req.params.id2
              } 
            },
            { new: true }            
        );
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Friend successfully deleted', user });
        } catch(err) {
          console.error(err);
          res.status(500).json({ message: 'Error deleting friend' });
        }
    }
};

