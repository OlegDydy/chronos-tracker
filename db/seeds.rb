# frozen_string_literal: true



w = Worker.new name: 'First Worker', email: 'user1@example.com', password: 'password',
               password_confirmation: 'password'
w.skip_confirmation!
w.save!

c = Customer.new name: 'First Customer', email: 'user2@example.com', password: 'password',
                 password_confirmation: 'password'
c.skip_confirmation!
c.save!
