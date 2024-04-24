var express = require('express');
var router = express.Router();
const postController = require('../controllers/postsController');

/* GET users listing. */
router.get('/', postController.getPosts);
// router.get('/', postController.getPost);
router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.delete('/', postController.deletePosts);

module.exports = router;
