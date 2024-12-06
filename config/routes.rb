Rails.application.routes.draw do
  # Root route for the application
  root 'static_pages#index'

  # Namespace for API routes
  namespace :api do  
    resources :users, only: [:create]

    resources :tasks, only: [:index, :create, :show, :update, :destroy] do
      member do
        patch :mark_complete
        patch :mark_active
      end
    end
  end

  # Redirect undefined routes to root (for SPA fallback)
  get '*path', to: redirect('/')
end
