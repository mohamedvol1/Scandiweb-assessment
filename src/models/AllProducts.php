<?php

namespace app\models;

use app\models\abstract\ProductsDb;
use Exception;
use PDO;

class AllProducts extends ProductsDb
{

  private array $products = array();

  public function setProducts()
  {
    try {
      $q = 'select * from products';
      $stmt = $this->conn->prepare($q);
      $stmt->execute();

      $num = $stmt->rowCount();

      if ($num > 0) {
        // set the products array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          array_push($this->products, $row);
        }
        return "fetched products successfully";
      } else {
        return 'products list is empty';
      }
    } catch (Exception $e) {
      $this->response->setStatusCode(500);
      echo 'Caught exception in getting products: ',  $e->getMessage(), "\n";
    }
  }

  public function getProducts()
  {
    return $this->products;
  }

  public function deleteProducts(array $idsArray)
  {
    // handle array to create (?, ?, ?, ?, ...)
    $arrayToPass = implode(',', array_fill(0, count($idsArray), '?'));
    $q = 'delete from products where id in (' . $arrayToPass . ')';
    $stmt = $this->conn->prepare($q);

    try {
      $stmt->execute($idsArray);
      return "deleted successfully";
    } catch (Exception $e) {
      $this->response->setStatusCode(500);
      echo 'Caught exception in deleting products: ',  $e->getMessage(), "\n";
    }
  }

  public function addProduct(array $data)
  {
    extract($data);
    $q = 'insert into products (title, sku, price, type, description, specialAttr) values (?, ?, ?, ?, ?, ?)';
    $stmt = $this->conn->prepare($q);
    try {
      $stmt->execute(array($title, $sku, $price, $type, $description, $specialAttr));
      return "new product is added successfully";
    } catch (Exception $e) {
      $this->response->setStatusCode(500);
      echo 'Caught exception in adding a product: ',  $e->getMessage(), "\n";
    }
  }
}
