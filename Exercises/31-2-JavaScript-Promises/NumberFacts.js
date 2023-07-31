let baseURL = "http://numbersapi.com";
/* Make a request to the Numbers API (http://numbersapi.com/) to get a fact 
about your favorite number.*/
favNum = 14;
axios
  .get(`${baseURL}/${favNum}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    let fact = response.data;
    console.log(fact);
  });

/*get data on multiple numbers in a single request.
Make that request and when you get the data back,
put all of the number facts on the page.*/

let nums = [1, 3, 5, 7];

axios
  .get(`${baseURL}/${nums}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    let facts = response.data;
    console.log(facts);
    for (let fact in facts) {
      console.log(fact);
      $("body").append(`<p>${facts[fact]}</p>`);
    }
  });
