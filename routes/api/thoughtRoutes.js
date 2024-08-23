const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controllers/thoughtController.js');

  // /api/thought
  router.route('/')
    .get(getThought)
    .post(createThought)
    
    // /api/thought/:id
    router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)
  
  // /api/thought/:id/reaction
  router.route('/:id/reactions')
    .post(createReaction)

  // /api/thought/:id/reaction/:id
  router.route('/:id/reactions/:id2')
    .delete(deleteReaction);


module.exports = router;