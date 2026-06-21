import { useEffect, useState } from "react";

export default function CryptoTicker() {
  const [coins, setCoins] = useState([]);

  const fetchPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,jupiter-exchange-solana,dogwifcoin,bonk,popcat,fartcoin-3"
      );

      const data = await res.json();

      setCoins(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  
    return (
  <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md border-b border-green-500/20 overflow-hidden z-50 shadow-[0_0_20px_rgba(34,197,94,0.15)]">

    <div className="flex items-center">

      

      <div className="ticker-track">

        {[...coins, ...coins].map((coin, index) => (
          <div
            key={`${coin.id}-${index}`}
            className="flex items-center gap-3 mx-8 whitespace-nowrap shrink-0"
          >
            <img
              src={coin.image}
              alt={coin.symbol}
              className="w-5 h-5 rounded-full"
            />

            <span className="font-bold uppercase">
              {coin.symbol}
            </span>

            <span>
              ${coin.current_price.toLocaleString()}
            </span>

            <span
              className={
                coin.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
        ))}

      </div>

    </div>

  </div>
);
 
}