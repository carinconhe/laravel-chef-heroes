@extends('layouts.default')
@section('content')
    @if(count($items))
        <div id="b-ranking" class="d-none"><a class="btn btn-primary btn-sm" href="{{ url('ranking/data') }}">Ranking</a></div>
        <div class="row row-cols-3">
            
            @foreach ($items as $hero)
                <article class="col">
                    <a href="{{ url('hero/'.strtolower(str_replace(' ', '_', $hero['name']))) }}">
                        <figure>
                            <img src="{{$hero['picture']}}" />
                        </figure>
                    </a>
                    <div class="info">
                        <h2>{{$hero['name']}}</h2>
                        <p>{{$hero['info']}}</p>
                        <span>{{$hero['publisher']}}</span>
                        <div class="likes">
                            <img  class="like" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/like.svg') }}">
                            <img  class="dislike" data-id="{!! strtolower(str_replace(' ', '_', $hero['name'])) !!}" src="{{ asset('assets/images/dislike.svg') }}">                            
                        </div>
                    </div>
                    
                </article>
            @endforeach
        </div>
        {{ $items->links() }}
    @endif
@stop