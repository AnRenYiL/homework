Post.destroy_all
Comment.destroy_all
User.destroy_all

NUM_POSTS = 50
NUM_USERS = 5
PASSWORD = "supersecret"

super_user = User.create(
  name: "Mao Li",
  email: "anrenyil@gmail.com",
  password: '123',
  is_admin: true
)
NUM_USERS.times do
  name = "#{Faker::Name.first_name}.#{Faker::Name.last_name}"
  User.create(
    name: name,
    email: "#{name}@example.com",
    password: PASSWORD,
    is_admin: false
  )
end

users = User.all

NUM_POSTS.times do
  created_at = Faker::Date.backward(days: 365 * 5)
  p = Post.create(
    title: Faker::Hacker.say_something_smart,
    body: Faker::ChuckNorris.fact,
    created_at: created_at,
    updated_at: created_at,
    user: users.sample
  )
  if p.valid?
    p.comments = rand(0..3).times.map do
      Comment.new(body: Faker::GreekPhilosophers.quote, user: users.sample)
    end
  end
end

posts = Post.all
comments = Comment.all

puts Cowsay.say("Generated #{posts.count} posts!", :frogs)
puts Cowsay.say("Generated #{comments.count} comments", :stegosaurus)
puts Cowsay.say("Generated #{users.count} users", :tux)
puts "Login with #{super_user.email} and password: #{PASSWORD}"