const billInput = document.querySelector("input[name='bill']");
const radioInputs = document.querySelectorAll("input[name='option']"); //list
const customInput = document.querySelector("input[name='custom']");
const numberPeopleInput = document.querySelector("input[name='number']");
const tipAmount = document.querySelector("#tipamount"); //div
const total = document.querySelector("#total"); //div
const resetButton = document.querySelector(".reset");

let billValue = 0;
let radioValue = "0";
let peopleValue;
let customValue = "0";

billInput.addEventListener("input", () => {
    if (billInput.value.includes(",")) {
        billInput.value = billInput.value.replace(",", ".");
    }
    billValue = parseFloat(billInput.value);
    if (isNaN(billValue)) {
        billValue = 0;
    }

    calc()
    resetButton.disabled = false;
});
radioInputs.forEach(e => e.addEventListener("change", (event) => {
    radioValue = parseFloat(event.target.value);
    customInput.value = "";
    calc()
    resetButton.disabled = false;
}));
customInput.addEventListener("input", () => {
    radioValue = customInput.value / 100;
    radioInputs.forEach(input => {
        if (input.checked) {
            input.checked = false;
        }

    })
    calc()
    resetButton.disabled = false;
});
numberPeopleInput.addEventListener("input", () => {
    peopleValue = parseFloat(numberPeopleInput.value);
    calc();
    resetButton.disabled = false;
});

function calc() {
    if (peopleValue !== undefined && peopleValue !== 0 && !isNaN(peopleValue)) {
        let tipResult = parseFloat(billValue * radioValue / peopleValue).toFixed(2);
        let totalResult = parseFloat((billValue + (billValue * radioValue)) / peopleValue).toFixed(2)
        tipAmount.innerHTML = "$" + tipResult;
        total.innerHTML = "$" + totalResult;
        if ((total.innerHTML.length > 8 && window.innerWidth <= 740 && window.innerWidth > 480) || (total.innerHTML.length > 8 && window.innerWidth < 376)) {
            total.style.fontSize = "19px";
            tipAmount.style.fontSize = "19px";
        } else {
            total.style.fontSize = "";
            tipAmount.style.fontSize = "";
        }
        document.getElementById("warning").style.visibility = "hidden";
        numberPeopleInput.style.outline = "none";

    } else if (peopleValue == 0) {
        document.getElementById("warning").style.visibility = "visible";
        numberPeopleInput.style.outline = "2px solid rgb(179, 83, 83)";

    }

    else {
        numberPeopleInput.style.outline = "none";
        document.getElementById("warning").style.visibility = "hidden";
        tipAmount.innerHTML = "$0.00";
        total.innerHTML = "$0.00";
    }
}

resetButton.addEventListener("click", () => {
    tipAmount.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
    billInput.value = "";
    radioInputs.forEach(input => input.checked = false);
    customInput.value = "";
    numberPeopleInput.value = "";
    billValue = 0;
    radioValue = "0";
    peopleValue = undefined;
    customValue = "0";
    resetButton.disabled = true;
    numberPeopleInput.style.outline = "none";
    document.getElementById("warning").style.visibility = "hidden";
})


