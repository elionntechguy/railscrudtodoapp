class TodosController < ApplicationController
    def index
        @todos = Todo.all
        render json: @todos
    end
    
    def create
        ptitle = params[:title]
        pcontent = params[:content]

        Todo.create(title: ptitle, content: pcontent)
    end

    def edit
        @todo = Todo.find(params[:id])
    end

    def todo_params
        params.permit(:title, :content)
    end

    def update
        @todo = Todo.find(params[:id])
        @todo.update(todo_params)
        head :no_content
    end

    def destroy
        @todo = Todo.find(params[:id])
        @todo.destroy

        head :no_content
    end
end


