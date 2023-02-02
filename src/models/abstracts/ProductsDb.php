<?php

namespace app\models\abstracts;

use app\core\Response;

abstract class ProductsDb
{
  public Response $response;
  public $conn;

  public function __construct($db)
  {
    $this->conn = $db->connection();
    $this->response = new Response();
  }
  abstract protected function getProducts();
  abstract protected function setProducts();
  abstract protected function deleteProducts(array $idsArray);
}
