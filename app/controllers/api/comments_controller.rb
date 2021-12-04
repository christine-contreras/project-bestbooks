class Api::CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def create 
        comment = Comment.create(comment_params)
        render json: comment, status: :created
    end

    def destroy 
        comment = Comment.find(params[:id])
        comment.destroy 
        head :no_content
    end


    private 

    def comment_params 
        params.permit(:comment, :user_id, :guide_question_id)
    end

    def render_not_found_response
        render json: { error: 'Comment Not Found' }, status: :not_found
    end
end
