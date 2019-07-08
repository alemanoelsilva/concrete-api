FORMAT: 1A

# Users

This is API for manipulation of Users

## User Collection [/api/signup]

### User Sign Up [POST]

- Request

  - Attributes (object)

    - name (string) - User name
    - email (string) - User e-mail
    - password (srray) - User password
    - phones (string) - User phones

  - Body

          {
              "email": "email@gmail.com",
              "password": "jndkejndkejndkejn",
              "phones": [
                  {
                      "number": 123123,
                      "ddd": 33
                  },
                  {
                      "number": 123123,
                      "ddd": 23
                  }
              ],
          }

- Response 201

  - Attributes (object)

    - id (string) - User id
    - name (string) - User name
    - email (string) - User email
    - password (string) - User password
    - phones (array) - User phones array
    - createdAt (string) - User creation date
    - updatedAt (string) - User updation date
    - lastLogin (string) - User last login
    - token (string) - User token

  - Body

          {
            "id": "19e0f4b8-a28e-4f2a-be25-1f3fc47ddb17",
            "email": "email@gmail.com",
            "password": "e0164271adb0e8fbc41239ebc6dddf0bd9b9ae7ad4904e77ff2ea67acd433791",
            "phones": [
              {
                "number": 123123,
                "ddd": 33
              },
              {
                "number": 123123,
                "ddd": 23
              }
            ],
            "createdAt": "July 5th 2019, 7:08:30 pm",
            "updatedAt": "July 7th 2019, 4:45:01 pm",
            "lastLogin": "July 7th 2019, 4:45:01 pm",
            "token": "419d1c0f-cd8a-47ea-a9ea-2665043189e7"
          }

## User Collection [/api/signin]

### User Login [POST]

- Request

  - Attributes (object)
    - email (string) - User e-mail
    - password (string) - User password

- Response 200

  - Attributes (object)

    - id (string) - User id
    - name (string) - User name
    - email (string) - User email
    - password (string) - User password
    - phones (array) - User phones array
    - createdAt (string) - User creation date
    - updatedAt (string) - User updation date
    - lastLogin (string) - User last login
    - token (string) - User token

  - Body

          {
            "id": "19e0f4b8-a28e-4f2a-be25-1f3fc47ddb17",
            "email": "email@gmail.com",
            "password": "e0164271adb0e8fbc41239ebc6dddf0bd9b9ae7ad4904e77ff2ea67acd433791",
            "phones": [
              {
                "number": 123123,
                "ddd": 33
              },
              {
                "number": 123123,
                "ddd": 23
              }
            ],
            "createdAt": "July 5th 2019, 7:08:30 pm",
            "updatedAt": "July 7th 2019, 4:45:01 pm",
            "lastLogin": "July 7th 2019, 4:45:01 pm",
            "token": "419d1c0f-cd8a-47ea-a9ea-2665043189e7"
          }

## User Collection [/api/users/{id}]

### User Search [GET]

- Request

  - Headers

    - bearer (string) - User access token

  - Parameters
    - id (string) - User id UUID string

- Response 200

  - Attributes (object)

    - id (string) - User id
    - name (string) - User name
    - email (string) - User email
    - password (string) - User password
    - phones (array) - User phones array
    - createdAt (string) - User creation date
    - updatedAt (string) - User updation date
    - lastLogin (string) - User last login
    - token (string) - User token

  - Body
    
          {
            "id": "19e0f4b8-a28e-4f2a-be25-1f3fc47ddb17",
            "email": "email@gmail.com",
            "password": "e0164271adb0e8fbc41239ebc6dddf0bd9b9ae7ad4904e77ff2ea67acd433791",
            "phones": [
              {
                "number": 123123,
                "ddd": 33
              },
              {
                "number": 123123,
                "ddd": 23
              }
            ],
            "createdAt": "July 5th 2019, 7:08:30 pm",
            "updatedAt": "July 7th 2019, 4:45:01 pm",
            "lastLogin": "July 7th 2019, 4:45:01 pm",
            "token": "419d1c0f-cd8a-47ea-a9ea-2665043189e7"
          }
