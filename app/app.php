<?php
require __DIR__.'/bootstrap.php';
$app = new Silex\Application();
$app['debug'] = true;
// Twig Extension
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/templates',
));
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

// Set path for assets
$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    $twig->addFunction(new \Twig_SimpleFunction('asset', function ($asset) {
        // implement whatever logic you need to determine the asset path

        return sprintf('http://localhost/%s', ltrim($asset, '/'));
    }));

    return $twig;
}));

// Routes
$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html.twig', array(
       'title' => "Hello World",
       'description' => "Description of homepage",
       'items' => array("foo", "bar", "baz")
    ));
})
->bind('homepage');

$app->get('/innerpage', function () use ($app) {
    return $app['twig']->render('innerpage.html.twig', array(
       'title' => "Innerpage",
       'description' => "Description of innerpage"
    ));
})
->bind('innerpage');

return $app;