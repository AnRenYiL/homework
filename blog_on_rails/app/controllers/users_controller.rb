class UsersController < ApplicationController
    before_action :autheticate_user!, only: [:edit]
    before_action :change_your_own_account, only: [:edit, :update]
    before_action :get_user, only: [:edit, :update, :show_change_password, :change_password]
    def new
        @user = User.new
    end

    def create
        @user = User.new user_params
        if @user.save
            session[:user_id] = @user.id
            redirect_to root_path
        else
            render :new
        end
    end

    def edit
    end
    
    def update
        if @user.update user_params
          redirect_to root_path
        else
          render :edit
        end
    end
    
    def show_change_password
        render :change_password
    end
    
    def change_password
        
        if @user&.authenticate(params[:user][:current_password])
            if params[:user][:current_password] == params[:user][:password]
                @user.errors.add(:current_password, "The new password should be different with the current password")
            end
            if params[:user][:password] != params[:user][:password_confirmation]
                @user.errors.add(:password, "The new password and the password confirmation should be same")
            end
            if (!@user.errors.any?) && (@user.update user_params)
                flash[:success] = "Password updated"
                redirect_to root_path
            else
                render 'users/change_password'
            end
        else
            flash[:danger] = "You've entered the right current password"
            redirect_to request.referrer    
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:name,:email,:password,:password_confirmation)
    end

    def change_your_own_account
        redirect_to root_path, alert: 'Not Authorized' unless can?(:crud, current_user)
    end
    
    def get_user
        @user = current_user
    end
end
