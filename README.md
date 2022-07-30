# Mediashare

## Running the Mediashare App and API

**Prerequisites:**
You will need to have Node.js, npm, yarn, and Docker installed locally

There are two applications in this project.
- /apps/mediashare - The phone app
- /apps/mediashare-api - The API for the phone app
- /apps/media-support - The web for invitation from app.

To run the project locally, you will need to start both of them. You will also have to start the database.

To run the project against staging environment, just start the phone app.


### Running the Phone App in iOS Simulator

To run the phone app, open a terminal window and navigate to `./apps/mediashare`.
Then run the following commands:
```shell
  yarn install # If you haven't already
  yarn app:ios:install-pods
```

if you're previously built this app, you may find that Pod install is failing. In this case run:
```shell
  yarn app:ios:refresh-pods
```

Now run this to start the Phone App in iOS Simulator:
```shell
  yarn run:ios:prod
```

### Running the Phone App against a locally running API

First, you'll need to get a database up and running. If you have docker installed, simply run `yarn compose:db && yarn seed:users` in a terminal window pointed at the project root.

Next, you'll need to start the API server. Run the following command `npm install`.
Now start the API server: `npm run api:start` or `npm run api:debug`.

To run the phone app, navigate to `./apps/mediashare`.
Then run the following commands:
```shell
  yarn install # If you haven't already
  yarn app:ios:install-pods
```

if you're previously built this app, you may find that Pod install is failing. In this case run:
```shell
  yarn app:ios:refresh-pods
```

Now run this to start the Phone App in iOS Simulator:
```shell
  yarn run:ios:local
```

## Code-generation

To seed the database make sure you have docker databases running. Then run `npm start seed:users`

This will seed with a small set of data, and 3 users. admin@example.~~c~~om, user@example.com, guest@example.com each in their appropriate role.

The password is 'welcome1' but you can change that and the email config there.

## Generate client API library 

This generates a client in the mediashare application.

Run `npm run gen:api-client`


## Running the Web support
To run the web, open a terminal window and navigate to `./apps/media-support`.
Then run the following commands:
``` shell
  yarn install # If you haven't already
  yarn dev
```