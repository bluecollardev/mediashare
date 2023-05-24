# Mediashare

## Running the Mediashare App and API

**Prerequisites:**
You will need to have Node.js, npm, yarn, and Docker installed locally

**Important**
There are two repositories for this project.
- https://github.com/bluecollardev/mediashare-app - The phone app
- https://github.com/bluecollardev/mediashare - The API for the phone app

First, you'll need to get a database up and running. If you have docker installed, simply run `yarn compose:db && yarn seed:users` in a terminal window pointed at the project root.

Next, you'll need to start the API server. Run the following command `npm install`.
Now start the API server: `npm run api:start` or `npm run api:debug`.

## Code-generation

To seed the database make sure you have docker databases running. Then run `npm start seed:users`

This will seed with a small set of data, and 3 users. admin@example.~~c~~om, user@example.com, guest@example.com each in their appropriate role.

The password is 'welcome1' but you can change that and the email config there.

## Generate client API library

This generates a client in the mediashare application.

Run `npm run gen:api-client`

## Running the Web support

// TODO: Remove this!

To run the web, open a terminal window and navigate to `./apps/media-support`.
Then run the following commands:

```shell
  yarn install # If you haven't already
  yarn dev
```
