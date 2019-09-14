# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    
    if user.is_admin?
      can :manage, :all
    end

    alias_action :create, :read, :edit, :update, :destroy, to: :crud

    can :crud, Post do |post|
      post.user == user
    end

    can :crud, Comment,Post do |comment, post|
      comment.user == user || post.user == user
    end

    can :crud, User do |current_user|
      current_user == user
    end
  end
end
