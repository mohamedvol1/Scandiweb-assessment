<?php

namespace app\models;

class Constants
{
  private $furniture;
  private $book;
  private $disc;

  public function __construct()
  {
    $this->furniture = 'Furniture';
    $this->book = 'Book';
    $this->disc = 'DVD';
  }

  public function getProductsTypes()
  {
    return array(
      $this->furniture => new Furniture(),
      $this->book => new Book(),
      $this->disc => new Disk()
    );
  }
}
