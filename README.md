# tcp intermediary project
This is a testing project where I will experiment with 
using intermediary servers between cleint-server connections.

I am motivated on this project to learn more about how I can 
protect a server using an intermediary to my main server.
Mostly just out of curiosity, but also becasue I wish to 
start implementing them into other projects in the future.

Generally each inividual sub project will have its own 
depedencies, but now (at the time of ititialization), I 
plan to make these in JavaScript with Node.js. But, to ensure 
that I dont have to do more work later, I will initialize 
Node.js (or another runtime enviornment) individually for 
each sub project.

# individual sub-projects
tcp-authentication
  - Token based authentication project to protect against 
  unwanted direct client to server connections.
