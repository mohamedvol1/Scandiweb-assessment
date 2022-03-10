<?php

namespace app\config;

use PDO;
use PDOException;


// mysql://bd7f57fdebb2c6:65a367ab@us-cdbr-east-05.cleardb.net/heroku_5b0cc9fbcfcb86c?reconnect=true

class Database
{

  private $cleardb_url;
  private $host;
  private $username;
  private $password;
  private $dbName;
  private $active_group;
  private $query_builder;

  // hosted database config
  public function __construct()
  {
    $this->cleardb_url = parse_url(getenv("CLEARDB_DATABASE_URL"));
    $this->host = $this->cleardb_url["host"];
    $this->username = $this->cleardb_url["user"];
    $this->password = $this->cleardb_url["pass"];
    $this->dbName = substr($this->cleardb_url["path"], 1);
    $this->active_group = 'default';
    $this->query_builder = TRUE;
  }


  // local database config
  // private $host = 'localhost';
  // private $dbName = 'products_crud_app';
  // private $username = 'root';
  // private $password = '';
  private $conn;

  public function connection()
  {
    $this->conn = null;
    try {
      $this->conn = new PDO(
        'mysql:host=' . $this->host . ';dbname=' . $this->dbName,
        $this->username,
        $this->password
      );
      $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
      echo 'Connection Error: ' . $e->getMessage();
    }

    return $this->conn;
  }

  public function testconnection()
  {
    $q = 'select * from products';
    $stmt = $this->conn->prepare($q);
    $stmt->execute();

    return $stmt;
  }
}
