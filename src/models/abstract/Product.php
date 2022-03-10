<?php

namespace app\models\abstract;

abstract class Product
{

  // products common attributes
  protected $title;
  protected $sku;
  protected $price;
  protected $type;
  protected $specialAttr;
  protected $description;

  abstract public function setProductProps($dataObject);

  abstract public function getProductArray();
  // public function getProductArray() {
  //   return array(
  //     "title" => $this->title,
  //     "sku" => $this->sku,
  //     "price" => $this->price,
  //     "type" => $this->type,
  //     "description" => $this->description
  //   );
  // }

}
