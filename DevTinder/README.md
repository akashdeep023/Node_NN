# DevTinder

## Create a platform DevTinder to meet developers.

> ### REQUIREMENTS
>
> **Project Manage, Designer**

**_Basic requirements_**

1. Create an Account
2. Login to the DevTinder
3. Update your Profile
4. Feed Page - Explore
5. Send connection Request/Ignore
6. See our Matches
7. See the request we've Sent/Received etc.

**_And Designing_**

> ### DESIGN / TECH PLANNING
>
> **Senior Engineer, Engineering Manager**

**_HLD (High Level Design)_**

Use 2 `MicroService` to develop DevTinder (Senior Engineer)

1. Frontend - React.js
2. Backend - Node.js, MongoDB

**_LLD (Low Level Design)_**

1. DB Design

    - Create collection
        - User (firstName, lastName, emailId, password, imageUrl, age, gender, etc...)
        - ConnectionRequest (fromUserId, toUserId, status, etc...)

2. API Design

    - REST API (Representational State Transfer Application)

        - It's a set of rules and guidelines for building web APIs that allows software to communicate with each other over a network or on the same device.
        - They use HTTP methods to retrieve and post data between a client device and a server.
        - get, post, put, patch, delete

    - CRUD Operations
        - POST `/signup`
        - POST `/login`
        - GET `/profile`
        - POST `/profile`
        - PATCH `/profile`
        - DELETE `/profile`
        - POST `/sendRequest` (ignored, interested)
        - POST `/reviewRequest` (accepted, rejected)
        - GET `/requests`
        - POST `/connections`

> ### DEVELOPMENT
>
> **SDE1, SDE2 - Software Development Engineer**

**_Backend Develope_**

-   Creating our Express server

**_Frontend Develope_**
