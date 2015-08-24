<?php namespace App\GlobalServices;
use Theme;
use Session;

class FrontGlobalData{
    public  $theme_name   = '';
    public  $theme_layout = '';

    private $theme      = null;


    public function __construct(){
        /**
         * Todo:Get theme
         */
        $this->theme_name = 'default';

        /**
         * Prepare theme
         */

        app()->singleton('site_settings', function(){
            $site_settings = [
                'dafdasf', 'dsafsdaf'
            ];
            return $site_settings;
        });
    }


    /**
     * Get Current Theme
     * @return \Teepluss\Theme\Theme
     */
    public function getTheme(){
        $theme = Theme::uses($this->theme_name)->layout($this->theme_layout);
        $this->prepareTheme($theme);
        return $theme;
    }

    /**
     * @prepareTheme()
     */
    protected function prepareTheme($theme){
        $theme->set('title', 'OneNet Application');
    }
}