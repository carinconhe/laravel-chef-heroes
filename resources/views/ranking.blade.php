@extends('layouts.default')
@section('content')
<div class=""><a href="{{ url()->previous() }}">Back</a></div>
<div id="ranking-data" class="content-ranking"></div>
@stop