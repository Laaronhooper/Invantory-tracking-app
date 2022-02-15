class MixersController < ApplicationController
    before_action :authenticate_user, except: [:index]
    before_action :set_mixer, only: [:update,:destroy]

    # Get all Mixers
    def index
        @mixers = Mixer.all
        
        if @mixers.length >= 1
            render json: @mixers
        else
            render json: {error: "No mixer in database"}, status: 404
        end
    end

    def show
        @mixer = Mixer.find_by_name(params[:name])
        if @mixer
            render json: @mixer
        else
            render json: {error: "Mixer not found"}, status:404
        end
    end

    def create
        @mixer = current_user.mixers.create(mixer_params)

        if @mixer.save
            render json:{message: "Successfully Created", data:@mixer}, status: 201
        else
            render json: {error: @mixer.errors.full_messages[0]}, status: 500
        end
    end

    def update
        @mixer = Mixer.find_by_id(params[:id])


        if @mixer.update(mixer_params)
            render json: {message: "Successfully Updated",data:@mixer}, status: 200
        else
            render json: {error: @mixer.errors.full_messages[0]}, status: 500
        end

    end

    def destroy
        if  @mixer.destroy
            render json: { message: "Successfully deleted"}, status: 200
        else
            render json: { error: "Unauthorised to Delete."}, status: 401
        end
    end

    private
     def mixer_params
        params.require(:mixer).permit(:name,:volume_in_ml,:critical_volume,:user_id)
     end

     def set_mixer
        begin
            @mixer=Mixer.find(params[:id])
        rescue
            render json: {error: "Mixer not found"}, status: 404
            
        end

     end

end
