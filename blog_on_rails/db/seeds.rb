Post.destroy_all

NUM_POSTS = 50

NUM_POSTS.times do
  created_at = Faker::Date.backward(days: 365 * 5)
  Post.create(
    title: Faker::Hacker.say_something_smart,
    body: Faker::ChuckNorris.fact,
    created_at: created_at,
    updated_at: created_at
  )
end

posts = Post.all.order(created_at: :asc)

puts "Generated #{posts.count} posts"