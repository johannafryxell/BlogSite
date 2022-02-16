import { Post } from "./Post";

export class Blog{
    id:number;
    personName:string;
    blogName:string;
    blogPosts:Post[];

    constructor(personName:string, blogName:string, id:number){
        this.id = id;
        this.personName = personName;
        this.blogName = blogName;
        this.blogPosts = [];
    }
}