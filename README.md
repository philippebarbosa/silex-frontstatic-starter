# Silex starter for static front-end development :

### Features
- A ready-to-go Silex starter, just follow the tutorial below.
- A *Gulpfile* workflow for SCSS compilation, Javascript compilation and concatenation.
- *BrowserSync* included, with CSS injection and automatic livereload.  

Gulp : [Docs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and [tutorial](https://css-tricks.com/gulp-for-beginners/).  
BrowserSync : [Website](https://www.browsersync.io/).  

### How to use :

- Clone or download the project.
- `composer.phar install`
- Edit your vhost :  
```
<VirtualHost *:80>
    ServerName yourproject.dev
    ServerAlias yourproject.dev

    DocumentRoot "/Users/YOU/site/yourproject/web"
    <Directory /Users/YOU/site/yourproject/web>
       Options FollowSymLinks MultiViews
       AllowOverride All
       Order Allow,Deny
       Allow from All

       <IfModule mod_rewrite.c>
          Options -MultiViews
          RewriteEngine On
          RewriteCond %{REQUEST_FILENAME} !-f
          RewriteRule ^ index.php [QSA,L]
       </IfModule>
    </Directory>

    # uncomment the following lines if you install assets as symlinks
    # or run into problems when compiling LESS/Sass/CoffeScript assets
    # <Directory /var/www/project>
    #     Options FollowSymlinks
    # </Directory>

    ErrorLog "/etc/apache2/logs/yourproject.dev-error_log"
    CustomLog "/etc/apache2/logs/your.dev-access_log" common
</VirtualHost>
```

- Update your `/etc/host` :  
```
127.0.0.1 yourproject.dev wwww.yourproject.dev
```
- Restart Apache : `sudo apachectl restart`
- You can now open wwww.yourproject.dev
- Define routes here : `/app/app.php`

### Gulp workflow (you first need NPM installed or your machine)

- Install gulp globally (if you don't have it allready):

```sh
$ npm install --global gulp-cli
```

- Install dependancies :   
```sh
$ npm install  
```

----

- Default task : Compile and concatenate SCSS / JS files, unminified :  
```sh
$ gulp
```

- Prod task : Compile, concatenate, and minify, SCSS / JS files :
```sh
$ gulp prod
```
