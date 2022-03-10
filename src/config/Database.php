<?php

namespace app\config;
use PDO;
use PDOException;

class Database
{
  private $host = 'localhost';
  private $dbName = 'products_crud_app';
  private $username = 'root';
  private $password = '';
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
