<?php

namespace app\controllers;

use app\config\Database;
use app\models\AllProducts;
use app\models\abstracts\Product;

class ProductsController {

  public static function fetchProducts() {
    $db = new Database();
    $products = new AllProducts($db);
    $products->setProducts();
    $result = $products->getProducts();
    return json_encode($result);  
  }

  public static function postProduct() {
    $data = json_decode(file_get_contents("php://input"));
    // getting instance of product type
    $product = Product::getProductType($data->type);
    $res = $product->addProduct($data);
    return json_encode($res);    
  }

  public static function deleteChecked() {
    $db = new Database();
    $products = new AllProducts($db);
    $idsToBedeleted = json_decode(file_get_contents("php://input"));
    $ids = $idsToBedeleted->idsList;
    $res = $products->deleteProducts($ids);
  
    return json_encode($res);
  }
  
}