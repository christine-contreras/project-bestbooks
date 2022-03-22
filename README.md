# Best Books | A Full Stack App

This app lets you create book clubs with your friends where you can track goals, create discussion questions, and comment on the discussion questions.

[demo here](https://project-bestbooks-client.herokuapp.com/)

## Backend and Front-end Interfaces

You can use this API alone: [see the repo](https://github.com/christine-contreras/best-books-api)

You can use this front-end app alone: [see the repo](https://github.com/christine-contreras/project-bestbooks-client)

## Technologies Used

Front-end

- JavaScript
- React
- Mui
- React Router
- Goodreads API

Backend

- Ruby on Rails
- ActiveRecord
- PostgreSQL
- Bcrypt
- Active Model Serializers

## How To Use

Install it and run:

```sh
bundle install

# create migrations with activerecord
rails db:migrate

# if you would like to use seed data
rails db:seed

# start server
rails s

npm install --prefix client

npm start --prefix client
```

RoR uses port 3000 by default. React app will open up on port 4000.

## Features

### App

- customize theme with Mui
- ability to add users and login
- persistent login using cookies
- ability to update user information and icon color
- ability to delete your own profile
- responsive design

### Book Clubs

- Create a book club
- Edit a book clubs info and users if you are the admin
- Delete a book club
- View all book clubs you are a part of
- View book club archived books, wishlist books, and currently reading book

### Books

- Search for books using the Goodreads API
- Search popular lists of books using the Goodreads API
- View books images, author, description, and genres
- Select a book and add it to a book clubs wishlist
- Move the book to wishlist, archived books, or currently reading

### Currently Reading

- Search for books using the Goodreads API
- Comment on guide questions if you are a part of the book club
- If you are an admin you can:
  - Edit the current books progress
  - Move book to completed and archived books
  - Create, edit, and delete goals
  - Create, edit, and delete guide questions
  - Create, edit, and delete all comments left

## Backend Relationships

```rb
                                                          :deadline
                                                          :pages
                                                          :priority
                                                          :complete
                                                          :notes
                                                          :meetingURL
                                                          :bookclub_book_id
                                                          Goal
                                                          V
                                                          |
User --------------< BookClubUser >---- BookClub ----< BookClubBook >-------- Book
:email               :user_id           :name          :bookclub_id           :imageURL
:password_digest     :bookclub_id                      :book_id               :title
:first_name          :isAdmin                          :archived              :series
:last_name                                             :status                :author
:location                                              :suggested_by          :description
:profile_color                                         :current               :pages
|                                                       |                     :publicationDate
|                                                       |                     :genres
|                                                       |
|                                                       |
|                                                       ^
  -------------------< Comment >----------------- GuideQuestion
                       :user_id                   :bookclub_book_id
                       :guide_question_id         :chapter
                       :comment                   :question

```

### Users

- has many book club users
- has many comments

### Book Club User (joint table)

- belongs to a user
- belongs to a book club

### Book Club

- has many book club users
- has many users through book club users
- has many book club books
- has many books through book club books

### Book Club Book (joint table)

- belongs to a book
- belongs to a book club
- Has many goals
- Has many guide questions

### Goal

- belongs to book club book

### Guide Question

- belongs to book club book
- has many comments

### Comments (joint table)

- belongs to a user
- belongs to a guide question

## Example Calls You Can Make With API

### Users and Sessions

You can make all CRUD calls for the users database and Create and Destroy calls or sessions

- CREATE users
- GET/RETRIEVE all users
- GET/RETRIEVE an individual user
- DELETE a user
- UPDATE a user
- CREATE a session
- DESTROY a session

routes

```rb
Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:index, :destroy, :update]
    post "/signup", to: "users#create"
    get "/me", to: "users#show"

    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end

end

```

#### Example: Retrieve A User

Shows you a user and all of the book clubs associated with the user

```js

fetch('/api/me').then((response) => {
    if (response.ok) {
    response.json().then((user) => {
        setUser(user)
    })
    } else {
    response.json().then((err) => console.log(err))
    }
})


// output
{
id: 1,
email: "email@yahoo.com",
first_name: "Christine",
last_name: "Contreras",
full_name: "Christine Contreras",
location: "",
profile_color: "#e91e63",
bookclubs: [
{
id: 1,
name: "Bookies",
admin: {
id: 1,
email: "email@yahoo.com",
first_name: "Christine",
last_name: "Contreras"
},
users: [
{
id: 1,
email: "email@yahoo.com",
first_name: "Christine",
last_name: "Contreras",
full_name: "Christine Contreras",
location: "",
profile_color: "#e91e63"
}
],
bookclub_books: [
{
id: 1,
book_id: 1,
bookclub_id: 1,
status: "In Progress",
archived: false,
current: true,
suggested_by: "Christine Contreras",
book: {
id: 1,
title: "Dune",
series: "(Dune #1)",
author: "Frank Herbert",
pages: 688,
description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...When House Atreides is betrayed, the destruction of Paul’s family will set the boy on a journey toward a destiny greater than he could ever have imagined. And as he evolves into the mysterious man known as Muad’Dib, he will bring to fruition humankind’s most ancient and unattainable dream.",
publicationDate: "October 1st 2019",
imageURL: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg",
genres: [
"Science Fiction",
"Fiction",
"Fantasy",
"Classics",
"Science Fiction Fantasy",
"Audiobook",
"Space > Space Opera",
"Adventure",
"Adult",
"Space"
]
},
goals: [
{
id: 1,
pages: [
"1",
"200"
],
deadline: "2021-12-04",
complete: false,
notes: "",
meetingURL: "#"
},
{
id: 2,
pages: [
"101",
"200"
],
deadline: "2021-12-25",
complete: false,
notes: "",
meetingURL: ""
}
],
guide_questions: [
{
id: 1,
chapter: 1,
question: "A lot of information and backstory is contained in the Appendices that follow the main novel. Do you feel some of this information should have been integrated into the text? Why or why not?",
comments: [ ]
}
]
},
{
id: 2,
book_id: 2,
bookclub_id: 1,
status: "Not Started",
archived: false,
current: false,
suggested_by: "Christine Contreras",
book: {
id: 2,
title: "Brain Rules: 12 Principles for Surviving and Thriving at Work, Home, and School",
series: null,
author: "John Medina",
pages: 301,
description: "Most of us have no idea what’s really going on inside our heads. Yet brain scientists have uncovered details every business leader, parent, and teacher should know—like the need for physical activity to get your brain working its best.How do we learn? What exactly do sleep and stress do to our brains? Why is multi-tasking a myth? Why is it so easy to forget—and so important to repeat new knowledge? Is it true that men and women have different brains?In Brain Rules, Dr. John Medina, a molecular biologist, shares his lifelong interest in how the brain sciences might influence the way we teach our children and the way we work. In each chapter, he describes a brain rule—what scientists know for sure about how our brains work—and then offers transformative ideas for our daily lives.Medina’s fascinating stories and infectious sense of humor breathe life into brain science. You’ll learn why Michael Jordan was no good at baseball. You’ll peer over a surgeon’s shoulder as he proves that most of us have a Jennifer Aniston neuron. You’ll meet a boy who has an amazing memory for music but can’t tie his own shoes.You will discover how:Every brain is wired differentlyExercise improves cognitionWe are designed to never stop learning and exploringMemories are volatileSleep is powerfully linked with the ability to learnVision trumps all of the other sensesStress changes the way we learnIn the end, you’ll understand how your brain really works—and how to get the most out of it.",
publicationDate: "February 26th 2008",
imageURL: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328763686l/2251306.jpg",
genres: [
"Nonfiction",
"Psychology",
"Science",
"Self Help",
"Education",
"Neuroscience > Brain",
"Business",
"Biology > Neuroscience",
"Self Help > Personal Development",
"Productivity"
]
},
goals: [ ],
guide_questions: [ ]
}
]
},
{
id: 2,
name: "The Best Book Club",
admin: {
id: 1,
email: "email@yahoo.com",
first_name: "Christine",
last_name: "Contreras"
},
users: [
{
id: 1,
email: "email@yahoo.com",
first_name: "Christine",
last_name: "Contreras",
full_name: "Christine Contreras",
location: "",
profile_color: "#e91e63"
}
],
bookclub_books: [ ]
}
```

### Book Clubs and Books

CRUD calls you can make for book clubs and books

- CREATE a book club
- GET/RETRIEVE all book clubs
- DELETE a book club
- UPDATE a book club
- Custom route to set current book

- SHOW and individual book
- CREATE a book
- DESTROY a book

- GET/RETRIEVE all book club books
- DESTROY a book club book
- UPDATE a book club book

routes

```rb
Rails.application.routes.draw do
  namespace :api do
    patch "/bookclubs/:id/current-book", to: "bookclubs#current_book"
    resources :bookclubs

    resources :books, only: [:show, :create, :destroy]

    resources :bookclub_books, only: [:index, :destroy, :update]
  end
end

```

### Example: Create a Book Club

```js
fetch('/api/bookclubs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
  }),
})
  .then((response) => response.json())
  .then((data) => {})
  .catch((err) => {})

// output
{
  bookclubs: [
    {
      id: 1,
      name: 'Bookies',
      admin: {
        id: 1,
        email: 'email@yahoo.com',
        first_name: 'Christine',
        last_name: 'Contreras',
      },
      users: [
        {
          id: 1,
          email: 'email@yahoo.com',
          first_name: 'Christine',
          last_name: 'Contreras',
          full_name: 'Christine Contreras',
          location: '',
          profile_color: '#e91e63',
        },
      ],
      bookclub_books: [],
    },
  ]
}
```

### Goals

You can make all CRUD calls for goals.

- CREATE goals
- GET/RETRIEVE all goals
- DELETE a goal
- UPDATE a goal

routes

```rb
Rails.application.routes.draw do
  namespace :api do
    resources :goals, only: [:show, :create, :update, :destroy]
  end
end
```

### Example: Update A Goal

```js
fetch(`/api/goals/${goal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((err) => {})

// output
{
id: 1,
pages: [
"1",
"200"
],
deadline: "2021-12-04",
complete: false,
notes: "",
meetingURL: "#"
}
```

### Guide Questions and Comments

- CREATE guide questions
- DELETE a guide question
- UPDATE a guide question

- CREATE comments
- DESTROY a comment

### Example: Create A Guide Question

```js
    fetch('/api/guide_questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      bookclub_book_id: bookClubBookId,
      chapter,
      question,
    }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((err) => {})

// output
{
id: 1,
chapter: 1,
question: "A lot of information and backstory is contained in the Appendices that follow the main novel. Do you feel some of this information should have been integrated into the text? Why or why not?",
comments: [ ]
}
```
