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
