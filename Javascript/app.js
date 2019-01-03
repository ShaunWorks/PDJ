const GIPHY_APIKEY = "hFBK0Y9nBlTuUIHFkoN2wZL0W9AzGWgV";
const HOSTURL = "http://api.giphy.com/v1/gifs/search?";

let gifs = [];
let apiCalls = 0;

let $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });


function getGifs (query, key, limit) {
    $.ajax({
        url: HOSTURL + `q=${query}&api_key=${key}&limit=${limit}&offset=${apiCalls}`,
        method: "GET"
    }).done(function (response) {
        console.log(response.data[0].images);
        gifs = [];
        $.each(response.data, function(key, value) {
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


function displayGifs()
{
    gifs.forEach(function(holder){
        $('.grid').append(holder).masonry('appended', holder);
    });
    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
      });
}

function queryURL (query, key, limit)
{
    return HOSTURL + `q=${query}&api_key=${key}&limit=${limit}`
}

$("#test").on("click", function(){
    $grid.masonry('layout');
});

$(".grid").on("click", ".gif", function() {
    if($(this).attr("clicked") == "false")
    {
        $(this).find("img").attr("src", $(this).find("img").attr("animated"));
        $(this).attr("clicked", "true");
    }
    else
    {
        $(this).find("img").attr("src", $(this).find("img").attr("still"));
        $(this).attr("clicked", "false");
    }
})

$(window).on('scroll', function() {
    if( $(window).scrollTop() + $(window).height() == $(document).height() ) {
        getGifs("dog", GIPHY_APIKEY, 100);
    }
});

getGifs("dog", GIPHY_APIKEY, 100);
