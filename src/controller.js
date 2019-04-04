
//import { timeLineTemplate } from './templates/timelineTemplate';

const USERS_COLLECTION = "users_tests_monse";



function CreatePost(mail, textval, isPublic) {
   
    //Function to return current date

    const getdate=()=> {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        return today;
    };

    let date = getdate();
    
    return {
        email:mail,
        text: textval,
        is_public: isPublic,
        date : `${date}`
    };
}


function handleSignedInUser(firebaseUser) {
    location.hash = "#timeline";

    let userEmail = firebaseUser.email; 
    let db = firebase.firestore();

    // modifies timeline
    contentDiv.innerHTML = timelineTemplate();
    
    db.collection(`${USERS_COLLECTION}/user_${userEmail}/myPosts/`).get().then( function (collect) {
        let userPosts = collect.docs.map(function (p) {
           return p.data(); 
        });
        let allPostSection = document.getElementById("all-posts");
        allPostSection.innerHTML = "<div>";

        for (let index = 0; index < userPosts.length; index++) {
            const postElement = userPosts[index];

            /**
             * domPost = generatePostTempl(postText);
             */

            allPostSection.innerHTML += postElement.text + "<br></br>";
        }
        allPostSection.innerHTML += "</div>";

     
    }).catch(
        function (error) {
            console.log(error);
        }
    );


    let testDb= document.getElementById("all-posts");
    document.getElementById("button-post").addEventListener("click", function () {
        let postText = document.getElementById("input-post").value;
        if (postText.length >0) {
            //TODO: extract if post is public or not from radio box
            const post = CreatePost(userEmail, postText, true);
            db.collection(`${USERS_COLLECTION}/user_${userEmail}/myPosts/`).add(post)
            .then (function (docRef){
                //testDb.innerHTML= docRef.id; 
                testDb.innerHTML = post.text;
            }).catch (function (error){
                console.error ("Error del post:", error.code);
                    
            });
        }
        else{
            // TODO show message that post is empty
        }
    });
}


function handleSignedOutUser() {
    location.hash = "#login";
}

function createUser(email) {
let db = firebase.firestore();
    let usersRef = db.collection(USERS_COLLECTION);
    usersRef.doc(`user_${email}`).set({email: email});
}
