const GIPHY_APIKEY = "hFBK0Y9nBlTuUIHFkoN2wZL0W9AzGWgV";
const HOSTURL = "http://api.giphy.com/v1/gifs/search?";

let gifs = [];
let limit = 25;
let apiCalls = 0;

// define masonry layout
let $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
});


function getGifs(query, key, cb) {
    $.ajax({
        url: HOSTURL + `q=${query}&api_key=${key}&limit=${limit}&offset=${apiCalls}`,
        method: "GET"
    }).done(function (response) {
        cb(null, response);
    }).fail(function (error) {
        console.log(error);
        cb(error, null);
    })

    //apiCalls += limit;
}

function handleSuccess(response) {
    //console.log(response.data[0].images);

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
    //displayGifs();

}

function fillGifs () {
    getGifs("dog", GIPHY_APIKEY, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            handleSuccess(data);
        }
        getGifs("twitch", GIPHY_APIKEY, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                handleSuccess(data);
            }
            getGifs("joggers", GIPHY_APIKEY, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    handleSuccess(data);
                }
                displayGifs();
                apiCalls += limit;
                gifs = [];
            })
        });
    });
}

function displayGifs() {
    // shuffler
    let currentIndex = gifs.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = gifs[currentIndex];
        gifs[currentIndex] = gifs[randomIndex];
        gifs[randomIndex] = temporaryValue;
    };

    gifs.forEach(function (holder) {
        $('.grid').append(holder).masonry('appended', holder);
    });
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });
}

fillGifs();

// toggle gif animation on click
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

// display more gifs when the user gets to the bottom of the page
$(window).on('scroll', function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        fillGifs();
    }
});

