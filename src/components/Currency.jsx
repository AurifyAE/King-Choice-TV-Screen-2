// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget3() {
  const container = useRef(null);
  const initialized = useRef(false); // track initialization

  useEffect(() => {
    if (initialized.current) return; // skip if already initialized
    initialized.current = true;

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          { "proName": "SAXO:USDAED", "title": "" },
          { "proName": "FX:EURUSD", "title": "" },
          { "proName": "FX:USDJPY", "title": "" },
          { "proName": "FX_IDC:USDQAR", "title": "" }
        ],
        "colorTheme": "dark",
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "displayMode": "adaptive"
      }`;

    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full mt-3">
      <div
        className="tradingview-widget-container__widget"
        ref={container}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget3);
