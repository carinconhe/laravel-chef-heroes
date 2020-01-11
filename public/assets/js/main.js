$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.likes').on('click', function(e) {
        e.preventDefault();
        $data = $(this).find('img').attr('id');
        console.log($data);
    });

});