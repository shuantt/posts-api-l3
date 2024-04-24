const Post = require('../models/postsModel.js');
const responseHandler = require('../utils/responseHandler');

const postsController = {
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find({}).select(
                '_id content image name likes createdAt updatedAt'
            );
            responseHandler.sendSuccess(res, 200, '成功取得所有貼文', posts);
        } catch (err) {
            console.log(err);
            responseHandler.sendError(res, 400, 'failed');
        }
    },
    createPost: async (req, res) => {
        try {   
            const {content,image,name,likes} = req.body;
            console.log(content, image,name,likes);

            if (content === undefined || name === undefined) {
                responseHandler.sendError(res, 400, 'content 和 name 為必填');
                return;
            } else if (content === '' || name === '') {
                responseHandler.sendError(res, 400, 'content 和 name 為必填');
                return;
            }
            else {
                const newPost = await Post.create({
                    content: content,
                    image: image,
                    name: name,
                    likes: likes,
                });
                responseHandler.sendSuccess(res, 200, '成功新增貼文', newPost);
            }
        } catch (err) {
            console.log(err);
            responseHandler.sendError(res, 400, '參數錯誤');
        }
    },
    updatePost: async (req, res) => {
        try {
            const {id} = req.params;
            const {content,name,image,likes} = req.body;
            if (content === '' || name === '') {
              responseHandler.sendError(res, 400, 'content 和 name 不可為空');
              return;
            } else {
              const updatePost = await Post.findByIdAndUpdate(
                id,
                { content: content, name: name, image: image, likes: likes },
                { returnDocument: 'after' }
              );
              if (updatePost === null) {
                responseHandler.sendError(res, 400, '無此 id');
              } else {
                responseHandler.sendSuccess(res, 200, `貼文 ${updatePost._id} 已更新`, updatePost);
              }
            }
          } catch (err) {
            console.log(err);
            responseHandler.sendError(res, 400, '參數錯誤或無此 id');
          }
    },
    deletePosts: async (req, res) => {
        try {
            const deleteResult = await Post.deleteMany();
            responseHandler.sendSuccess(res, 200, `已刪除全部共 ${deleteResult.deletedCount} 篇貼文`);
          } catch (err) {
            console.log(err);
            responseHandler.sendError(res, 400, '參數錯誤');
          }
    },
    deletePost: async (req, res) => {
        const {id} = req.params;
        try {
          const deleteResult = await Post.findByIdAndDelete(id);
          if (deleteResult === null) {
            responseHandler.sendError(res, 400, '無此 id');
          } else {
            responseHandler.sendSuccess(res, 200, `貼文 ${deleteResult._id} 已刪除`, deleteResult);
          }
        } catch (err) {
          console.log(err);
          responseHandler.sendError(res, 400, '參數錯誤或無此 id');
        }
    }
}

module.exports = postsController;