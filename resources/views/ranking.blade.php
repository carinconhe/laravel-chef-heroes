@extends('layouts.default')
@section('content')
<div class="navbar-header d-flex justify-content-between align-items-center bg-dark p-3 mb-4">
    <h1 class="text-white">SUPER HEROE</h1>
    <a class="btn btn-primary btn-sm" href="{{ url()->previous() }}">Back</a>
</div>
<div id="ranking-data" class="content-ranking row"></div>
@stop