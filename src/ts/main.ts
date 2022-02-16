import { Blog } from "./models/Blog"
import { Post } from "./models/Post";

let allBlogs: Blog[] = JSON.parse(localStorage.getItem("allBlogs")) || [];
let allPosts: Post[] = JSON.parse(localStorage.getItem("allPosts")) || [];

window.onload = function(){
    displayBlogs();
    createPostForm();
    displayPosts();

    document.getElementById("createButton").addEventListener("click", createBlog)
    document.getElementById("blogHeading").addEventListener("click", ()=>{
        if (allBlogs.length != 0) {
            location.href = "http://localhost:1234/pages/blogs.html";
        }
    });
}

function displayBlogs(){
    if(allBlogs.length === 0){
        let infoText:HTMLSpanElement = document.createElement("span");
        infoText.innerHTML = "There are no blogs to display";
        document.getElementById("blogList").appendChild(infoText);
    }else{
        let listedBlogs:HTMLUListElement = document.createElement("ul");

        for (let i = 0; i < allBlogs.length; i++) {
            
            let listedBlog:HTMLLIElement = document.createElement("li");
            listedBlog.innerHTML = allBlogs[i].blogName;
    
            listedBlogs.appendChild(listedBlog);
            document.getElementById("blogList").appendChild(listedBlogs);
            
        }
    }
}

function displayPosts(){
    if (allPosts.length === 0) {
        let infoText:HTMLSpanElement = document.createElement("span");
        infoText.innerHTML = "There are no published posts";
        document.getElementById("postList").appendChild(infoText);
    }else{
        let documentWrapper:HTMLDivElement = document.getElementById("postedPosts") as HTMLDivElement;
        documentWrapper.innerHTML = "";
        let listedPosts:HTMLUListElement = document.createElement("ul");
        let printPosts:number;

        if (allPosts.length >= 5) {
            printPosts = 5;
        }else{
            printPosts = allPosts.length;
        }

        for (let i = 0; i < printPosts; i++) {
            
            let listedBlog:HTMLLIElement = document.createElement("li");
            listedBlog.innerHTML = allPosts[i].title;
    
            listedPosts.appendChild(listedBlog);
            
        }
        documentWrapper.appendChild(listedPosts);
    }
}

function createPostForm(){
    if (allBlogs.length === 0) {
        let infoText:HTMLHeadingElement = document.createElement("h3");
        infoText.innerHTML = "Create a blog to write a blogpost";
        document.getElementById("post-wrapper").appendChild(infoText);
    }else{
        let postForm:HTMLFormElement = document.createElement("form");
        postForm.id = "postForm";

        let titleDiv:HTMLDivElement = document.createElement("div");
        titleDiv.className = "mb-3";
        let titleLabel:HTMLLabelElement = document.createElement("label");
        titleLabel.className = "form-label";
        titleLabel.setAttribute("for","titleInput");
        titleLabel.innerHTML = "Title";
        titleDiv.appendChild(titleLabel);
        let titleInput:HTMLInputElement = document.createElement("input");
        titleInput.id = "titleInput";
        titleInput.setAttribute("type", "text");
        titleInput.className = "form-control";
        titleDiv.appendChild(titleInput);

        postForm.appendChild(titleDiv);
        
        let postDiv:HTMLDivElement = document.createElement("div");
        postDiv.className = "mb-3";
        let postLabel:HTMLLabelElement = document.createElement("label");
        postLabel.className = "form-label";
        postLabel.setAttribute("for", "postInput");
        postLabel.innerHTML = "Write your blogpost here:";
        postDiv.appendChild(postLabel);
        let postInput:HTMLTextAreaElement = document.createElement("textarea");
        postInput.id = "postInput";
        postInput.setAttribute("type", "text");
        postInput.className = "form-control";
        postDiv.appendChild(postInput);
        postForm.appendChild(postDiv);

        let selectBlog:HTMLSelectElement = document.createElement("select");
        selectBlog.classList.add("mb-3");
        selectBlog.classList.add("form-select");
        selectBlog.id = "dropDown";
        for (let i = 0; i < allBlogs.length; i++) {
            let option:HTMLOptionElement = document.createElement("option");
            option.setAttribute("value", (i + 1).toString());
            option.innerHTML = allBlogs[i].blogName;
            selectBlog.appendChild(option);
        }
        postForm.appendChild(selectBlog);

        let postButton:HTMLButtonElement = document.createElement("button");
        postButton.setAttribute("type", "submit");
        postButton.innerHTML = "Publish"
        postButton.id = "publishButton";
        postButton.classList.add("btn");
        postButton.classList.add("btn-primary");
        postButton.addEventListener("click", createPost);

        postForm.appendChild(postButton);

        document.getElementById("post-wrapper").appendChild(postForm);
        //document.getElementById("publishButton").addEventListener("click", createPost);
    }
}

function createBlog(){
    let inputName = document.getElementById("personName") as HTMLInputElement;
    let inputBlog = document.getElementById("blogName") as HTMLInputElement;

    if (inputName.value === "" || inputBlog.value === "") {
        alert("You need to write in the inputs");
    }else{
        let newId = allBlogs.length+1;

        let newBlog = new Blog(inputName.value, inputBlog.value, newId);
        allBlogs.push(newBlog);        
        localStorage.setItem("allBlogs", JSON.stringify(allBlogs));
    }
}

function createPost(){
    let inputTitle = document.getElementById("titleInput") as HTMLInputElement;
    let inputText = document.getElementById("postInput") as HTMLInputElement;
    let dropDown = document.getElementById("dropDown") as HTMLSelectElement;

    if (inputTitle.value === "" || inputText.value === "") {
        alert("You need to write in the inputs");
    }else{
        let newPost = new Post(inputTitle.value, inputText.value, parseInt(dropDown.value));
        allPosts.push(newPost);
        localStorage.setItem("allPosts", JSON.stringify(allPosts));      
    }
}