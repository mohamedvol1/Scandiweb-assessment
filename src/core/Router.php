<?php

namespace app\core;

class Router
{

  public Request $request;
  public Response $response;
  protected array $routes = [];

  public function __construct(Request $request, Response $response)
  {
    $this->request = $request;
    $this->response = $response;
  }

  public function get($path, $callback)
  {
    $this->routes['get'][$path] = $callback;
  }

  public function post($path, $callback)
  {
    $this->routes['post'][$path] = $callback;
  }

  public function resolve()
  {
    $path = $this->request->getPath();
    $method = $this->request->getMethod();
    $callback = $this->routes[$method][$path] ?? false;

    if ($callback === false) {
      $this->response->setStatusCode(404);
      echo "Not found";
      exit;
    }

    echo call_user_func($callback);
  }
}
