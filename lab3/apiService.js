import { posts, comments } from './data.js';

export const getPostDetails = (post) => {
    const { id, title, author } = post;
    return {
        id,
        title,
        author,
        titleLength: title.length
    };
};

export const getPostAuthor = (post) => {
    return post.author;
};

export const fetchAllPosts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: "success", data: posts });
        }, 1000);
    });
};

export const fetchCommentsByPostId = (postId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredComments = comments.filter(comment => comment.postId === postId);
            resolve({ status: "success", data: filteredComments });
        }, 500);
    });
};

export const findPostById = (postId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const post = posts.find(p => p.id === postId);
            if (post) {
                resolve({ status: "success", data: post });
            } else {
                reject({ status: "error", message: "Post not found!" });
            }
        }, 500);
    });
};