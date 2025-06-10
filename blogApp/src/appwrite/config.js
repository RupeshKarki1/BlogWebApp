/* eslint-disable no-useless-catch */
import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

//created classes for reusable blueprint of service
export class Service{
    client = new Client(); //instantiated client as obj to use down
    databases;
    bucket;

    constructor(){
        //configured client endpoint and projectId
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //For CRUD operation function below are similar
    async createPost({title, slug, content, featuredImage, status, userId}){ //slug for id
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title,content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                title,
                content,
                featuredImage,
                status   
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error;   
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries){
        
    }
}

const service = new Service()
export default service

