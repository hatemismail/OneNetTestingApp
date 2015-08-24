<?php namespace App\Http\Controllers\Front;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\GlobalServices\FrontGlobalData;
use App\GlobalServices\ContactUsCacheDB;
use Theme;
use View;
use Response;
use Input;

class ContactUsController extends Controller {
    /**
     * Inject global data to controller and share it with views
     *
     * @var FrontGlobalData|null
     * @param FrontGlobalData $GlobalData
     */
    private $GlobalData     = null;
    private $ContactData    = null;
    private $theme          = null;
    public function __construct(FrontGlobalData $GlobalData, ContactUsCacheDB $ContactData){
        //-- Push injecting objects
        $this->GlobalData     = $GlobalData;
        $this->ContactData    = $ContactData;

        //-- Set theme properties
        $this->GlobalData->theme_layout = 'default';
        $this->theme = $this->GlobalData->getTheme();

        //-- Sharing with views
        View::share('GlobalData', $this->GlobalData);
    }

    /**
     * Push new item to storage.
     *
     * @return Response::json()
     */
    public function Push(){
        #-- Set session to database
        if(Input::get('data')){
            #-- Push to cache storage
            $this->ContactData->Push(Input::get('data'));

            #-- Response
            return Response::json([
                'done'=> true
            ]);
        }else{
            #-- Response
            return Response::json([
                'done'=> false,
                'error' => 'Error on save session by server side.'
            ]);
        }
    }

    /**
     * Get list of contact-us messages.
     *
     * @return Response::json()
     */
    public function GetList(){
        return Response::json($this->ContactData->GetList());
    }

    /**
     * Get specific item.
     *
     * @return Response::json()
     */
    public function GetItem(){
        return Response::json($this->ContactData->GetByIndex());
    }
}
