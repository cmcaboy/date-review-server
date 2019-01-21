const typeDefs = `
    type Query {
        person(id: ID): Person
        review(id: ID): Review
        comment(id: ID): Comment
        findUsers(username: String, firstName: String, lastName: String): [Person]
        findReviews(userId: ID): [Review]
        findComments(reviewId: ID): [Comment]
        findAllPlatforms: [Platform]
        platform(id: ID!): Platform
        findPhoto(id: ID!): Photo
        findPhotos(userId: ID): [Photo]
        findAllPhotos: [Photo]
    }

    type Person {
        id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        age: Int
        datetime: Float
        reviews: [Review]
        isActive: Boolean
        photos: [Photo]
        platform: Platform
        authoredReviews: [Review]
        comments: [Comment]
    }

    type Review {
        id: ID
        title: String
        description: String
        rating: Int
        datetime: Float
        author: Person
        comments: [Comment]
        person: Person
    }

    type Comment {
        id: ID
        author: Person
        text: String
        datetime: Float
        review: Review
    }

    type Photo {
        id: ID
        url: String
        person: Person
    }

    type Platform {
        id: ID
        name: String
        description: String
        persons: [Person]
    }

    type Mutation {
        newUser(
            username: String!,
            firstName: String,
            lastName: String,
            age: Int,
            email: String,
            instagramId: String,
            platform: ID,
            photos: [String]
            ): Person
        newReview(
            title: String!,
            description: String,
            rating: Int,
            personId: ID,
            authorId: ID
        ): Review
        newComment(
            text: String!,
            authorId: ID,
            reviewId: ID!
        ): Comment
        newPlatform(
            name: String!
            description: String
        ): Platform
        editUser(
            id: ID!
            username: String,
            firstName: String,
            lastName: String,
            age: Int,
            email: String,
            instagramId: String,
            platform: ID,
            photos: [String]
        ): Person
        editReview(
            id: ID!
            title: String,
            description: String,
            rating: Int,
            userId: Int
        ): Review
        editComment(
            id: ID!
            text: String!
        ): Comment
        deleteUser(id: ID!): Boolean
        deleteReview(id: ID!): Boolean
        deleteComment(id: ID!): Boolean
        deletePhoto(id: ID!): Boolean
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

export default typeDefs;
