<?php

namespace app\core;

use Exception;

class Application
{
  public Router $router;
  public Request $request;
  public Response $response;
  public function __construct()
  {
    $this->request = new Request();
    $this->response = new Response();
    $this->router = new Router($this->request, $this->response);
  }

  public function run()
  {
    try {
      $this->router->resolve();
    } catch (Exception $e) {
      $this->response->setStatusCode(500);
      echo 'Server Error: ',  $e->getMessage(), "\n";
    }
  }
}
