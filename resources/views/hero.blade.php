@extends('layouts.default')
@section('content')
    @if(!empty($hero))
    <div class="navbar-header d-flex justify-content-between align-items-center bg-dark p-3">
        <h1 class="text-white">SUPER HEROE</h1>
        <a class="btn btn-primary btn-sm" href="{{ url()->previous() }}">Back</a>
    </div>
    <div class="container">
        <article class="card-hero single">
            <div class="content-item p-3">
                <figure class="mb-0">
                    <img class="img-fluid" src="{{$hero['picture']}}" />
                </figure>
                
                <div class="info border p-4 mr-0 mr-sm-3 d-flex flex-column justify-content-between">
                    <div class="card-text">
                        <h2>{{$hero['name']}}</h2>
                        <p>{{$hero['info']}}</p>
                    </div>
                    
                    <div class="likes align-self-end">
                        <img  class="like" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/like.svg') }}">
                        <img  class="dislike" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/broken-heart.png') }}">
                    </div>
                </div>
            </div>
            
            
        </article>
    </div>
    
    @else
        <div>
            No fue posible encontrar el super héroe
        </div>
    @endif
@stop