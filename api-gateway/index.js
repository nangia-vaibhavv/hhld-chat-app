import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port =8083


const routes = {
    "/api/users": "http://localhost:8081/users",
    "/api/auth": "http://localhost:8081/auth",
    "/api/msg": "http://localhost:8080/msg"
}

for(const route in routes) {
    const target = routes[route];
    app.use(route, createProxyMiddleware({
        target,
        changeOrigin: true,
      }))
}
app.listen((port), () => {
    console.log("server is up and running on port", port)
})