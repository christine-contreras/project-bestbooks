Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  namespace :api do
    resources :users, only: [:index, :destroy, :update]
    post "/signup", to: "users#create"
    get "/me", to: "users#show"

    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    resources :bookclubs
    patch "/bookclubs/:id/current-book", to: "bookclubs#current_book"

    resources :books, only: [:show, :create, :destroy]
    

    resources :bookclub_books, only: [:index, :destroy, :update]
    
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
