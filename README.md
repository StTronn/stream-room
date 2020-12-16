# Stream Rooms

Create movie & tv show rooms and enjoy watching together with your friends. 

![pic1](pic2.jpg "room")

![pic1](pic3.jpg "room")

Built using MERN stack and [MovieDb API](https://developers.themoviedb.org/3/)

## Setup Locally 

create .env file in client folder
```
REACT_APP_MOVIEDB_URL = https://api.themoviedb.org/3
REACT_APP_SERVER_URL = http://localhost:8000
REACT_APP_MOVIEDB_KEY = //your KEY
```

create .env file in server 
```
JWT_SECRET = // your secret 
JWT_EXPIRE = 1d
DB_PASSWORD =  // atlas user password
PORT = 8000
GOOGLE_CLIENT_ID = //your google client id 
GOOGLE_CLIENT_SECRET = //your google client secret
```

`server2/models/index.js`

replace `const mongoConnectionURL = `

