<?php

namespace app\models\abstracts;

use app\models\Furniture;
use app\models\Book;
use app\models\Disk;
use app\config\Database;
use app\core\Response;
use Exception;

abstract class Product extends Database
{

  // products common attributes
  protected $title;
  protected $sku;
  protected $price;
  protected $type;
  protected $specialAttr;
  protected $description;

  public Response $response;
  public $conn;

  public function __construct(Database $db)
  {
    $this->conn = $db->connection();
    $this->response = new Response();
  }


  abstract public function setProductProps(object $dataObject);

  abstract public function getProductObj();

  abstract public function addProduct(object $data);

  public static function getProductType(string $type)
  {

    $productTypes = array(
      "Furniture" => new Furniture(new Database),
      "Book" => new Book(new Database),
      "DVD" => new Disk(new Database)
    );

    return $productTypes[$type];
  }

  public function PushProductToDB(object $data)
  {
    extract(get_object_vars($data));
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

  public function isSkuExist(string $sku)
  {
    $q = 'select sku from products where sku = ?';
    $stmt = $this->conn->prepare($q);
    $stmt->execute([$sku]);
    $count = $stmt->rowCount();
    $this->response->setStatusCode(200);

    if ($count > 0) {
      $this->response->setStatusCode(400);
      throw new Exception(json_encode('non-unique SKU'));
    }

    // return;
  }
}
