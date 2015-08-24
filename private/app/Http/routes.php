<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/**
 * Front Home
 */
Route::get('/', 'Front\HomeController@index');


/**
 * Front API
 */
Route::group(['prefix'=>'api/v1.0'], function(){
    #-- Contact Us
    Route::group(['prefix'=>'contact-us'], function(){
        #-- api/v1.0/contact-us/push
        Route::post('push', 'Front\ContactUsController@Push');
        #-- api/v1.0/contact-us/get-list
        Route::get('get-list', 'Front\ContactUsController@GetList');
        #-- api/v1.0/contact-us/get-item
        Route::get('get-item', 'Front\ContactUsController@GetItem');
    });
});


