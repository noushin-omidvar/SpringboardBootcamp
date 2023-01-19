/*
Part Two - Movies App!
Build an application that uses jQuery to do the following:

Contains a form with two inputs for a title and rating along with a button to submit the form.
When the form is submitted, capture the values for each of the inputs and 
append them to the DOM along with a button to remove each title and rating from the DOM.
When the button to remove is clicked, remove each title and rating from the DOM.
*/

$("body").css({ fontFamily: "Tahoma", display: "block" });
$("body").append($("<form>"));

//Create the label element
const $label = $("<label>").text("Title:");

//Create the input element
const $input = $(
  '<input type="text" pattern=[A-Za-z]{3} title="At least two characters" id="title">'
);

//Insert the input into the label
$input.appendTo($label);

//Insert the label into the DOM
$("form").append($label);
$("form").append($("<br>"));
$("form").append($("<br>"));

//Create the label element
const $label2 = $("<label>").text("Rating:");

//Create the input element
const $input2 = $('<input type="number" id="rating" min="0" max="10">');

//Insert the input into the label
$input2.appendTo($label2);

//Insert the label into the DOM - replace body with the required position
$("form").append($label2);
$("form").append($("<br>"));
$("form").append($("<br>"));

//Create the button element
const $button = $('<button type="submit">');
$button.text("Submit");

//Insert the button into the DOM
$("form").append($button);
$("form").append($("<br>"));
$("form").append($("<br>"));

$("body").append($("<table>").css({ width: "90%", border: "solid 1px" }));
$("table").append($("<thead>"));
$("thead").append($("<tr>"));
$("tr").append($("<th>").text("Title"));
$("tr").append($("<th>").text("Rating"));
$("tr").append($("<th>").text("remove"));

$("form").on("submit", function (evt) {
  evt.preventDefault();

  const title = $("#title").val();
  const rate = $("#rating").val();

  $row = $("<tr>").addClass("row");
  $row.append($("<td>").text(title));
  $row.append($("<td>").text(rate));
  $row.append($("<button id='remove'>").text("X"));
  $("table").append($row);
});

$("table").on("click", "#remove", function (e) {
  e.preventDefault();
  e.target.parentElement.remove();
});

/*
Further Study
Ensure that the rating of a movie can only be between 0 and 10.
Ensure that a title has at least 2 characters in it.
Allow users to sort alphabetically by the title of the movie or by the rating of the movie from lowest to highest and vice versa.
*/
