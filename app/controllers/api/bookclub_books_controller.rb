class Api::BookclubBooksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        render json: BookclubBook.all
    end

    def destroy 
        bookclub_book = BookclubBook.find(params[:id])
        bookclub_book.destroy
        head :no_content
    end

    def update
        bookclub_book = BookclubBook.find(params[:id])
        bookclub_book.update(bookclub_book_params)

        render json: bookclub_book, status: :accepted
    end

    

    private 

    def bookclub_book_params 
        params.permit(:bookclub_id, :book_id, :archived, :status, :current, :suggested_by)
    end

    def render_not_found_response
        render json: { error: 'Book Club Book Not Found' }, status: :not_found
    end
end
