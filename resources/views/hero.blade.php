@extends('layouts.default')
@section('content')
    @if(!empty($hero))
    <div class="navbar-header float-right">
        <a class="btn btn-primary btn-sm" href="{{ url()->previous() }}">Back</a>
    </div>
    <article class="col">
        
        <figure>
            <img src="{{$hero['picture']}}" />
        </figure>
        
        <div class="info">
            <h2>{{$hero['name']}}</h2>
            <p>{{$hero['info']}}</p>
            <div class="likes">
                <img  class="like" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/like.svg') }}">
                <img  class="dislike" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/dislike.svg') }}">
            </div>
        </div>
        
    </article>
    @else
        <div>
            No fue posible encontrar el super héroe
        </div>
    @endif
@stop