<a name='top'></a>

# Rest Sample Project:
This is a sample project. I used Node.js, ES7, Express, MongoDB and mongoose. Its a simple backend server shows how to setup a Express server.
In this project, we have a very simple  shop. You can create an product or order something.

**Note :** This is a dev project, not a production version.

# Developer Note:
Quick Index:
- [Before Start](#before-start) 
- [How to Run](#how-to-run) 
- [How to Clean](#how-to-clean) 
- [Health Check](#health-check) 
- [How to Use](#how-to-use) 
- [Models](#models) 
- [API definition](#api-definition) 
- [To Do](#to-do) 

<a name='before-start'></a>


## Before Start:                      
- Please create a JSON file in the root folder and name it `nodemon.json`. 

**Note :** It will be used to store the environment variable during dev mode. In production, you need to set them in another way.

- Copy and past below JSON object to `nodemon.json` file: 
```
{
  "env": {
    "MONGO_USER": "<your mongodb username in mongoDB Atlas>",
    "MONGO_PASSWORD": "<your mongodb password in mongoDB Atlas>",
    "MONGO_DB": "rest-sample-db",
    "PORT": 4000,
    "SECRET_KEY": "SuperSaltySecretKey"
  }
}
```

- Update fields in JSON file

[Go 2 Top ^](#top)

<a name='how-to-run'></a>

## How to Run:
In the root folder, in command prompt, run:

- npm install
- npm start

**Note :** You can find Port number in your console output.

[Go 2 Top ^](#top)

<a name='how-to-clean'></a>

## How to Clean:
In the root folder, in command prompt, run:

- npm run clean

**Note :** It works only on MacOS, the windows version would be available soon.

[Go 2 Top ^](#top)

<a name='health-check'></a>

## Health Check:
- Send a GET request to `/health-check` 
- You should be able to get the message: "Server is up & running" in respond.
- You are Good 2 GOoOo

[Go 2 Top ^](#top)

<a name='how-to-use'></a>

## How to Use:

- Create user
- Login with user and get token
- Set token in header (Bearer Token)
- Send your request to the server 
- Cheers

**Note:** You don't need to Authenticate for all routes. You can find more details in [API Definition](#api-definition). 

[Go 2 Top ^](#top)

<a name='models'></a>

## Models:
- Order:
```
product
quantity
createdAt
updatedAt
```

- Product:
```
name
price
productImage
```

- User:
```
email
password
```
**Note :** The email should have a valid email format.

[Go 2 Top ^](#top)

<a name='api-definition'></a>

## API Definition:
- /user/signup
```
Action: POST
Authentication: Not required
Body: 
{
  email: "baher.hedayati@gmail.com",
  password: "MagicSecretPassword"
}
Success Respond: 
{
  statusCode: 201,
  message: "Succeed!",
  data: {
    user: {
      ...savedUser._doc
    }
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /user/login
```
Action: POST
Authentication: Not required
Body: 
{
  email: "baher.hedayati@gmail.com",
  password: "MagicSecretPassword"
}
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    token,
    tokenExpiration: 1
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /products
```
Action: GET
Authentication: Not required
Body: None
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    products
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /products
```
Action: POST
Authentication: Required
Body: 
{
  name: "New Product",
  price: 12.99,
  productImage: upload an Image here
}
Success Respond: 
{
  statusCode: 201,
  message: "Succeed!",
  data: {
    product
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /products/:id
```
Action: GET
Authentication: Not required
Body: None
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    product
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /products/:id
```
Action: PATCH
Authentication: Required
Body: 
{
  name: "Updated Name if You Want",
  price: 10.89
}
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    updated
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```
**Note :** You don't have to update all fields.

- /products/:id
```
Action: DELETE
Authentication: Required
Body: None
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    product
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /orders
```
Action: GET
Authentication: Required
Body: None
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    orders
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /orders
```
Action: POST
Authentication: Required
Body:
{
  productId: 2475f6589,
  quantity: 23
}
Success Respond: 
{
  statusCode: 201,
  message: "Succeed!",
  data: {
    order
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```
**Note :** The default `quantity` is 1.

- /orders/:id
```
Action: GET
Authentication: Required
Body: None
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    order
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}
```

- /orders/:id
```
Action: DELETE
Authentication: Required
Body: None
Success Respond: 
{
  statusCode: 200,
  message: "Succeed!",
  data: {
    order
  }
}
Failure Respond:
{
  statusCode: Xx,
  message: "Failed!",
  data: {
    error
  }
}

[Go 2 Top ^](#top)

<a name='queries'></a>


<a name='to-do'></a>

## To Do:
- Put related db hits in a Transaction
- Make sure each user can only see his own order
- Make sure each user can only delete his own order

[Go 2 Top ^](#top)