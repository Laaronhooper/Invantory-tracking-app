class DrinksController < ApplicationController
    before_action :authenticate_user, except: [:index]
    before_action :set_drink, only: [:update,:destroy]


    # Get all Drinks
    def index
        @drinks = Drink.all
        
        if @drinks.length >= 1
            render json: @drinks
        else
            render json: {error: "No drink in database"}, status: 404
        end
    end

    def show
        @drink = Drink.find_by_name(params[:name])
        if @drink
            render json: @drink
        else
            render json: {error: "Drink not found"}, status:404
        end
    end

    def create
        @drink = current_user.drinks.create(drink_params)
        if @drink.save
            render json:{message: "Successfully Created", data:@drink}, status: 201
        else
            render json: { error: @drink.errors.full_messages[0]}, status: 500
        end
    end

    def update
        @drink = Drink.find_by_id(params[:id])

        if @drink.update(drink_params)
            render json:{message: "Successfully Updated", data:@drink}, status: 200
        else
            render json: {error: @drink.errors.full_messages[0]}, status: 500
        end
    end

    # DELETE /drinks/1
    def destroy
        if @drink.destroy
            render json: { message: "Successfully deleted"}, status: 200
        else
            render json: { error: "Unauthorised to Delete."}, status: 401
        end
      end

    private
     def drink_params
        params.require(:drink).permit(:id,:name,:alcohol_amount,:alcohol_id,:mixer_amount,:mixer_id,:user_id,:number_sold)
     end

     def set_drink
        begin
            @drink=Drink.find(params[:id])
        rescue
            render json: {error: "Drink not found"}, status: 404
            
        end

     end

end
