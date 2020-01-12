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
        vote($data, -1, window.fingerPrint);
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
            if ($action == -1)
                alert('Mueres siendo un héroe o vives lo suficiente para convertirte en un villano.');
            else
                alert('¿No te lo ha dicho nadie? Soy el más fuerte que existe.');
        } else {
            var exist = false;
            $.each(storage, function(i, element) {
                if (element.id === $data && element.user === $user) {
                    exist = true;
                }
            });
            if (exist == false) {
                storage.push({ 'id': $data, 'value': $action, 'user': $user })
            } else {
                $.each(storage, function(i, element) {
                    if (element.id === $data)
                        storage[i] = { 'id': $data, 'value': (element.value + parseInt($action)), 'user': $user }
                });
            }
            if ($action == -1)
                alert('Mueres siendo un héroe o vives lo suficiente para verte convertirte en un villano.');
            else
                alert('¿No te lo ha dicho nadie? Soy el más fuerte que existe.');
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
                                htmlString += "<article class='col-lg-4 col-md-6 col-12'>";
                                htmlString += "<div class='content-item p-3'>"
                                htmlString += "<figure class='rounded-circle'>";
                                htmlString += "<img class='img-fluid' src='" + element.picture + "' />";
                                htmlString += "</figure>";
                                htmlString += "<div class='info'>";
                                htmlString += "<h2>" + element.name + "</h2>";
                                htmlString += "<div class='d-flex align-items-center justify-content-center'> <img class='star img-fluid' src='../assets/images/star-america.png'> <span class='h1 mb-0 mx-2'>" + element.total + "</span></div>";
                                htmlString += "</div>";
                                htmlString += "</div>";
                                htmlString += "</article>";
                            });
                            $('#ranking-data').html(htmlString);
                            $('.content-ranking').slick({
                                infinite: true,
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                arrows: true,
                                responsive: [{
                                        breakpoint: 767.9,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 2
                                        }
                                    },
                                    {
                                        breakpoint: 565,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1
                                        }
                                    }
                                ]
                            });
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