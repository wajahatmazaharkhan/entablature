import mongoose, { Schema } from "mongoose";

export interface IBlogView {
  blog: mongoose.Types.ObjectId;
  viewedAt: Date;
}

const blogViewSchema = new Schema<IBlogView>({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
    index: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

const BlogView = mongoose.model<IBlogView>("BlogView", blogViewSchema);

export default BlogView;