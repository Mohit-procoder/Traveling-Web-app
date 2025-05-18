import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, RefreshCw, TrendingUp, History } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CurrencyConverterPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [conversionHistory, setConversionHistory] = useState<Array<{
    from: string;
    to: string;
    amount: number;
    result: number;
    date: Date;
  }>>([]);

  // Fetch exchange rates from API
  const { data: rates, error, isLoading } = useSWR(
    `https://api.exchangerate.host/latest?base=${fromCurrency}`,
    fetcher
  );

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const calculateConversion = () => {
    if (!rates?.rates?.[toCurrency]) return 10;
    const result = parseFloat(amount) * rates.rates[toCurrency];
    
    // Add to history
    setConversionHistory(prev => [{
      from: fromCurrency,
      to: toCurrency,
      amount: parseFloat(amount),
      result,
      date: new Date()
    }, ...prev.slice(0, 9)]);

    return result.toFixed(2);
  };

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="mb-3">Currency Converter</h1>
          <p className="text-neutral-600 max-w-2xl">
            Convert between different currencies using real-time exchange rates.
            Track your conversions and view popular currency pairs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Converter */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <ArrowRightLeft className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold">Convert</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      From
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="input-field"
                    >
                      {popularCurrencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSwapCurrencies}
                    className="mb-1.5 p-2 text-neutral-500 hover:text-primary-500 transition-colors duration-300"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      To
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="input-field"
                    >
                      {popularCurrencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 animate-spin text-primary-500" />
                  </div>
                ) : error ? (
                  <p className="text-error-500 text-center">
                    Error fetching exchange rates. Please try again.
                  </p>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-neutral-500 mb-2">
                      {amount} {fromCurrency} equals
                    </p>
                    <h3 className="text-4xl font-semibold text-neutral-900 mb-2">
                      {calculateConversion()} {toCurrency}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      1 {fromCurrency} = {rates?.rates?.[toCurrency]?.toFixed(4) || '—'} {toCurrency}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Popular Pairs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-600" />
                </div>
                <h2 className="text-xl font-semibold">Popular Pairs</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CAD', 'AUD/USD', 'USD/CHF'].map(pair => {
                  const [base, quote] = pair.split('/');
                  const rate = rates?.rates?.[quote];
                  return (
                    <div
                      key={pair}
                      className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors duration-300"
                    >
                      <h4 className="font-medium mb-2">{pair}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold">
                          {rate?.toFixed(4) || '—'}
                        </span>
                        <span className="text-success-500 text-sm">+0.12%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Conversion History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <History className="w-6 h-6 text-secondary-600" />
              </div>
              <h2 className="text-xl font-semibold">History</h2>
            </div>

            {conversionHistory.length === 0 ? (
              <p className="text-neutral-500 text-center py-8">
                No conversion history yet.
                Start converting to see your history here.
              </p>
            ) : (
              <div className="space-y-4">
                {conversionHistory.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">
                        {item.amount} {item.from} → {item.to}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {item.date.toLocaleTimeString()}
                      </span>
                    </div>
                    <span className="text-lg font-semibold">
                      {item.result.toFixed(2)} {item.to}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;