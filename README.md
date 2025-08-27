
# Bramhveda Eats Restaurant
## Using an AI agent for reservation management 

To setup this project clone the project repository into a directory
The project structure is as follows:

```
~ /brahmveda
    |- client
    |- server
```

The client directory contains the code for the fronted client.
Similarly, the server directory contains the code for the backend server.

To setup, we need to run both the servers.

### For frontend

Move into client directory and create a .env file with following contents

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```
Install depencies with 

```
npm i
```
Start the server with

```
npm run start
```

### For backend


Move into server directory and create a .env file with following contents

```
NODE_ENV=development
PORT=5000
OPENAI_SECRET_KEY=<SECRET_KEY>
```
Install depencies with 

```
npm i
```
Start the server with

```
npm run start
```