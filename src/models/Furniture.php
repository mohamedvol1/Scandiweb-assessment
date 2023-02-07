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

  public function getProductObj()
  {
    return $this;
  }

  public function addProduct(object $data)
  {
    // check for dublicate sku if exist throw error
    $this->isSkuExist($data->sku);
    // handling data shape 
    $this->setProductProps($data);
    $obj = $this->getProductObj();
    // add the furniture to database
    $this->PushProductToDB($obj);
  }
}
