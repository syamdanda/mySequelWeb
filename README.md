What is MySequel Web
=================

MySequel Web is an open source web based GUI tool to access your MySql/Postgresql database.
It is similar to PHP My Admin of WAMP. Here you can access any MySql/Postgresql database with proper connection strings.
We do not save or store any of your connection strings or data. Every thing related to your connection strings are volatile. You can host this as a simple nodeJs application on any server or you can simply run this in your local.

Demo
=================
You can access https://mysqlweb.herokuapp.com/ for live demo. <br/>
To run the application in your machine, Run the app.js file from your cmd prompt<br />
     
     mySequelWeb>node app.js
Then navigate to http://localhost:1234 url by opening your favorite browser.<br /><br />
      <img src="/screenshots/1.PNG" alt="img 1"/>
      <br/><br/>
  Except autoconnection field all are mandatory. Please provide your conection string details and click on Access Database<br />
  You will get connected with the MySql database and you can see the list tables available in that database.<br /><br />
    <img src="/screenshots/3.PNG" alt="img 2"/> <br/><br/>
  Write queries in the query editor and click on execute button, your query results will appear in the results grid.<br /><br />
    <img src="/screenshots/2.PNG" alt="img 3"/> <br/><br/>

Current Version
=================
Current version is <b>pre-alpha</b>
This version has basic features like <br/>
<ul>
  <li>Connecting with MySql/Postgresql Database</li>
  <li>Displaying list of tables</li>
  <li>Displaying table information on table name click</li>
  <li>executing all Select, update, Insert and Delete queries including joins</li>
</ul>
<br/>

Upcoming Version
=================
<b>Alpha</b>  release contains below features. <br/>
<ul>
  <li>In-line edit/update on retrieved records</li>
  <li>adding query snippets for Insert, Update, Select and Delete queries</li>
  <li>Making the grid as fully responsive</li>
  <li>Planning to convert this as electron app, to make it work like stand-alone app</li>
</ul>

Notes
=================
If you found any issues, feel free to create issues and you are also welcome to contribute to this project.
If you like this repo and find it useful, please consider ★ starring it (on top right of the page) and forking it :)
