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
  '<input type="text" minlength=2 title="At least two characters" id="title">'
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

$sortBtn = $('<button type=submit id ="sort" value="sort">').text("sort");
$("body").append($sortBtn);

$("body").append(
  $("<table id='myTable'>").css({ width: "90%", border: "solid 1px" })
);
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

  $titleTD = $("<td>").text(title);
  $row.append($titleTD);
  $row.append($("<td>").text(rate));
  $row.append($("<button id='remove'>").text("X"));
  $("table").append($row);
});

$("table").on("click", "#remove", function (e) {
  e.preventDefault();
  e.target.parentElement.remove();
});

$("#sort").on("click", function (e) {
  e.preventDefault();
  sortTable();
});
/*
Further Study
Ensure that the rating of a movie can only be between 0 and 10.
Ensure that a title has at least 2 characters in it.
Allow users to sort alphabetically by the title of the movie or by the rating of the movie from lowest to highest and vice versa.
*/
function sortTable() {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /* Make a loop that will continue until
    no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
      first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
        one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
