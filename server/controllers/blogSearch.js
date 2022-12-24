const Blog = require("../models/blog");

const postBlogSearch = function(req, res){
    const searchText = req.body.search;

    Blog.find({$text: {$search: searchText}}, function(err, foundBlogs){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.render("blog-search", {requestedBlogs: foundBlogs});
        }
    });
}

module.exports = {postBlogSearch};