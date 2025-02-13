console.log("Welcome to fastquant!");

// Example function to get stock data
function getStockData(symbol, startDate, endDate) {
  console.log(`Fetching stock data for ${symbol} from ${startDate} to ${endDate}`);
  // Implement the logic to fetch and display stock data
}

// Example function to backtest a trading strategy
function backtest(strategy, data, options) {
  console.log(`Backtesting strategy ${strategy} with options:`, options);
  // Implement the logic for backtesting
}

// Example usage
getStockData("JFC", "2018-01-01", "2019-01-01");
backtest("smac", [], { fast_period: 15, slow_period: 40 });
