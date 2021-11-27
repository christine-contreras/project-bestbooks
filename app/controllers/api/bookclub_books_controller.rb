class Api::BookclubBooksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        render json: BookclubBook.all
    end

    private 

    def render_not_found_response
        render json: { error: 'Book Club Book Not Found' }, status: :not_found
    end
end
