<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Pagination\Paginator;

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
        try{
            $call       = $this->client->get('http://35.162.46.100/superheroes');
            $response   = json_decode($call->getBody()->getContents(), true);
            $limit      = 9;
            
            $offset     = ($page-1)*$limit;
            $results    = array_slice($response,$offset,$limit);
            $lastPage   = intval(ceil(count($response)/$limit));

            $data = new Paginator($results,$limit, $page,[
                'path'  => $request->url(),
                'query' => $request->query(),
                'more'  => ($lastPage > $page)?true:false,
                'fist'  => 'false'
            ]);

            //$data->hasMorePagesWhen(true);
            
            if($lastPage > $page || $page==1)
                $data->hasMorePagesWhen(true);
            
            //dd($data,$lastPage,$page);
             
            return view('grid')->with('items',$data);
            
        }catch (GuzzleException $e){
            //buy a beer
            dd($e);
        }
    }
}
