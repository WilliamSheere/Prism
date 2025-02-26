import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const ADD_USER = gql` 
//   mutation Mutation($input: UserInput!) {
//   addUser(input: $input) {
//     user {
//       username
//       _id
//     }
//     token
//   }
// }
// `;

export const ADD_BOOK = gql` #<ADD_POST
	mutation AddBook($book: BookInput!) {
		addBook(book: $book) {
			_id
			username
			savedBooks {
				bookId
				title
				description
			}
		}
	}
`;
export const DELETE_BOOK = gql` #<DELETE_POST
	mutation DeleteBook($bookId: String!) {
		deleteBook(bookId: $bookId) {
			_id
			username
			savedBooks {
				bookId
				description
				title
			}
		}
	}
`;
