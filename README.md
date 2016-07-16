# Node ESI Language parser Core Module

[![Build Status](https://travis-ci.org/oculus42/esi.svg?branch=master)](https://travis-ci.org/oculus42/esi)

[Edge Side Includes](http://www.w3.org/TR/esi-lang) (ESI) Language is a templating language supported by popular CDN's such as Akamai and Varnish. This NPM module will preprocess ESI tags within your node server environment.

# TODO

 * Remove the middleware wrapper
 * Update tests to validate the core module

# Example
You want to embed the fragment of HTML from "http://snippets.com/abc.html" within an HTML document.

    blah blah, oh and here i embed in the page a snippet using an ESI server ...
    <esi:include src="http://snippets.com/snippet.html"></esi:include>

**snippet.html**

    <b>Snippet</b>


With Node ESI script, you can pre-process ESI tags. 

## Include the script

    npm install esi --save

Simply pass it into any service which uses http.createServer, e.g. below i'm using connect.

## Add ESI as middleware

    var app = require('connect')();
    
    var esi = require('esi');
    app.use( esi );
    
    var srv = http.createServer(app).listen( 8080 );

Now the page is constructed and the response looks like this...

    blah blah, oh and here i embed in the page a snippet using an ESI server ...
    <b>Snippet</b>


# Specs

View [the ESI specs](https://travis-ci.org/MrSwitch/esi) or from the install directory run.

    mocha specs -R spec


# Options

debug - prints out the tag handling

    esi.debug = true;


vars - set/modify environment variables

    esi.vars.HTTP_HOST = 'www.google.com';
