const { get_crypto_data, backtest } = require('fastquant');
const { Prophet } = require('fbprophet');
const pandas = require('pandas');
const { plot } = require('matplotlib');

// Function to get crypto data and fit model
async function getCryptoDataAndFitModel(symbol, startDate, endDate) {
  console.log(`Fetching crypto data for ${symbol} from ${startDate} to ${endDate}`);
  const df = await get_crypto_data(symbol, startDate, endDate);

  const ts = df.reset_index()[["dt", "close"]];
  ts.columns = ['ds', 'y'];
  const m = new Prophet({ daily_seasonality: true, yearly_seasonality: true });
  await m.fit(ts);

  const forecast = m.make_future_dataframe({ periods: 0, freq: 'D' });
  const pred = m.predict(forecast);
  const fig1 = m.plot(pred);
  plot.title('BTC/USDT: Forecasted Daily Closing Price', { fontsize: 25 });

  return { df, pred };
}

// Function to backtest the predictions
function backtestPredictions(df, pred) {
  const expected_1day_return = pred.set_index("ds").yhat.pct_change().shift(-1).multiply(100);
  df["custom"] = expected_1day_return.multiply(-1);
  backtest("custom", df.dropna(), { upper_limit: 1.5, lower_limit: -1.5 });
}

// Example usage
(async () => {
  const { df, pred } = await getCryptoDataAndFitModel("BTC/USDT", "2019-01-01", "2020-05-31");
  backtestPredictions(df, pred);
})();
