class SessionController < Devise::SessionsController
  def create
    super do |resource|

    end
  end
    
  def :destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))

    render: json: {
      csrfParam: request_forgery_protection_token,
      csrfToken: form_authenticity_token
    }
  end
end
