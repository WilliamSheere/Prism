// import models
import { User, Post } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";
interface AddUserArgs {
	input: {
		username: string;
		email: string;
		password: string;
	};
}

interface LoginUserArgs {
	email: string;
	password: string;
}

interface UserArgs {
	username: string;
}
interface PostArgs {
	postId: string;
}

interface AddPostArgs {
	postText: string;
	username: string;
}

interface AddCommentArgs {
	postId: string;
	commentText: string;
}

interface DeleteCommentArgs {
	postId: string;
	commentId: string;
}
const resolvers = {
	Query: {
		users: async () => {
			return User.find();
		},
		user: async (_parent: any, { username }: UserArgs) => {
			return User.findOne({ username });
		},
		me: async (_parent: any, _args: any, context: any) => {
			// If the user is authenticated, find and return the user's information along with their thoughts
			if (context.user) {
				return User.findOne({ _id: context.user._id }).populate("posts");
			}
			// If the user is not authenticated, throw an AuthenticationError
			throw new AuthenticationError("Could not authenticate user.");
		},
	},
	Mutation: {
		addUser: async (_parent: any, { input }: AddUserArgs) => {
			// Create a new user with the provided username, email, and password
			const user = await User.create({ ...input });

			// Sign a token with the user's information
			const token = signToken(user.username, user.email, user._id);

			// Return the token and the user
			return { token, user };
		},

		login: async (_parent: any, { email, password }: LoginUserArgs) => {
			// Find a user with the provided email
			const user = await User.findOne({ email });

			// If no user is found, throw an AuthenticationError
			if (!user) {
				throw new AuthenticationError("Could not authenticate user.");
			}

			// Check if the provided password is correct
			const correctPw = await user.isCorrectPassword(password);

			// If the password is incorrect, throw an AuthenticationError
			if (!correctPw) {
				throw new AuthenticationError("Could not authenticate user.");
			}

			// Sign a token with the user's information
			const token = signToken(user.username, user.email, user._id);

			// Return the token and the user
			return { token, user };
		},
		addPost: async (
			_parent: any,
			{ postText, username }: AddPostArgs,
			context: any
		) => {
			if (context.user) {
				const post = await Post.create({ postText, username });

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { posts: post._id } }
				);

				return post;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		addComment: async (
			_parent: any,
			{ postId, commentText }: AddCommentArgs,
			context: any
		) => {
			if (context.user) {
				return Post.findOneAndUpdate(
					{ _id: postId },
					{
						$addToSet: {
							comments: { commentText, username: context.user.username },
						},
					},
					{
						new: true,
						runValidators: true,
					}
				);
			}
			throw AuthenticationError;
		},
		deletePost: async (_parent: any, { postId }: PostArgs, context: any) => {
			if (context.user) {
				const post = await Post.findOneAndDelete({
					_id: postId,
					username: context.user.username,
				});

				if (!post) {
					throw AuthenticationError;
				}

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { posts: post._id } }
				);

				return post;
			}
			throw AuthenticationError;
		},
		deleteComment: async (
			_parent: any,
			{ postId, commentId }: DeleteCommentArgs,
			context: any
		) => {
			if (context.user) {
				return Post.findOneAndUpdate(
					{ _id: postId },
					{
						$pull: {
							comments: {
								commentId: commentId,
							},
						},
					},
					{ new: true }
				);
			}
			throw AuthenticationError;
		},
	},
};

export default resolvers;
