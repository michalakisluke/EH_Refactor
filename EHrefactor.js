//--------------------------
// Sample data (leave as-is)
//--------------------------
const data = [
    {
        "id": "3cc51cfd-6e3c-41eb-9604-362da3a6fb64",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.98,
        "quantity": 2000,
        "currency": "USD"
    },
    {
        "id": "0572be22-d790-460e-bf03-8ee1b3b19dad",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.9,
        "quantity": 1500,
        "currency": "USD"
    },
    {
        "id": "8f356500-de35-4378-b7a3-5c587da54cd5",
        "symbol": "AAPL",
        "companyName": "Apple",
        "price": 174.78,
        "quantity": 500,
        "currency": "USD"
    },
    {
        "id": "5f92c4c3-b6b9-4538-9e80-d587217e8410",
        "symbol": "VOD",
        "price": 130.02,
        "quantity": 3290,
        "currency": "GBP"
    },
    {
        "id": "00000000-0000-0000-0000-000000000000",
        "symbol": "XXX",
        "price": 99.99,
        "quantity": 100,
        "currency": "GBP"
    },
    {
        "id": "155ac33b-05c4-42f7-a446-0b7ffacf2504",
        "symbol": "VOD",
        "price": 128.91,
        "quantity": 8500,
        "currency": "GBP"
    }
];


//----------------------
// The method to improve.
// Submit a revised version of this function below, making any changes
// you believe improve the code while satisfying the requirements above.
//----------------------
function doProcesstrades(ddata) {
    var a = {},
        tradesret = [],
        count = null;
        a.symbols = [];
    for (let i = 0; i < ddata.length; i++) {
        var b = ddata[i];
        count = !count ? 1 : (count + 1);

        // 1) add up prices
        if (!a["total" + b.currency]) {
            a["total" + b.currency] = b.price * b.quantity
        } else {
            a["total" + b.currency] += b.price * b.quantity
        }

        // 2) collect unique symbols
        if (a.symbols.indexOf(b.symbol) === -1) {
            a.symbols.push(b.symbol);
        }

        // 3) handle missing names
        if (!b.companyName) {
            b.companyName = b['symbol'];
        }

        // 4) add trade to returned array
        tradesret.push(b)
    }

    a.tradeCount = count;
    a.trades = tradesret;

    // 5) remove bad trades - be sure to fix count if neeeded
    for (let i = 0; i < a.trades.length; i++) {
        if (a.trades[i].id == '00000000-0000-0000-0000-000000000000') {
            console.error(`Bad trade removed`, a.trades[i])
            a.tradeCount--;
            let badTradeSym = a.trades[i].symbol
            a.symbols.splice(a.symbols.indexOf(badTradeSym), 1)
            a.trades.splice(i, 1);
        }
    }
    return a;
};

doProcesstrades(data);