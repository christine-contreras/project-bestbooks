class Api::GuideQuestionsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :set_question, only: [:destroy, :show]

    def create 
        bookclub_book = BookclubBook.find(params[:bookclub_book_id])
        question = bookclub_book.guide_questions.create(question_params)
        render json: question, status: :created
    end

    def show
        question = @question
        render json: question
    end

    def update 
        question = GuideQuestion.find(params[:id])
        question.update(question_params)
        
        render json: question, status: :accepted
    end

    def destroy 
        @question.destroy 
        head :no_content
    end


    private 

    def question_params 
        params.permit(:chapter, :question)
    end

    def set_question 
        @question = GuideQuestion.find(params[:id])
    end

    def render_not_found_response
        render json: { error: 'Guide Question Not Found' }, status: :not_found
    end
end
