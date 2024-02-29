# apollo-graphql

## query example

```graphql
query Query($userId: ID!, $genre: String!) {
  user(id: $userId) {
    name
    age
    nationality
    friends {
      name
    }
    favoriteMovies(genre: $genre) {
      title
      genre
      release_date
      rating
    }
  }
}
```

```graphql
{
  "userId": 3,
  "genre": "Action"
}
```

## mutation example

```graphql
mutation Mutation($input: CreateUserInput!) {
  createUser(input: $input) {
    name
  }
}
```

```graphql
{
  "input": {
    "name" : "constantine",
    "username" : "john",
    "age" : 21
  }
}

```
