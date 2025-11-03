import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget4() {
  const container = useRef();
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (scriptAdded.current) return; // prevent adding script again
    scriptAdded.current = true;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `{
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
          "name": "Forex",
          "symbols": [
            { "name": "FX_IDC:EURAED", "displayName": "EUR/AED" },
            { "name": "FX_IDC:GBPAED", "displayName": "GBP/AED" },
            { "name": "FX_IDC:CADAED", "displayName": "CAD/AED" },
            { "name": "FX_IDC:USDAED", "displayName": "USD/AED" }
          ]
        }
      ]
    }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container mt-3" ref={container}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}

export default memo(TradingViewWidget4);
