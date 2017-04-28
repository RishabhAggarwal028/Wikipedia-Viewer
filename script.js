$(function() {

  function searchWiki() {
    var term = $("input").val();
    var apiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=20&search=' + term + '&callback=?';

    $.getJSON(apiUrl, success).fail(error);
    
    function success(data) {
      console.log(data);
      var result = [];
      for (var i = 0; i < data[1].length; i++) {
        result.push(new WikiEntry([data[1][i], data[2][i], data[3][i]]));
      }

      displayResults(result);
    }

    function error() {
      alert("Error accessing Wikipedia. Please reload the page or try again later.");
    }
  }


  function displayResults(arr) {
    $(".results").empty();
    if (arr.length == 20) {
      $(".results").append("<div id='result-count' class='col-sm-8 col-sm-offset-2'><h3>Top 20 results</h3></div>");
      $("#result-count").fadeIn("slow");
    } else {
      $(".results").append("<div id='result-count' class='col-sm-8 col-sm-offset-2'><h3>" + arr.length + " results</h3></div>");
      $("#result-count").fadeIn("slow");
    }
    arr.forEach(function(entry, index) {
      var id = "result-" + index;
      var divId = "#" + id;
      var insert = "<div id='" + id + "'class='col-sm-8 col-sm-offset-2'><a href='" + entry.link + "' target='_blank'><div class='entry'><h2>" + entry.title + "</h2><p>" + entry.desc + "</p></div></a></div>"
      $(".results").append(insert);
      $(divId).fadeIn('slow');
    });
    $(".entry").filter(":odd").addClass("odd");
  }

  function WikiEntry(arr) {
    this.title = arr[0];
    this.desc = arr[1];
    this.link = arr[2];
  }

  $(document).on("submit", "form", function(e) {
    e.preventDefault();
    searchWiki();  
  });

});
