fetch('https://quotes.rest/qod')
    .then(res => res.json())
    .then((json) => {
        const quoteObj = json.contents.quotes[0];
        const elem = document.querySelector('#quote');
        elem.textContent = quoteObj.quote;
    });