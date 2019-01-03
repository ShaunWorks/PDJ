const GIPHY_APIKEY = "hFBK0Y9nBlTuUIHFkoN2wZL0W9AzGWgV";
const HOSTURL = "http://api.giphy.com/v1/gifs/search?";

let gifs = [];
let limit = 25;
let apiCalls = 0;

let $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
});


function getGifs(url, key, cb) {
    $.ajax({
        url: HOSTURL + `q=${query}&api_key=${key}&limit=${limit}&offset=${apiCalls}`,
        method: "GET"
    }).done(function (response) {
        cb(null, response); // error, data
    }).fail(function (error) {
        console.log(response);
        cb(error, null);
    })

    apiCalls += limit;
}


getGifs('', '', function(error, data) {
    // TODO

    
});



getGifs("pepe", GIPHY_APIKEY, function (err, data) {
    if (err) {
        // handle errors cases
    } else {
        // handle success cases
        handeSuccess(data);

        getGifs("dog", GIPHY_APIKEY, function (error, data) {
            if (error) {
                // :TODO
            } else {
                // TODO

                getGifs("twitch", GIPHY_APIKEY, function() {
                    // TODO
                });

            }
        });

    }
});

function handeSuccess(response) {
    //console.log(response.data[0].images);
    gifs = [];
    $.each(response.data, function (key, value) {
        let holder = $("<div>").addClass("grid-item gif").attr("clicked", "false");
        let image = $("<img>").attr({
            "src": value.images.original_still.url,
            "still": value.images.original_still.url,
            "animated": value.images.original.url
        });
        holder.append(image);
        gifs.push(holder);
    })
    displayGifs();




}


function fillGrid() {
    getGifs("pepe", GIPHY_APIKEY);
    getGifs("dog", GIPHY_APIKEY);
    getGifs("twitch", GIPHY_APIKEY);
    getGifs("jogger", GIPHY_APIKEY);
    displayGifs();
    apiCalls += limit;
}

// fillGrid();

getGifs("dog", GIPHY_APIKEY);

function displayGifs() {
    gifs.forEach(function (holder) {
        $('.grid').append(holder).masonry('appended', holder);
    });
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });
}

// $("#test").on("click", function(){
//     $grid.masonry('layout');
// });

$(".grid").on("click", ".gif", function () {
    if ($(this).attr("clicked") == "false") {
        $(this).find("img").attr("src", $(this).find("img").attr("animated"));
        $(this).attr("clicked", "true");
    }
    else {
        $(this).find("img").attr("src", $(this).find("img").attr("still"));
        $(this).attr("clicked", "false");
    }
})

$(window).on('scroll', function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        getGifs("dog", GIPHY_APIKEY);
    }
});


function getAnotherAPI(query, key) {
    $.ajax({
        url: HOSTURL + `q=${query}&api_key=${key}&limit=${limit}&offset=${apiCalls}`,
        method: "GET"
    }).done(function (response) {
        //console.log(response.data[0].images);
        gifs = [];
        $.each(response.data, function (key, value) {
            let holder = $("<div>").addClass("grid-item gif").attr("clicked", "false");
            let image = $("<img>").attr({
                "src": value.images.original_still.url,
                "still": value.images.original_still.url,
                "animated": value.images.original.url
            });
            holder.append(image);
            gifs.push(holder);
        })
        displayGifs();

    }).fail(function (response) {
        console.log(response);
    })

    apiCalls += limit;
}
