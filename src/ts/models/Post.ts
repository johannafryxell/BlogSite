export class Post{
    title:string;
    postText:string;
    blogId:number;

    constructor(title:string, postText:string, blogId:number){
        this.title = title;
        this.postText = postText;
        this.blogId = blogId;
    }
}