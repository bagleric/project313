
//this is the stuff for workout category
$(document).ready(getCategory);

function getCategory() {
    // Get the value from the search box
    var searchString = $("#txtSearch").val();
    console.log("Searching for: " + searchString);
    // Set up the parameters to send to the API
    var params = {
        s: searchString
        , apikey: "acec9f21b2edbf72e0f9026a5191ce848f920639"
    };
    // Use jQuery to make the get request
    $.get("https://wger.de/api/v2/exercisecategory/?is_main=True", params, function (data, status) {
        // For debugging purposes, make a note that we're back
        console.log("Back from server with the following results:")
        console.log(status);
        console.log(data);
        updateCategoryList(data)
    });
}

function updateCategoryList(data) {
    if (data.results && data.results.length > 0) {
        var resultList = $("#category");
        resultList.empty();
        for (var i = 0; i < data.results.length; i++) {
            var title = data.results[i].name;
            var id = data.results[i].id;
            resultList.append("<div class='category-item' onclick=\"getExercises(" + id + ");\">" + title + "</div>");
        }
    }
}

function getExercises(id) {
    // Get the value from the search box
    var searchString = $("#txtSearch").val();
    console.log("Searching for: " + searchString);
    // Set up the parameters to send to the API
    var params = {
        license_author: "wger.de"
        , language: 2
        , limit: 500
        , category: id
    };
    // Use jQuery to make the get request
    $.get("https://wger.de/api/v2/exercise/", params, function (data, status) {
        // For debugging purposes, make a note that we're back
        console.log("Back from server with the following results:")
        console.log(status);
        console.log(data);
        updateExerciseList(data)
    });
}

function updateExerciseList(data) {
    if (data.results && data.results.length > 0) {
        var resultList = $("#exercise");
        resultList.empty();
        for (var i = 0; i < data.results.length; i++) {
            var title = data.results[i].name;
            var description = data.results[i].description;
            var id = data.results[i].id;
            var category = data.results[i].category;
            resultList.append("<div class=\"row\" id=\"" + id + "\">" + "<div class=\"col-md-9\">" + "<div class=\"exercise-card\">" + "<div class=\"\" role=\"tab\" id=\"heading" + id + "\">" + "<h5 class=\"exercise-card-header\">" + "<a data-toggle=\"collapse\"class=\"exercise-card-title\"  href=\"#collapse" + id + "\" aria-expanded=\"true\" aria-controls=\"collapse" + id + "\">" + title + "</a>" + "</h5>" + " </div>" + "<div id=\"collapse" + id + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"heading" + id + "\" data-parent=\"#accordion\">" + "<div class=\"exercise-card-body\">" + description + "</div>" + "</div>" + "</div>" + "</div>" + "<div class=\"col-md-2 mx-auto\">" + "<button class=\"exerciseButton\" onclick=\"addexercise('exercise-" + id + "', 'category-" + category + "', '" + title + "')\">ADD</button>" + "</div>" + "</div>");
        }
    }
}

function addexercise(exercise, category, title) {
    var now = new Date();
    var resultList = $("#selectedExercises");
    var id = exercise + category + now.getMilliseconds()
    resultList.prepend("<div class=\"row exerciseTile\" id=\"" + id + "\">" + "<div class=\"exerciseTitle col-sm-8\">" + title + "</div>" + "<div class=\"col-sm-4\">\n" + "<button type=\"button\" class=\"btn btn-secondary exerciseButton dark-primary-color\" onclick=\"removeexercise('" + id + "');\" data-toggle=\"tooltip\" data-placement=\"bottom\"" + "title=\"Remove from Exercises\">X</button>" + "</div>" + "</div>");
}

function removeexercise(tag) {
    var mydiv = $("#selectedExercises");
    var toRemove = "#" + tag;
    mydiv.children(toRemove).remove();
    console.log(toRemove);
}