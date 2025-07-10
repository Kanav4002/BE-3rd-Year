// API

// Web application includes Frontend, Backend, Database.
// Frontend will send request to Backend.
// Data is stored in Database.
// Data is fetched from Database and sent to Backend.
// Backend will process the request and send the response to Frontend.
// For one request, we only have a one response.
// This is the web architecture.

// To create API there is 2 criteria:
// Type of request (GET, POST, PUT, PATCH, DELETE)
// Path ("/", "/users", "/all/users", ...)
// eg: 
// app.get("/users")
// app.post("/users")
// app.put("/users")
// app.delete("/users")
// All are different API.

// 1. get : To get data from backend. (fastest response)
// 2. post : To send data to backend. (Secure way [body])
// 3. put : To update data in backend. 
// 4. patch : To update partial data in backend.
// 5. delete : TO delete a data in backend.

// both req and res are objects.
// req : body, headers, QueryParams, Params, frontend url, user 1P
// body and headers are secure.
// QueryParams and Params are visible in url.

// res : send, status, json, SendFile,
// send : sends message 
// status : sends number
// json : send data in form of objects.