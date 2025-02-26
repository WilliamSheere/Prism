import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        email
        savedBooks {
        bookId
        title
        description
        #authors
        image
        link
        #VIDEO
      }
    }
  }
`;
