const GIPHY_APIKEY = "hFBK0Y9nBlTuUIHFkoN2wZL0W9AzGWgV";
const HOSTURL = "http://api.giphy.com/v1/gifs/search?";

let gifs = [];
var bool = true;
let $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });

$.ajax({
    url: queryURL("dog", GIPHY_APIKEY, 100),
    method: "GET"
}).done(function (response) {
    console.log(response.data[0].images);
    // for (let i = 0; i < 25; i++) {
    //     let holder = $("<div>").addClass("grid-item");
    //     let image = $("<img>").attr("src", response.data[i].images.original_still.url);
    //     holder.append(image);
    //     gifs.push(holder);
    // }
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
