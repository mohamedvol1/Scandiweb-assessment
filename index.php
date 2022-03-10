<?php


require_once __DIR__ . '/vendor/autoload.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
// require_once __DIR__ . '/config/Database.php';


use app\core\Application;
use app\controllers\ProductsController;

$app = new Application();

$app->router->get('/products', [ProductsController::class, 'fetchProducts']);

$app->router->post('/addProduct', [ProductsController::class, 'postProduct']);

$app->router->post('/deleteChecked', [ProductsController::class, 'deleteChecked']);


$app->run();
