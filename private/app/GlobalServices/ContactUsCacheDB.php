<?php namespace App\GlobalServices;
use Cache;
use Fisharebest\ExtCalendar;

class ContactUsCacheDB{
    /**
     * $CacheKey
     * @var string
     */
    protected $CacheKey = 'contacts_list';

    /**
     * __construct
     */
    public function __construct(){
        /**
         * Be sure the for key
         */
        //Cache::forget($this->CacheKey);
        if (!Cache::has($this->CacheKey)) {
            Cache::forever($this->CacheKey, []);
        }
    }


    /**
     * Push
     * @param $item
     */
    public function Push($item){
        $item['date']  = date('c');
        $current_value = Cache::get($this->CacheKey);
        array_unshift($current_value, $item);
        return Cache::forever($this->CacheKey, $current_value);
    }


    /**
     * GetList
     * @return mixed
     */
    public function GetList(){
        return Cache::get($this->CacheKey);
    }

    /**
     * Remove
     * @param $index
     */
    public function Remove($index){
        $current_value = Cache::get($this->CacheKey);
        unset($current_value[$index]);
        return Cache::forever($this->CacheKey, $current_value);
    }
}