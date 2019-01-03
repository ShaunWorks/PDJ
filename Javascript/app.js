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
    url: queryURL("joggers"),
    method: "GET"
}).done(function (response) {
    console.log(response.data[0].images);
    for (let i = 0; i < 25; i++) {
        let holder = $("<div>").addClass("grid-item");
        let image = $("<img>").attr("src", response.data[i].images.original_still.url);
        holder.append(image);
        gifs.push(holder);
    }
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

function queryURL (query, key)
{
    return HOSTURL + `q=${query}&api_key=${key}`
}

$("#test").on("click", function(){
    $grid.masonry('layout');
});
