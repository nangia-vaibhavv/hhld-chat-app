<img width="646" alt="image" src="https://github.com/user-attachments/assets/109f9f13-21cc-4594-97c7-336c23fa54c8" />

Docker Commands:

1. docker build -t hhld/chat-be:latest .
2. docker build -t hhld/chat-auth-be:latest .
3. docker build -t hhld/chat-client:latest .


Run these to containers

1. dokcer run -p 8085:8080 hhld/chat-be:latest -> backend (here inside container code runs on 8080, when need from postman call 8085)
2. dokcer run -p 8086:8081 hhld/chat-auth-be:latest ->auth backend
3. docker run -p 3001:3000 hhld/chat-client:latest

   
