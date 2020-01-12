@extends('layouts.default')
@section('content')
    @if(count($items))
    <div class="navbar-header d-flex justify-content-between align-items-center bg-dark mb-4 p-3">
        <h1 class="text-white">SUPER HEROES</h1>
        <div id="b-ranking" class="d-none"><a class="btn btn-primary btn-sm" href="{{ url('ranking/data') }}">Ranking</a></div>
    </div>
        <div class="row row-cols-3">
            
            @foreach ($items as $hero)
                <article class="col-lg-4 col-md-6 col-12">
                    <div class="content-item p-3">
                        <a class="d-block" href="{{ url('hero/'.strtolower(str_replace(' ', '_', $hero['name']))) }}">
                            <figure class="m-0 rounded-circle">
                                <img class="img-fluid" src="{{$hero['picture']}}" />
                            </figure>
                        </a>
                        <div class="info">
                            <div>
                                <h2>{{$hero['name']}}</h2>
                                <p>{{$hero['info']}}</p>
                                <span>{{$hero['publisher']}}</span>
                            </div>
                            
                            <div class="likes d-flex justify-content-end">
                                <img  class="like" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/like.svg') }}">
                                <img  class="dislike" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/broken-heart.png') }}">                            
                            </div>
                        </div>
                    </div>
                </article>
            @endforeach
        </div>
        <div class="justify-content-between align-items-center">
        {{ $items->links() }}
        </div>
        
    @endif
@stop