const APIKEY = "hFBK0Y9nBlTuUIHFkoN2wZL0W9AzGWgV";
const HOSTURL = "http://api.giphy.com/v1/gifs/search?";
let params = `q=dog&api_key=${APIKEY}`;

let gifs = [];

let $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });

$.ajax({
    url: HOSTURL + params,
    method: "GET"
}).done(function (response) {
    console.log(response.data[0].images);

    for (let i = 0; i < 25; i++) {
        let holder = $("<div>").addClass("grid-item");
        let image = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
        holder.append(image);
        $('.grid').append(holder).masonry('appended', holder);
    }

    $grid.imagesLoaded().done( function() {
        $grid.masonry('layout');
      });

}).fail(function (response) {
    console.log(response);
})

$("#test").on("click", function(){
    $grid.masonry('layout');
    console.log("ojhgx");
});
