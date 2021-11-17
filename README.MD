## Trello   
forlder server:
installation
1. clone to your disc git clone
2. cd into server folder
3. run `npm install`
4. added .env file 
    here is the example:
    
    <pre>PORT=7001
    
     DB_CONNECTION=mysql
     DB_HOST=localhost
     DB_PORT=3306
     DB_DATABASE=trello
     DB_USERNAME=root
     DB_PASSWORD=4562586879Nick)
    </pre>
4. run `npm run dev`
## Client
installation and run
1. cd to cliient folder
2. run `npm install`
3. add .env file 
    <br>here is example:
    <pre>
        REACT_APP_API_URL="http://localhost:7001/api/tickets"
    </pre>
    <br>this is API's url
 3. run `npm run start`
 
## DataBase
 in root of the project folder there is trello.sql file. import it into your mysqlServer.
 
## Link to Trello
http://trello.terekhin-development.com 
