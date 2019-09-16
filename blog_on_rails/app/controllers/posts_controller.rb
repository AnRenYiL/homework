class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]
  before_action :autheticate_user!, only: [:new]
  def new
    @post = Post.new
    render :new
  end

  def create
    @post = Post.new post_params
    @post.user = current_user
    if @post.save
      flash[:notice] = "Post created successfully"
      redirect_to post_path(@post)
    else
      render :new
    end
  end

  def update
    if @post.update post_params
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy
    flash[:notice] = "Post destroyed!"
    @post.destroy
    redirect_to posts_path
  end

  def index
    @posts = Post.all
  end

  def show
    @comment  = Comment.new
    @comments = @post.comments.order(created_at: :desc)
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :price)
  end

  def find_post
    @post = Post.find(params[:id])
  end
end
