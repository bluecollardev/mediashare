### Binary Import and Export Tools

Replace PASSWORD with the password for the admin user and DATABASE with the name of the database you wish to import/export to your cluster.

mongodump | creates a binary export of the contents of a database

Mediashare `mongodump --uri mongodb+srv://<USER>:<PASSWORD>@cluster0.8x36b.mongodb.net/<DATABASE>`
PocketPhysio `mongodump --uri mongodb+srv://<USER>>:<PASSWORD>@cluster0.nureuqr.mongodb.net/<DATABASE>`

mongorestore | creates a new database or adds data to an existing database. By default, mongorestore reads the database dump in the dump/ sub-directory of the current directory; to restore from a different directory, pass in the path to the directory as a final argument.

`mongorestore --drop --uri mongodb+srv://<USER>:<PASSWORD>@cluster0.8x36b.mongodb.net`
