class Api::BookclubUsersController < ApplicationController

    def create 
        bookclub_user = BookclubUser.create(bookclub_users_params)
        render json: bookclub_user, status: :created
    end

    def destroy
        bookclub_user = BookclubUser.find(params[:id])
        bookclub_user.destroy 
        head :no_content
    end

    def update 
        bookclub_user = BookclubUser.find(params[:id])
        bookclub_user.update(bookclub_users_params)
        render json: bookclub_user, status: :accepted
    end

    private 

    def bookclub_users_params
        params.permit(:user_id, :bookclub_id, :isAdmin)
    end
end
