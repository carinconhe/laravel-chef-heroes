$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    callFingerPrint();
    existData();
    ranking();

    $('.like').on('click', function(e) {
        e.preventDefault();
        $data = $(this).data('id')
        vote($data, 1, window.fingerPrint);
    });

    $('.dislike').on('click', function(e) {
        e.preventDefault();
        let $data = $(this).data('id')
        vote($data, 0, window.fingerPrint);
    });

    /**
     * This methos is used by show or hide the button of ranking into
     * index page
     */
    function existData() {
        let storage = JSON.parse(localStorage.getItem('chef-data'));
        if (storage === null)
            $('#b-ranking').addClass('d-none');
        else
            $('#b-ranking').removeClass('d-none');
    }

    /**
     * This method is used by user voted by  heroes
     * @param {Array} $data 
     * @param {Integer} $action 
     */
    function vote($data, $action, $user) {
        let storage = JSON.parse(localStorage.getItem('chef-data'));

        if (storage === null) {
            localStorage.setItem('chef-data', JSON.stringify([{ 'id': $data, 'value': $action, 'user': $user }]))
        } else {
            var exist = false;
            $.each(storage, function(i, element) {
                if (element.id === $data && element.user === $user) {
                    exist = true;
                }
            });
            if (exist == false) {
                storage.push({ 'id': $data, 'value': $action, 'user': $user })
                alert('Gracias por votar');
            } else {
                $.each(storage, function(i, element) {
                    if (element.id === $data && element.value != $action) {
                        storage[i] = { 'id': $data, 'value': $action, 'user': $user }
                        alert('Usted acaba de cambiar de opinion que mal!!!');
                    } else if (element.id === $data) {
                        let result = (element.value == 0) ? ' Dislike' : 'Like';
                        alert("Amigo usted ya dio un " + result + " por " + element.id);
                    }
                });
            }

            localStorage.setItem('chef-data', JSON.stringify(storage))
        }
        existData();
    }
    /**
     * This method get rankinf of super heroes, this method call ajax
     */
    function ranking() {
        let pathname = window.location.pathname

        if (pathname.indexOf('ranking') > 0) {
            let storage = JSON.parse(localStorage.getItem('chef-data'));
            if (storage !== null) {
                $.post(ajaxUrl + '/ajaxRequest/exe/', { 'data': storage },
                    function(response) {
                        if (response.success == true) {
                            let data = response.results.data;
                            let htmlString = '';
                            $.each(data, function(i, element) {
                                htmlString += "<article class='col'>";
                                htmlString += "<figure>";
                                htmlString += "<img src='" + element.picture + "' />";
                                htmlString += "</figure>";
                                htmlString += "<div class='info'>";
                                htmlString += "<h2>" + element.name + "</h2>";
                                htmlString += "<p>" + element.info + "</p>";
                                htmlString += "</div>";
                                htmlString += "</article>";
                            });
                            $('#ranking-data').html(htmlString);
                        } else {
                            alert('Ocurrio algo de locos intente nuevamente');
                        }
                    });
            }
        }
    }
    window.fingerPrint;
    /**
     * THis method is used by generate unique id by browser.
     */
    function callFingerPrint() {
        if (window.requestIdleCallback) {
            requestIdleCallback(function() {
                Fingerprint2.get(function(components) {
                    window.fingerPrint = Fingerprint2.x64hash128(components.map(function(pair) {
                        return pair.value
                    }).join(), 31);
                })
            })
        } else {
            setTimeout(function() {
                Fingerprint2.get(function(components) {
                    window.fingerPrint = Fingerprint2.x64hash128(components.map(function(pair) {
                        return pair.value
                    }).join(), 31);

                })
            }, 500)
        }
    }


});