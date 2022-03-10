<?php 

namespace app\models\abstract;

use app\core\Response;
use app\models\Constants;

abstract class ProductsDb
{
  public Response $response;
  public Constants $constants;
  public $conn;
  // public $constants;

  public function __construct($db)
  {
    $this->conn = $db->connection();
    $this->response = new Response();
    $this->constants = new Constants();

  }
  abstract protected function getProducts();
  abstract protected function setProducts();
  abstract protected function deleteProducts(array $idsArray);
  abstract protected function addProduct(array $data);
 
}


