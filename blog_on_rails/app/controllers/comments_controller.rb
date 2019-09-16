class CommentsController < ApplicationController
    def create
        @post = Post.find(params[:post_id])
        @comment = Comment.new comment_params
        @comment.post = @post
        if @comment.save
            # redirect_to post_path(@post)
        else
        @comments = @post.comments.order(created_at: :desc)
        render 'posts/show'
        end    
    end
    def destroy
        @post = Post.find(params[:post_id])
        @comment = Comment.find(params[:id])
        @comment.destroy
        redirect_to post_path(@post), notice: 'Comment Deleted'
    end
    
    private

    def comment_params
        params.require(:comment).permit(:body, :rating)
    end
end
