const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
  }


  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Post {
    _id: ID
    postText: String
    username: String
    createdAt: String
    comments: [Comment]
    tags: [String]
  }

  type Comment {
    commentId: ID
    commentText: String
    createdAt: String
    username: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    posts: [Post]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addPost(username: String!, postText: String!, tags: [String]): Post
    addComment(postId: ID!, commentText: String!): Post
    deletePost(postId: ID!): Post
    deleteComment(postId: ID!, commentId: ID!): Post
  }
`;

export default typeDefs;
