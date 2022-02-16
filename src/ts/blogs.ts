import { Blog } from "./models/Blog";
import { Post } from "./models/Post";

let allBlogs: Blog[] = JSON.parse(localStorage.getItem("allBlogs")) || [];
let allPosts: Post[] = JSON.parse(localStorage.getItem("allPosts")) || [];

window.onload = function(){
    chooseBlog();
    displayBlogPosts();

    document.getElementById("blogMenu").addEventListener("change", ()=>{
        displayBlogPosts();
    });
}

function chooseBlog(){
    let blogList:HTMLSelectElement = document.getElementById("blogMenu") as HTMLSelectElement;
        blogList.classList.add("mb-3");
        blogList.classList.add("form-select");

        for (let i = 0; i < allBlogs.length; i++) {
            let option:HTMLOptionElement = document.createElement("option");
            option.setAttribute("value", (i + 1).toString());
            option.innerHTML = allBlogs[i].blogName;
            blogList.appendChild(option);
        }
}

function displayBlogPosts(){
    let dropDown = document.getElementById("blogMenu") as HTMLSelectElement;
    let blogPost:HTMLDivElement = document.getElementById("blogPost") as HTMLDivElement;
    blogPost.innerHTML = "";

    for (let i = 0; i < allPosts.length; i++) {
        if (parseInt(dropDown.value) === allPosts[i].blogId) {
            let postDiv:HTMLDivElement = document.createElement("div");
            let postHeading:HTMLHeadingElement = document.createElement("h3");
            let postText:HTMLParagraphElement = document.createElement("p");

            postHeading.innerHTML = allPosts[i].title;
            postText.innerHTML = allPosts[i].postText;

            postDiv.appendChild(postHeading);
            postDiv.appendChild(postText);
            blogPost.appendChild(postDiv);
        }
    }
}