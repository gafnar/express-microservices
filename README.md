# Express microservices

* microservicios
* express
* Amazon S3
* javascript ES6
* Docker
* Swagger

## Configuration

To run the user microservices, you need to declare the next environments variables:

```sh
TOKEN_SIGNATURE #SIGNATURE FOR JWT
HOST_MAIL #NAME OF YOUR MAIL HOST Example: smtp.gmail.com
USER_MAIL #YOUR MAIL
PASS_MAIL #YOUR PASSWORD MAIL
```

Now the filesystem microservices:

```sh
S3_KEY #KEY OF YOUR S3
S3_SECRET #SECRET KEY OF YOUR S3
S3_BUCKET #NAME BUCKET OF YOUR S3
```
# Start
To run the application
```bash
cp .env.example .env
docker-compose up
```
# Start test

```bash
npm run test
```

# Usage

An example call:
http://localhost:8080/docs

* User register

```bash
curl -X POST \
  http://localhost:8080/user \
  -d '{
	"name": "Jorge",
	"email": "jorge@gmail.com",
	"password": "******"
}'
```

Once

* File retrieve

```bash
curl -X GET \
  http://localhost:8080/file/key \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFtYXJ0aW5leiIsImVtYWlsIjoiYWxlamFuZHJvLm1hcnRpbmV6QHl1ZG9ucGF5LmNvbSIsImVuYWJsZWQiOnRydWUsInJvbCI6InVzZXIiLCJpYXQiOjE1NTQ0NTIzMTYsImV4cCI6MTU1NDUzODcxNn0.Hfc-Q77v40KAfY0I-f-4Qf4YAb2j-0DHZidrY_0kR4o'
```
