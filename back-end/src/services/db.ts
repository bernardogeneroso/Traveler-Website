import mysql from "mysql";

import mysqlConnectionData from "../mysql.json";

const conn = mysql.createConnection(mysqlConnectionData);

export default conn;
