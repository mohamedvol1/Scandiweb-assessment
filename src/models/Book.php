<?php

namespace app\models;

use app\models\abstract\Product;


class Book extends Product
{

  public function setProductProps($dataObject)
  {
    $this->title = $dataObject->title;
    $this->sku = $dataObject->sku;
    $this->price = $dataObject->price;
    $this->type = $dataObject->type;
    $this->specialAttr = 'Weight';
    // handle special attributes
    $descriptionString = $dataObject->weight . 'KG';
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

}
