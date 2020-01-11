$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    existData();

    $('.like').on('click', function(e) {
        e.preventDefault();
        $data = $(this).data('id')
        vote($data, 1);
    });

    $('.dislike').on('click', function(e) {
        e.preventDefault();
        let $data = $(this).data('id')
        vote($data, 0);
    });

    function existData() {
        let storage = JSON.parse(localStorage.getItem('chef-data'));
        if (storage === null)
            $('#b-ranking').addClass('d-none');
        else
            $('#b-ranking').removeClass('d-none');
    }

    function vote($data, $action) {
        let storage = JSON.parse(localStorage.getItem('chef-data'));

        if (storage === null) {
            localStorage.setItem('chef-data', JSON.stringify([{ 'id': $data, 'value': $action }]))
        } else {
            var exist = false;
            $.each(storage, function(i, element) {
                if (element.id === $data) {
                    exist = true;
                }
            });
            if (exist == false) {
                storage.push({ 'id': $data, 'value': $action })
                alert('Gracias por votar');
            } else {
                $.each(storage, function(i, element) {
                    if (element.id === $data && element.value != $action) {
                        storage[i] = { 'id': $data, 'value': $action }
                        alert('Usted acaba de cambiar de opinion que mal!!!');
                    } else if (element.id === $data) {
                        let result = (element.value == 0) ? ' Dislike' : 'Like';
                        alert("Amigo usted ya dio un " + result + " por " + element.id);
                    }
                });
            }

            localStorage.setItem('chef-data', JSON.stringify(storage))
        }
    }

});