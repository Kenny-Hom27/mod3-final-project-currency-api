const currencyAPI = (function() {
  return class currencyAPI {
    static getRate() {
      const baseURL = "http://www.apilayer.net/api/";
      const key = "live?access_key=7f4d02da127d8bf24d661a776e7e392a";
      return fetch(`${baseURL}${key}`)
        .then(res => res.json())
        .then(json => {
          for (let quote in json.quotes) {
            let selectOne = document.getElementById("conversion-currency-one");
            let selectTwo = document.getElementById("conversion-currency-two");
            let optOne = document.createElement("option");
            let optTwo = document.createElement("option");
            optOne.innerHTML = quote.slice(3);
            optTwo.innerHTML = quote.slice(3);
            optOne.setAttribute("rate", json.quotes[quote]);
            optTwo.setAttribute("rate", json.quotes[quote]);
            selectOne.append(optOne);
            selectTwo.append(optTwo);
          }
        });
    }

    static createRateObject(countryOne, countryTwo, conversionValue) {
      return fetch(`http://localhost:3000/api/v1/currencies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          original_currency: countryOne,
          conversion_currency: countryTwo,
          amount_entered: conversionValue
        })
      })
        .then(res => res.json())
        .then(json => console.log(json));
    }

    static renderPastRates() {
      return fetch(`http://localhost:3000/api/v1/currencies`)
        .then(res => res.json())
        .then(backendApi => {
          backendApi.forEach(function(backendJSON) {
            let countryOne = "USD" + backendJSON.original_currency;
            let countryTwo = "USD" + backendJSON.conversion_currency;
            let conversionValue = backendJSON.amount_entered;
            let id = backendJSON.id;

            const baseURL = "http://www.apilayer.net/api/";
            const key = "live?access_key=7f4d02da127d8bf24d661a776e7e392a";
            return fetch(`${baseURL}${key}`)
              .then(res => res.json())
              .then(json => {
                let currenciesDiv = document.getElementById("currencies");
                let blockHeader = document.createElement("h3");
                let convertedValue = document.createElement("p");
                let currencyBlock = document.createElement("div");

                let deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";

                deleteButton.addEventListener("click", function(e) {
                  e.target.parentElement.remove();
                  fetch(`http://localhost:3000/api/v1/currencies/${id}`, {
                    method: "DELETE"
                  });
                });

                currencyBlock.classList.add("currencyBlock");
                convertedValue.innerText =
                  `${conversionValue} ${countryOne.slice(3)}` +
                  `  -->  ` +
                  conversionValue /
                    json.quotes[countryOne] *
                    json.quotes[countryTwo] +
                  ` ${countryTwo.slice(3)}`;
                blockHeader.innerHTML = `${countryOne.slice(
                  3
                )} --> ${countryTwo.slice(3)}`;
                currencyBlock.append(blockHeader);
                currencyBlock.append(convertedValue);
                currencyBlock.append(deleteButton);
                currencies.append(currencyBlock);
              });
          });
        });
    }
  };
})();
