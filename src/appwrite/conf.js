import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
    }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Error creating post:", error);
            return false;
        }
    }

    // Update Post
    async updatePost({
        slug,
        title,
        content,
        featuredImage,
        status,
    }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Error updating post:", error);
            return false;
        }
    }

    // Delete Post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );

            return true;
        } catch (error) {
            console.log("Error deleting post:", error);
            return false;
        }
    }

    // Get Single Post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Error fetching post:", error);
            return false;
        }
    }

    // Get All Posts
    async getAllPosts(
        queries = [Query.equal("status", "active")]
    ) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Error fetching all posts:", error);
            return false;
        }
    }

    // File Upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Error uploading file:", error);
            return false;
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );

            return true;
        } catch (error) {
            console.log("Error deleting file:", error);
            return false;
        }
    }

    // Get File Preview
    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Error getting file preview:", error);
            return false;
        }
    }
}

const service = new Service();

export default service;
