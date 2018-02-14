const currencyAPI = (function() {
  return class currencyAPI {
    static getRate() {
      const baseURL = "http://www.apilayer.net/api/";
      const key = "live?access_key=7f4d02da127d8bf24d661a776e7e392a";
      return fetch(`${baseURL}${key}`)
        .then(res => res.json())
        .then(json => {
          for (let quote in json.quotes) {
            if (json.quotes[quote] < 3) {
              let selectOne = document.getElementById(
                "conversion-currency-one"
              );
              let selectTwo = document.getElementById(
                "conversion-currency-two"
              );
              let optOne = document.createElement("option");
              let optTwo = document.createElement("option");
              optOne.innerHTML = quote.slice(3);
              optTwo.innerHTML = quote.slice(3);
              optOne.setAttribute("rate", json.quotes[quote]);
              optTwo.setAttribute("rate", json.quotes[quote]);
              selectOne.append(optOne);
              selectTwo.append(optTwo);
              document.getElementById("conversion-currency-one").value = "USD";
            }
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
                  Math.round(
                    conversionValue /
                      json.quotes[countryOne] *
                      json.quotes[countryTwo] *
                      100
                  ) /
                    100 +
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
    static renderCompareChart() {
      let currencyLabels = [];
      let currencyData = [];
      const baseURL = "http://www.apilayer.net/api/";
      const key = "live?access_key=7f4d02da127d8bf24d661a776e7e392a";
      fetch(`${baseURL}${key}`)
        .then(res => res.json())
        .then(json => {
          for (let quote in json.quotes) {
            let currencyName = quote.slice(3);
            if (json.quotes[quote] < 3) {
              currencyLabels.push(currencyName);
              currencyData.push(json.quotes[quote]);
            }
          }

          new Chart(document.getElementById("bar-chart"), {
            type: "bar",
            data: {
              labels: currencyLabels,
              datasets: [
                {
                  label: "Conversion Rate Compared To USD",
                  backgroundColor: "white",
                  data: currencyData
                }
              ]
            },
            options: {
              legend: { display: true },
              title: {
                display: true,
                text: "Currency Levels"
              }
            }
          });
        });
    }
  };
})();
