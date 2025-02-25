import { Schema, Types, model, type Document } from "mongoose";

interface IPost extends Document {
	postText: string;
	createdAt: Schema.Types.Date;
	username: string;
	comments?: [typeof commentSchema] | []

}
interface IComment extends Document {
	commentId: Schema.Types.ObjectId;
	commentText: string;
	username: string;
	createdAt: Schema.Types.Date;
}
const commentSchema = new Schema<IComment>({
	commentId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	commentText: {
		type: String,
		required: true,
		maxlength: 50,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const postSchema = new Schema<IPost>(
	{
		postText: {
			type: String,
			minlength: 1,
			maxlength: 50,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		comments: [commentSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
		timestamps: true,
	}
);

const Post = model<IPost>("Post", postSchema);

export default Post;
