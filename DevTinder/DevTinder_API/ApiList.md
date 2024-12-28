# DevTinder APIs

## authRouter

-   POST /signup
-   POST /login
-   POST /Logout

## profileRouler

-   GET /profile/view
-   PATCH /profile/edit
-   PATCH /profile/password

## connectionRequestRouter

-   POST /request/send/:status/:userId
-   POST /request/review/:status/:requestId

Status: `ignored`, `interested`, `accepted`, `rejected`

## userRouter

-   GET /user/requests/recieved
-   GET /user/connections
-   GET /user/feed - Gets you the profiles of other users on platform

## Pagination

-   `/user/feed?page=1&limit=10` => `1 to 10` => `skip(0)` & `limit(10)`
-   `/user/feed?page=2&limit=10` => `11 to 20` => `skip(10)` & `limit(10)`
-   `/user/feed?page=3&limit=10` => `21 to 30` => `skip(20)` & `limit(10)`
-   `/user/feed?page=4&limit=10` => `31 to 40` => `skip(30)` & `limit(10)`

-   **`page` = 1 & `limit` = 10**
-   **`skip` = `(page-1) * limit`**
