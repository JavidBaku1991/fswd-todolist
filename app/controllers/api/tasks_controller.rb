module Api
  class TasksController < ApplicationController
    before_action :validate_user

    def index
      user = User.find_by(id: params[:api_key])
      @tasks = user.tasks.order(created_at: :desc)
      render json: @tasks
    end

    def create
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.new(task_params)

      if @task.save
        render json: @task, status: :created
      else
        render json: { error: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])

      if @task&.destroy
        render json: { success: true }
      else
        render json: { error: 'Task not found' }, status: :not_found
      end
    end

    def update
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])

      if @task&.update(task_params)
        render json: @task
      else
        render json: { error: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_complete
      update_task_status(true)
    end

    def mark_active
      update_task_status(false)
    end

    private

    def task_params
      params.require(:task).permit(:content, :completed)
    end

    def validate_user
      user = User.find_by(id: params[:api_key])
      render json: { error: 'Unauthorized' }, status: :unauthorized unless user
    end

    def update_task_status(status)
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])

      if @task&.update(completed: status)
        render json: @task
      else
        render json: { error: 'Task not found or update failed' }, status: :unprocessable_entity
      end
    end
  end
end
