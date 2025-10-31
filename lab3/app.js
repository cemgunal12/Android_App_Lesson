import {
    fetchAllPosts,
    findPostById,
    fetchCommentsByPostId
} from './apiService.js';

const getPostWithComments = async (postId) => {
    console.log(`\n--- Challenge 1: Fetching Post and Comments Concurrently for ID: ${postId} ---`);
    const [postResult, commentsResult] = await Promise.all([
        findPostById(postId),
        fetchCommentsByPostId(postId)
    ]);
    return { post: postResult.data, comments: commentsResult.data };
};

const getFormattedPostData = async () => {
    console.log("\n--- Challenge 2: Formatting Post Data ---");
    const postsResult = await fetchAllPosts();
    const postsData = postsResult.data;

    const formattedStrings = postsData.map(post => {
        console.log("\nKey-Value pairs for post ID:", post.id);
        Object.entries(post).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
        return `Title: ${post.title}, Author: ${post.author}`;
    });
    
    console.log("\n--- Formatted Post Strings ---");
    console.log(formattedStrings);
};


const displayPostData = async () => {
    try {
        console.log("Fetching all posts...");
        const postsResult = await fetchAllPosts();
        const allPosts = postsResult.data;
        console.log("--- All Post Titles ---");
        allPosts.forEach(post => console.log(post.title));
        console.log("-----------------------\n");

        const postIdToFind = 1;
        console.log(`Fetching post with ID: ${postIdToFind}...`);
        const postResult = await findPostById(postIdToFind);
        const specificPost = postResult.data;

        console.log(`Fetching comments for post ID: ${postIdToFind}...`);
        const commentsResult = await fetchCommentsByPostId(postIdToFind);
        const postComments = commentsResult.data;

        console.log("\n--- Specific Post Details ---");
        console.log("Post:", specificPost);
        console.log("Comments:", postComments);
        console.log("-----------------------------\n");
        
        const postWithFetchTime = {
            ...specificPost,
            fetchTime: new Date()
        };
        console.log("Post with Fetch Time:", postWithFetchTime);

        const { id, ...postInfo } = specificPost;
        console.log("Post Info (without ID):", postInfo);

        // Challenges
        const combinedData = await getPostWithComments(postIdToFind);
        console.log("Combined Data:", combinedData);

        await getFormattedPostData();

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

displayPostData();