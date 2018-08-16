# Kargo Takip Sistemi
YTU - Mathematical Engineering **1st Internship Project - MTM2002**.

### Used Packages
Written using [**ReactJS**](https://reactjs.org/), [**NodeJS**](https://nodejs.org/en/), [**ExpressJS**](https://expressjs.com/) and [**MongoDB**](https://www.mongodb.com/). Front-end *React* w/ [MDBootstrap](https://mdbootstrap.com/react/), [ReduxJS](https://redux.js.org/), HTML5, CSS3 (I've used *CSS Modules*, so every component in this project has it's own unique classes for themselves). Back-end *Node*, *Express*, *Mongo*. I have also used lots of different packages to help me out in the API routes. Like [MongooseJS](http://mongoosejs.com/) for database connections, queries, and for User and Kargo schemas. [PassportJS](http://www.passportjs.org/) for Authentication handling. [BcryptJS](https://github.com/dcodeIO/bcrypt.js) for hashing the password. [JSONWebToken](https://github.com/auth0/node-jsonwebtoken) for privating the routes, handling the login with Redux.

### Installation
There's two ways to run this code. But before, you have to install some dependencies. Download and install [NodeJS](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/) and if you are going to use the second way, you have to install [Yarn](https://yarnpkg.com/en/) too. (I'm not going to explain how to install these as they're irrelevant. Just make sure you close & reopen your cmd after installing these, before using any code below.)

**1:**
Open two command prompts, and run the code below on one of them:
```javascript
npm install
nodemon server.js
```
On the other one, run this code
```javascript
cd client
npm install
npm start
```

**2:**
Or just open one command prompt, and run this:
```javascript
npm install
cd client
npm install
cd..
yarn dev
```

### Details
//TODO

### Project
**Front-end Structure** // *./client
- Index
- Hakkimizda
- Iletisim
- Hizmetlerimiz
- Kargo Takip
  - Without any KargoId
  - With KargoId
  - With KargoId and Logged in
- **Kargo Liste** (Private route. Have/has to be logged in)
- **Kargo Ekle** (Private route. Have/has to be logged in)

![Front-end Structure](https://github.com/ayberktandogan/MTM2002---Project1---Kargo_Takip/blob/master/photos/frontendstructure.png?raw=true)
 
 **Back-end Structure** // ./
 - Models
   - Kargo
   - User
 - Routes
   - API
     - kargo
     - users
 - Validation
   - kargo
   - login
   - register
   
![Back-end Structure](https://github.com/ayberktandogan/MTM2002---Project1---Kargo_Takip/blob/master/photos/backendstructure.png?raw=true)
