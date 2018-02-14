const App = (function() {
  return class App {
    static createCurrencyDiv() {
      const form = document.getElementById("input-form");
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        let currencies = document.getElementById("currencies");
        let conversionValue = document.getElementById("currency-amount").value;
        let currencyBlock = document.createElement("div");

        currencyBlock.classList.add("currencyBlock");
        let blockHeader = document.createElement("h3");
        let convertedValue = document.createElement("p");

        let selectOne = document.getElementById("conversion-currency-one");
        let selectTwo = document.getElementById("conversion-currency-two");

        let indexOne = selectOne[selectOne.selectedIndex].attributes.rate.value;
        let indexTwo = selectTwo[selectTwo.selectedIndex].attributes.rate.value;
        let countryOne = selectOne[selectOne.selectedIndex].innerText;
        let countryTwo = selectTwo[selectTwo.selectedIndex].innerText;

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", function(e) {
          e.target.parentElement.remove();
        });
        convertedValue.innerText =
          `${conversionValue} ${countryOne}` +
          `  -->  ` +
          Math.round(conversionValue / indexOne * indexTwo * 100) / 100 +
          ` ${countryTwo}`;
        blockHeader.innerHTML = `${countryOne} --> ${countryTwo}`;

        currencyBlock.append(blockHeader);
        currencyBlock.append(convertedValue);
        currencyBlock.append(deleteButton);
        currencies.append(currencyBlock);
        currencyAPI.createRateObject(countryOne, countryTwo, conversionValue);
      });
    }
  };
})();
