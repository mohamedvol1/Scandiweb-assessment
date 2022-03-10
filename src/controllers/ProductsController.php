<?php

namespace app\controllers;
// use const app\models\PRODUCT_TYPES;

use app\config\Database;
use app\models\AllProducts;
use app\models\Constants;

class ProductsController {

  public static function fetchProducts() {
    $db = new Database();
    $products = new AllProducts($db);
    $products->setProducts();
    $result = $products->getProducts();
    return json_encode($result);  
  }

  public static function postProduct() {
    $db = new Database(); 
    $products = new AllProducts($db);
    $data = json_decode(file_get_contents("php://input"));
  
    $constants = new Constants();
    $types = $constants->getProductsTypes();
    
    $productObj = $types[$data->type];
    $productObj->setProductProps($data);
    $newProduct = $productObj->getProductArray();
  
    $res = $products->addProduct($newProduct);
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