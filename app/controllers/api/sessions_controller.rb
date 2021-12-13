class Api::SessionsController < ApplicationController
    skip_before_action :authorize, only: :create

    def create 
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user, include: ['bookclubs', 'bookclubs.users', 'bookclubs.bookclub_books', 'bookclubs.bookclub_books.book', 'bookclubs.bookclub_books.goals', 'bookclubs.bookclub_books.guide_questions', 'bookclubs.bookclub_books.guide_questions.comments'], status: :created
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    def destroy 
        session.delete :user_id 
        head :no_content
    end
end
