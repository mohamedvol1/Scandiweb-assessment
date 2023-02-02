<?php

namespace app\models;

use app\models\abstracts\Product;

class Furniture extends Product
{

  public function setProductProps($dataObject)
  {
    $this->title = $dataObject->title;
    $this->sku = $dataObject->sku;
    $this->price = $dataObject->price;
    $this->type = $dataObject->type;
    $this->specialAttr = 'Dimension';
    // handle special attributes
    $descriptionString = $dataObject->width . 'x' . $dataObject->height . 'x' . $dataObject->length;
    $this->description = $descriptionString;
  }

  public function getProductArray()
  {
    return array(
      "title" => $this->title,
      "sku" => $this->sku,
      "price" => $this->price,
      "type" => $this->type,
      "specialAttr" => $this->specialAttr,
      "description" => $this->description
    );
  }

  public function addProduct(object $data)
  {
    // handling data shape 
    $this->setProductProps($data);
    $newProductArray = $this->getProductArray();
    // add the furniture to database
    $this->PushProductToDB($newProductArray);
  }
}
