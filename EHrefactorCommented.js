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

        // 1) add up prices  - Done

        // simplify else statement formula, improve readability and clarity of code

        if (!a["total" + b.currency]) {
            a["total" + b.currency] = b.price * b.quantity
        } else {
            // a["total" + b.currency] = a["total" + b.currency] + b.price * b.quantity
            a["total" + b.currency] += b.price * b.quantity
        }

        // 2) collect unique symbols  - Done

        // removed line about symbols, but into initial creation of a to prevent constantly looping and checking the value of a
        // changed if statement looking for less than zero, indexOf only returns -1 if not found
        // changed .concat to .push, faster method saves time

        //if (!a.symbols) a.symbols = [];
        if (a.symbols.indexOf(b.symbol) === -1) {
            //a.symbols = a.symbols.concat([b.symbol])
            a.symbols.push(b.symbol);
        }

        // 3) handle missing names  - Done

        // Simplify if statement to solely look for if b.companyName is returned, the API either won't return it or will, it won't return bad data
        // Set b.companyName only to b['symbol'], '?????' are not useable for companyName 

        if (!b.companyName) {
            b.companyName = b['symbol'];
        }

        // 4) add trade to returned array  - Done

        // changed .concat to .push, takes less time
        
        tradesret.push(b)
    }

    a.tradeCount = count;
    a.trades = tradesret;

    // 5) remove bad trades - be sure to fix count if neeeded - Done

    // instead of incrementing and subtracting a removed count, just decrement a.tradeCount whenever a bad trade is found, simplifies functionality, saves space.
    // modify console log to return readable data instead of [object Object]

    //var removed = 0
    for (let i = 0; i < a.trades.length; i++) {
        if (a.trades[i].id == '00000000-0000-0000-0000-000000000000') {
            console.error(`Bad trade removed`, a.trades[i])
            //removed++;
            a.tradeCount--;
            let badTradeSym = a.trades[i].symbol
            a.symbols.splice(a.symbols.indexOf(badTradeSym), 1)
            a.trades.splice(i, 1);
        }
        //a.tradeCount = a.tradeCount - removed;
    }
    console.log(a);
    return a;
};

doProcesstrades(data);