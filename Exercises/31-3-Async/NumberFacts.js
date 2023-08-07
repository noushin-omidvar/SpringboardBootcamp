let baseURL = "http://numbersapi.com";
/* Make a request to the Numbers API (http://numbersapi.com/) to get a fact 
about your favorite number.*/

async function get1Fact(faveNum) {
  let response = await axios.get(`${baseURL}/${favNum}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  let fact = response.data;
  console.log(response.data);
  return fact;
}
let favNum = 14;
get1Fact(favNum);

/*get data on multiple numbers in a single request.
Make that request and when you get the data back,
put all of the number facts on the page.*/

async function getMultieFacts(nums) {
  let response = await axios.get(`${baseURL}/${nums}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  let facts = response.data;
  for (let fact in facts) {
    $("body").append(`<p>${facts[fact]}</p>`);
  }
}

let nums = [1, 3, 5, 7];
getMultieFacts(nums);
