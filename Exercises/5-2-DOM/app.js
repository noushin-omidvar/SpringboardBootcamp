// Select the section with an id of container without using querySelector.
const sect = document.getElementById('container')

// Select the section with an id of container using querySelector.
const sect = document.querySelector('#container')

// Select all of the list items with a class of “second”.
const AllSecondClass = document.querySelectorAll(".second")

// Select a list item with a class of third, but only the list item inside of the ol tag.
const thirdOL = document.querySelectorAll("ol .third")

// Give the section with an id of container the text “Hello!”.
let sect = document.querySelector("#container");
sect.innerText = "Hello";

// Add the class main to the div with a class of footer.
let foundDiv = document.querySelector('.footer')
foundDiv.classList.add('main')

// Remove the class main on the div with a class of footer.
let foundDiv = document.querySelector('.footer')
foundDiv.classList.remove('main')


// Create a new li element.
newLi = document.createElement('li')
// Give the li the text “four”.
newLi.textContent = 'four'
// Append the li to the ul element.
const ulList = document.querySelector('ul')
ulList.appendChild(li)

// Loop over all of the lis inside the ol tag and give them a background color of “green”.
const olLi = document.querySelectorAll("ol li");

for(let i = 0; i < olLi.length; i++){
    olLi[i].style.backgroundColor = "green";
}

// Remove the div with a class of footer
const foundDiv = document.querySelector('.footer')
foundDiv.remove()
