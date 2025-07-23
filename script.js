const dropdowns = document.querySelectorAll('.dropdown select')

for (let select of dropdowns) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement('option')
        newOption.innerText = currencyCode
        newOption.value = currencyCode
        select.append(newOption)
        // if(select.name === 'from' && currencyCode === 'USD')
        //     newOption.selected = 'selected'
        // else if(select.name === 'to' && currencyCode === 'INR')
        //     newOption.selected = 'selected'
    }
    select.addEventListener('change', (event) => {
        updateFlag(event.target)
    })
}

const updateFlag = (ele) => {   //ele is the option tag
    let currCurrencyCode = ele.value    //it is the value inside option tag
    let currCountryCode = countryList[currCurrencyCode]   //it is the country code of given currency code
    let img = ele.parentElement.querySelector('img')   //here since two flags are there one 'from' and another 'to' so to change both we need to select parent element not directly from query selector it will select only 'from' flag
    img.src = `https://flagsapi.com/${currCountryCode}/flat/64.png`
}

const conversion = async () => {
    let amount = document.querySelector('.amount input')
    if (amount.value === '' || amount.value < 1)
        amount.value = 1

    const fromCurrency = document.querySelector('.from select')
    const toCurrency = document.querySelector('.to select')
    const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_36aKpsGnhsCmRQYKz81kasMTM1JtXqC7WSR6SOuB&base_currency=${fromCurrency.value}&currencies=${toCurrency.value}`  //using currency conversion api
    const msg = document.querySelector('.msg')

    try{
        let response = await fetch(URL) //returns promise  fetch is used when api is used else not required
        //console.log(response)
        let data = await response.json() //returns promise converts json to js object
        //console.log(data)
        //console.log(data['data'][toCurrency.value])
        let rate = data['data'][toCurrency.value]
        msg.innerText = `${amount.value} ${fromCurrency.value} = ${(amount.value * rate).toFixed(2)} ${toCurrency.value}`
    }

    catch(err){
        //console.log(err)
        msg.innerText = 'Conversion Failed!!'
    }
}

window.addEventListener('load', () => {
    conversion()
})

const btn = document.querySelector('form button')
btn.addEventListener('click', (event) => {
    event.preventDefault()
    conversion()
})

let exchange = document.querySelector('.fa-solid')
exchange.addEventListener('click',() => {
    let fromSelect = document.querySelector('.from select')
    let toSelect = document.querySelector('.to select')

    let swap = fromSelect.value
    fromSelect.value = toSelect.value
    toSelect.value = swap

    fromSelect.dispatchEvent(new Event('change'));  //done through js code that's why dispatchEvent is used so that browser believes as user made the change
    toSelect.dispatchEvent(new Event('change'));    // ,, same as above

    //conversion()
})
