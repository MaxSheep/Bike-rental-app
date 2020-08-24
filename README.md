# Bike rental app

### 1. Project purpose:
This is a web application, that can be used to rent a bike or put yours up for rent.

### 2. System and software requirements that must be installed manually:
- Node.JS (https://nodejs.org/en/)
- PostgreSQL (https://www.postgresql.org/)

### 3. Setup & Build:
- Load PostgreSQL dump file located in "~/Bike-rental-app/dumps".

> Example on how to load dump using DBeaver:
> 1. Create a new PostgreSQL connection.
> 2. Connect to your newly created connection.
> 3. Select the database were you want to import dump.
> 4. Select `Tools` than `Data import`.
> 5. Click the folder icon and navigate to where this project located, in "*~/Bike-rental-app/dumps*" select the dump that starts with "*dump-mydb...*".
> 6. Select `Start` on the bottom right.

- Install the required dependencies by using the command `npm i`.

- To build the project you need to replace in a "*config.js*" file, properties values with your node server and postgreSQL data.

- After that you can open the terminal in the location "*~/Bike-rental-app*"
and use the command `npm run dev`.
