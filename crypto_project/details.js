const coinImage = document.querySelector(".single-crypto-details .left");
const coinDetails = document.querySelector(".single-crypto-details .right");

// console.log(window.location.href);
console.log("Plain Url",window.location.href)
const currentURL = new URL(window.location.href);
console.log("Current URL", currentURL)
// console.log(currentURL);
const params = new URLSearchParams(currentURL.search);
console.log("Params ",params)
// console.log(params);

if (!params.has("id")) {
  window.location.href = "search.html";
} else {
  getDataFromAPI(
    `https://api.coingecko.com/api/v3/coins/${params.get(
      "id"
    )}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  ).then((response) => {
    console.log(response);
    showDetails(response);
  });
}

function showDetails(obj) {
  const img = document.createElement("img");
  img.src = obj.image.large;
  coinImage.append(img);

  const name = document.createElement("h3");
  name.innerText = obj.name + " ( " + obj.symbol + " ) ";

  const desc = document.createElement("p");
  desc.innerText = obj.description.en;

  coinDetails.append(name, desc);
}

async function getDataFromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
