import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
  me {
    _id
    email
    password
    username
    posts {
      _id
      createdAt
      postText
      username
      tags
      comments {
        commentId
        commentText
        createdAt
        username
      }
    }
  }
}
`;
export const QUERY_POSTS = gql`
	query Posts {
  posts {
    _id
    postText
    username
    createdAt
    comments {
      commentId
      commentText
      createdAt
      username
    }
    tags
  }
}
`;
