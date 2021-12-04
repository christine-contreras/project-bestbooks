class Api::BooksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :set_book, only: [:show, :update, :destroy]

    def create 
        book = Book.create(book_params)

        bookclub_book = book.bookclub_books.create(bookclub_book_params)
        bookclub_book.archived = false
        bookclub_book.current = false
        bookclub_book.suggested_by = "#{@current_user.first_name} #{@current_user.last_name}"
        bookclub_book.save

        render json: book, status: :created
    end

    def show 
        book = @book
        render json: book
    end

    def destroy 
        @book.destroy
        head :no_content
    end

   



    private 

    def book_params
        params.permit(:title, :series, :author, :pages, :description, :publicationDate, :imageURL, :genres => [])
    end

    def bookclub_book_params
        params.permit(:bookclub_id, :status, :archived, :current)
    end

    def set_book
        @book = Book.find(params[:id])
    end

    def render_not_found_response
        render json: { error: 'Book Not Found' }, status: :not_found
    end
end
