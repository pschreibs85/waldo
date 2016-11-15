This code assumes that node is globally installed. For more information check out:

https://nodejs.org/en/download/

1) Install dependencies

```
npm install
```

2) Run main.js

```
node main.js
```
This will get the S3 data and insert it into a local SQL database

3) Open sqlite Command Line Shell

```
sqlite3 db/waldo.sqlite
```
User can now query SQL data

