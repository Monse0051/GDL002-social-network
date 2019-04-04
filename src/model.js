/**
 * Queries in firebase all posts
 * availables from email user
 * @param {string} email
 * @returns {Array} posts
 */
function getPostsFromUser(email, db){
    let posts ;
    db.collection(`${USERS_COLLECTION}/user_${email}/myPosts/`).get().then( function (collect) {
        console.log(collect);
        posts = collect.docs.map(function (p) {
           return p.data(); 
        });
    }).catch(
        function (error) {
            console.log(error);
        }
    );
    return posts;
}