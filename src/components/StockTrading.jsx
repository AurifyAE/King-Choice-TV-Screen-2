// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget2() {
  const widgetContainer = useRef(null);

  useEffect(() => {
    if (widgetContainer.current && !widgetContainer.current.querySelector('script')) {
      
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
      script.type = "text/javascript";
      script.async = true;

      script.innerHTML = JSON.stringify({
        "colorTheme": "dark",
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "backgroundColor": "#0F0F0F",
        "support_host": "https://www.tradingview.com",
        "width": "100%", 
        "height": 200, 
        "symbolsGroups": [
          {
            "name": "Indices",
            "symbols": [
              { "name": "DJI", "displayName": "Dow Jones/USD" },
              { "name": "NDQ100", "displayName": "Nasdaq/USD" },
              { "name": "SP500", "displayName": "S&P 500/USD" },
              { "name": "BINANCE:BTCUSD", "displayName": "Bitcoin / USD" }
            ]
          }
        ]
      });

      widgetContainer.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container mt-3" ref={widgetContainer} style={{ height: '240px' }}> 
    </div>
  );
}

export default memo(TradingViewWidget2);