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

export const ADD_USER = gql` 
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const ADD_POST = gql`
	mutation AddPost($username: String!, $postText: String!) {
		addPost(username: $username, postText: $postText) {
			_id
			createdAt
			postText
			username
		}
	}
`;
export const DELETE_POST = gql`
	mutation DeletePost($postId: ID!) {
		deletePost(postId: $postId) {
			_id
		}
	}
`;


export const ADD_COMMENT = gql`
	mutation AddComment($postId: ID!, $commentText: String!) {
		addComment(postId: $postId, commentText: $commentText) {
			_id
			username
		}
	}
`;

export const DELETE_COMMENT = gql`
	mutation DeleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			_id
			username
		}
	}
`;
