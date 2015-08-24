<?php namespace App\Http\Controllers\Front;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\GlobalServices\FrontGlobalData;
use Theme;
use View;
use Response;

/**
 * Class HomeController
 * @package App\Http\Controllers\Front
 */
class HomeController extends Controller {
    /**
     * @var FrontGlobalData|null
     */
    private $GlobalData = null;

    /**
     * @var null|\Teepluss\Theme\Theme
     */
    private $theme      = null;

    /**
     * Inject global data to controller and share it with views
     *
     * @var FrontGlobalData|null
     * @param FrontGlobalData $GlobalData
     */
    public function __construct(FrontGlobalData $GlobalData){
        $this->GlobalData = $GlobalData;

        //-- Set theme properties
        $this->GlobalData->theme_layout = 'default';
        $this->theme = $this->GlobalData->getTheme();


        //-- Sharing with views
        View::share('GlobalData', $this->GlobalData);
    }

    /**
     * Display a listing of the resource.
     *
     * @return FrontGlobalData
     */
    public function index(){
        #-- Prepare public vars
        $this->theme->asset()->writeScript('inline-script', '
            var GS_VARS = {
                PUBLIC_URL: "'.url('/').'",
                ASSETS_URL: "'.url('/assets').'",
                _TOKEN:     "'.csrf_token().'"
            };
        ', array());

        #-- Push view
        return $this->theme->scopeWithLayout('home')->render();
    }
}
