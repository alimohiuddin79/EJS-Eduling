const Blog = require("../models/blog");

const postBlogSearch = function(req, res){
    const searchText = req.body.search;

    Blog.find({$text: {$search: searchText}}, function(err, foundBlogs){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            if(req.isAuthenticated()){
                const userName = req.user.name;
                const userImg = req.user.userImg;
                const isAdmin = req.user.admin;
                res.render("blog-search", {requestedBlogs: foundBlogs, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
            } else {
                res.render("blog-search", {requestedBlogs: foundBlogs, isUserOnline: false});
            }
        }
    });
}

module.exports = {postBlogSearch};