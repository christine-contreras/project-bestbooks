class Api::BookclubsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :set_bookclub, only: [:show, :destroy]
    skip_before_action :authorize, only: [:index, :show]

    def index 
        bookclubs = Bookclub.all 
        render json: bookclubs, status: :ok
    end

    def show 
        bookclub = @bookclub
        render json: bookclub, include:  ['users', 'bookclub_books', 'bookclub_books.book', 'bookclub_books.goals', 'bookclub_books.guide_questions', 'bookclub_books.guide_questions.comments'], status: :ok
    end

    def create 
        user = @current_user
        bookclub = user.bookclubs.create(bookclub_params)
        bookclub_user = user.bookclub_users.find_by(bookclub_id: bookclub.id)
        bookclub_user.isAdmin = true
        bookclub_user.save
        
        render json: bookclub, include:  ['users', 'bookclub_books', 'bookclub_books.book', 'bookclub_books.goals', 'bookclub_books.guide_questions', 'bookclub_books.guide_questions.comments'], status: :created

    end

    def destroy 
        @bookclub.destroy
        head :no_content
    end

    def update 
        bookclub = Bookclub.find(params[:id])
        bookclub.update(bookclub_params)

        #check if admin is changed
        admin_bookclub_user = bookclub.bookclub_users.find {|user| user.isAdmin == true }
        admin_id = admin_bookclub_user.user_id

        if params[:admin_id] != admin_id
            admin_bookclub_user.update(isAdmin: false)
            new_admin_bookclub_user = bookclub.bookclub_users.find_by(user_id: params[:admin_id])
            new_admin_bookclub_user.update(isAdmin: true)
        end


        
        # delete users if needed
        if !params[:delete_users].empty?
            users = params[:delete_users].each do |user_id|
                bookclub_user = bookclub.bookclub_users.find_by(user_id: user_id)
                bookclub_user.destroy
            end
        end

        # add users if needed
        if !params[:add_users].empty?
            params[:add_users].each do |user_id|
                bookclub.bookclub_users.create(user_id: user_id, isAdmin: false)
            end
        end

        render json: bookclub, include: ['users', 'bookclub_books', 'bookclub_books.book', 'bookclub_books.goals', 'bookclub_books.guide_questions', 'bookclub_books.guide_questions.comments'], status: :accepted
    end


    def current_book
        bookclub = Bookclub.find(params[:id])
        new_current_book = bookclub.bookclub_books.find(params[:new_bookclub_book_id])
        old_current_book = bookclub.bookclub_books.find_by(current: true)

        if old_current_book
            old_current_book.update(current: false, archived: true)
        end

        new_current_book.update(current: true)
        
        render json: bookclub, include: ['users', 'bookclub_books', 'bookclub_books.book', 'bookclub_books.goals', 'bookclub_books.guide_questions', 'bookclub_books.guide_questions.comments'], status: :accepted
    end

    private 

    def bookclub_params
        params.permit(:name)
    end

    def set_bookclub 
        @bookclub = Bookclub.find(params[:id])
    end

    def render_not_found_response
        render json: { error: 'Book Club Not Found' }, status: :not_found
    end


end
