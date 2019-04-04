
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
        date : `${date}`,
        likes: 0
    };
}


function handleSignedInUser(firebaseUser) {
    location.hash = "#timeline";

    let userEmail = firebaseUser.email; 

    contentDiv.innerHTML = timelineTemplate();

    let db = firebase.firestore();

    

    let testDb= document.getElementById("all-posts");

    /////////CREATES POST/////////////
    document.getElementById("button-post").addEventListener("click", function () {
        let postText = document.getElementById("input-post").value;
        let postError = document.getElementById("post-error"); //section for error

        if (postText.length >0) {
            
            const post = CreatePost(userEmail, postText, true);

            db.collection(`${USERS_COLLECTION}/user_${userEmail}/myPosts/`).add(post)
            .then (function (docRef){
                location.reload();
                //testDb.innerHTML= docRef.id; 
                //testDb.innerHTML = post.text;
            }).catch (function (error){
                console.error ("Error del post:", error.code);
                    
            });
        }
        else{
            if (postText == "") {
                postError.innerHTML = "La publicación no puede estar vacía."
            }
            // TODO show message that post is empty

        }

    });
    /////////end of CREATES POST/////////////


    ///////SHOW POSTS FROM USER>//////
    db.collection(`${USERS_COLLECTION}/user_${userEmail}/myPosts/`).get().then( function (collect) {
        
        //console.log (Object.values(collect.docs));

        let userPosts = collect.docs.map(function (p) {
           return p.data(); 
        });

        let allPostSection = document.getElementById("all-posts");
        //allPostSection.innerHTML = "<div>";

        for (let index = 0; index < userPosts.length; index++) {
            const postElement = userPosts[index];
            //console.log(postElement); //postElement es el OBJETO DE LOS POSTS DEL USUARIO LOGUEADO
            // var obj = {
            //   first: "John",
            //   last: "Doe"
            // };

            //
            //  Visit non-inherited enumerable keys
            //
            for (const prop in postElement) {
              let postFinally = `${prop} : ${postElement[prop]}<br>`;
              console.log(typeof(postFinally));
              allPostSection.innerHTML += `${postFinally}<br><br>`;
            }

            // let postFromUser = Object.keys(postElement).forEach((key) => {

            //   console.log(key, postElement[key]);

            // });

            
            /**
             * domPost = generatePostTempl(postText);
             */

            //allPostSection.innerHTML = postsArr;
        }
        

     
    }).catch(
        function (error) {
            console.log(error);
        }
    );
    //////////END OF SHOW POSTS FROM USER///////
}


function handleSignedOutUser() {
    location.hash = "#login";
}

function createUser(email) {
let db = firebase.firestore();
    let usersRef = db.collection(USERS_COLLECTION);
    usersRef.doc(`user_${email}`).set({email: email});
}
