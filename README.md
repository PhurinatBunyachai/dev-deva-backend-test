# Instruction

1.  Clone Project

```
 git clone https://github.com/PhurinatBunyachai/dev-deva-backend-test.git
```

2.  Install Dependencies

```
 npm install
```

3.  Create .env file

```
 echo "DB_HOST=localhost"\\n"DB_USER=root"\\n"DB_PASSWORD="\\n"DB_NAME=dev_deva_db"\\n"PORT=3000" > .env       
```

4.  Run Project

```
 npm run dev
```

5.  Create Users Table

```
 http://localhost:3000/migrate
```

## API Route
- GET api/users
    - http://localhost:3000/api/users
- GET api/users/:nameSurname
    - http://localhost:3000/api/users/:nameSurname
- POST api/users
    - http://localhost:3000/api/users
- PUT api/users/:id
    - http://localhost:3000/api/users/:id
- DELETE api/users/:id
    - http://localhost:3000/api/users/:id

