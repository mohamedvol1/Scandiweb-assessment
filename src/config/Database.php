<?php

namespace app\config;

use PDO;
use PDOException;
use Dotenv\Dotenv;

// $dotenv = Dotenv::createImmutable(__DIR__ .  DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..');
// $dotenv->load();

class Database
{
  private $conn;

  private $host;
  private $username;
  private $password;
  private $dbName;
  // hosted database config
  public function __construct()
  {
    $this->host = $_ENV['HOST'];
    $this->username = $_ENV['USERNAME'];
    $this->password = $_ENV['PASSWORD'];
    $this->dbName = $_ENV['DATABASE_NAME'];

    // // local database config
    // $this->host = 'localhost';
    // $this->dbName = 'products_crud_app';
    // $this->username = 'root';
    // $this->password = '';
  }



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
