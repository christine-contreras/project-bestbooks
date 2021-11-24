class Api::BookclubsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        bookclubs = Bookclub.all 
        render json: bookclubs
    end

    def show 
        bookclub = Bookclub.find(params[:id])
        render json: bookclub
    end

    def create 
        user = @current_user
        bookclub = user.bookclubs.create(bookclub_params)
        bookclub_user = user.bookclub_users.find_by(bookclub_id: bookclub.id)
        bookclub_user.isAdmin = true
        bookclub_user.save
        render json: bookclub, status: :created

    end

    private 

    def bookclub_params
        params.permit(:name)
    end

    def render_not_found_response
        render json: { error: 'Book Club Not Found' }, status: :not_found
    end


end
