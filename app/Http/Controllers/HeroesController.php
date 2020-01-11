<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Pagination\Paginator;

use Response;

class HeroesController extends Controller{
    public  $client;
    /**
     * contructior Class
     */
    public function __construct(Client $client){
        $this->client = $client;
    }

    /**
     * This method return all information about the all super heroes
     *
     * @return void
     */
    public function grid(Request $request, $page = 1){
        $response   = $this->callExternalService();
        $limit      = 9;
        
        if(!is_numeric($page))
            $page = 1;
        $offset     = ($page-1)*$limit;
        $results    = array_slice($response,$offset,$limit);
        $lastPage   = intval(ceil(count($response)/$limit));

        $data = new Paginator($results,$limit, $page,[
            'path'  => $request->url(),
            'query' => $request->query(),
            'more'  => ($lastPage > $page)?true:false,
            'fist'  => 'false'
        ]);

        if($lastPage > $page || $page==1)
            $data->hasMorePagesWhen(true);
        
        return view('grid')->with('items',$data);
        
    }

    /**
     * This method search hero into the service of heroes
     *
     * @param Request $request
     * @param [type] $hero
     * @return void
     */
    public function hero(Request $request, $hero){
        $data       = null;
        $response   = $this->callExternalService();
        foreach ($response as $key => $heroData) {
            if(strtolower(str_replace(' ', '_', $heroData['name']))===$hero){
                $data= ['hero'=>$heroData];
                break;
            }
        }
        return view('hero')->with($data);
    }

    /**
     * This method call the view of blabe, this call is used for raking
     *
     * @param Request $request
     * @return void
     */
    public function ranking(Request $request){
        return view('ranking');
    }

    public function ajaxRequestPost(){
        $dataStorage    = request()->data;
        $success        = true;
        if(!empty($dataStorage)){
            $heroes = $this->callExternalService();
            $data   = [];
            foreach ($heroes as $key => $hero) {
                foreach($dataStorage as $element){
                    if(strtolower(str_replace(' ', '_', $hero['name']))===$element['id']){
                        array_push($data,$hero);
                    }
                }
            }
            $result = ['data'=>$data];
        }else{
            $result = ['data'=>0];
            $success= false;
        }
        
        return Response::json([ 'success'    => $success ,
                                'results'   => $result]);
    }
    /**
     * This method is used for call the api rest of heroes
     *
     * @return void
     */
    private function callExternalService(){
        $response = [];
        try{
            $call       = $this->client->get('http://35.162.46.100/superheroes');
            $response   = json_decode($call->getBody()->getContents(), true);
        }catch (GuzzleException $e){
            //buy a beer
            dd($e);
        }
        return $response;
    }
}
