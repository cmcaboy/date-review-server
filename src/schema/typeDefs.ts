const typeDefs = `
    scalar Date

    type Query {
        person(id: ID): Person
        review(id: ID!): Review
        comment(id: ID!): Comment
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
        instagramId: String
        createDate: Date
        reviews: [Review]
        isActive: Boolean
        profilePic: Photo
        photos: [Photo]
        platform: Platform
        authoredReviews: [Review]
        comments: [Comment]
        averageRating: Float
        numRatings: Int
    }

    type Review {
        id: ID
        title: String
        description: String
        rating: Int
        updateDateTime: Date
        author: Person
        comments: [Comment]
        person: Person
    }

    type Comment {
        id: ID
        author: Person
        text: String
        updateDateTime: Date
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
            rating: Int!,
            personId: ID,
            authorId: ID
        ): Review
        newUserAndReview(
            username: String!,
            firstName: String,
            lastName: String,
            age: Int,
            email: String,
            instagramId: String,
            platform: ID,
            photos: [String],
            title: String!,
            description: String,
            rating: Int!,
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
            userId: ID
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
