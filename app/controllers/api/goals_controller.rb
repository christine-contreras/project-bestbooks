class Api::GoalsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :set_goal, only: [:destroy, :show]

    def create 
        bookclub_book = BookclubBook.find(params[:bookclub_book_id])
        goal = bookclub_book.goals.create(goal_params)

        render json: goal, status: :created
    end

    def show
        goal = @goal
        render json: @goal
    end

    def update 
        goal = Goal.find(params[:id])
        goal.update(goal_params)
        
        render json: goal, status: :accepted
    end

    def destroy 
        @goal.destroy 
        head :no_content
    end


    private 

    def goal_params 
        params.permit(:id, :deadline, :notes, :meetingURL, :complete, :pages => [])
    end

    def set_goal 
        @goal = Goal.find(params[:id])
    end

    def render_not_found_response
        render json: { error: 'Goal Not Found' }, status: :not_found
    end
end
