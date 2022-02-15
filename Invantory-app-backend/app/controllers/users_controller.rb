class UsersController < ApplicationController

  wrap_parameters false


  # Get All Users
  def index
    @users = User.all

    if @users.length > 1
      render json: @users
    else
      render json: {error: "No users in the database"}, status: 404
    end
  end

  # View a specific User Account
  def show

    @user = User.find_by_username(params[:username])

    if @user
    render json: @user
    else
      render json: {error: "User not found"}, status:404
    end

  end

  # Updating a specific User Account

  def update
    @user = User.find_by_id(params[:id])

    if @user.update(user_params)
    render json: {message: "Successfully Updated",data:@user}, status: 200
    else
      render json: {error: @user.errors.full_messages[0]}, status: 500
    end

  end

  # Deleting a User Account

  def destroy
    @user = User.find_by_id(params[:id])
    @user.delete
    render json: 204

  end

  # Create User with Knock and bcrypt JWT token
  def create
    @user = User.create(user_params)
    
    if @user.save
      render json: {message:"User Added", data: @user}, status: :created
    else
      render json: { error: @user.errors.full_messages[0]}, status: 500
    end
  end

  # Sign in with Knock and bcrypt JWT token
  def sign_in
    @user = User.find_by_username(params[:username])

    if @user && @user.authenticate(params[:password]) && @user.is_active === true
      auth_token = Knock::AuthToken.new payload: {sub: @user.id}
      render json: {username: @user.username, jwt: auth_token.token, admin: @user.admin, user_id: @user.id}, status: 200
    else
      render json: {error: "Invalid Login Details"}, status: 404
    end

  end


  private

  # User Account params
  def user_params
    params.permit(:user,:id,:username,:password,:password_confirmation,:admin,:is_active)
  end

  

end
