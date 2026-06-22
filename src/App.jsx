import { useState } from "react";
import { motion } from "framer-motion";
import { scanToken } from "./api";
import { calculateScore } from "./score";
import Background from "./components/Background";
import ScoreGauge from "./components/ScoreGauge";
import CryptoTicker from "./components/CryptoTicker";

export default function App() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const CON_CA =
  "---";

  const shortenAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`; // Shows first 4 and last 4 characters
};

  const copyCA = async () => {
  await navigator.clipboard.writeText(CON_CA);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

  const analyze = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const data = await scanToken(token);
      setResult(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const score = result ? calculateScore(result) : 0;

  const verdict =
    score >= 80
      ? "LOW RISK"
      : score >= 60
      ? "MEDIUM RISK"
      : "HIGH RISK";

  return (
    <>
      <CryptoTicker />
      <Background />

      <div className="min-h-screen pt-20 flex items-center justify-center px-4 text-white">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >

          {/* Header */}

          <div className="text-center mb-10">

           <h1 className="text-7xl md:text-8xl font-black text-center">

               <span className="glow-title text-green-400">
                 CON SCORE
               </span>

               <span
                 className="ml-3 text-cyan-400"
                 style={{
                   textShadow: `
                     0 0 10px #22d3ee,
                     0 0 20px #22d3ee,
                     0 0 40px #22d3ee
                   `,
                 }}
               >
                 AI
               </span>

             </h1>
            <p className="text-zinc-400 mt-3 text-lg">
              Instant Solana Rug Detection
            </p>

<div className="mt-8 flex justify-center">

  <div className="
    bg-green-500/10
    border
    border-green-500/20
    rounded-full
    px-5
    py-3
    flex
    items-center
    gap-3
  ">

    <span className="text-green-400 font-bold">
      $CON
    </span>

    <span className="text-zinc-400">
      CA:
    </span>

    <span>{shortenAddress(CON_CA)}</span> 

    <button
  onClick={copyCA}
  className="
    px-5
    rounded-xl
    bg-green-500
    hover:bg-green-400
    font-bold
  "
>
  {copied ? "Copied!" : "Copy"}
</button>

  </div>

</div>
            

            
            <div className="
              flex
              justify-center
              gap-10
              mt-8
            ">

              <div>
                <h3 className="text-2xl font-bold">
                  50K+
                </h3>

                <p className="text-zinc-500">
                  Tokens
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  95%
                </h3>

                <p className="text-zinc-500">
                  Accuracy
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  24/7
                </h3>

                <p className="text-zinc-500">
                  Monitoring
                </p>
              </div>

            </div>

          </div>

          {/* Scanner */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste Solana Token Address"
              className="
                w-full
                p-5
                rounded-2xl
                bg-black/40
                border
                border-white/10
                outline-none
              "
            />

            <button
              onClick={analyze}
              disabled={loading}
              className="
                w-full
                mt-4
                p-5
                rounded-2xl
                bg-green-500
                hover:bg-green-400
                font-bold
                transition
              "
            >
              {loading ? "Scanning..." : "Analyze Token"}
            </button>

          </div>

          {/* Results */}

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                mt-8
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <div className="text-center">

                <div className="flex flex-col items-center">

                   {result.logoURI && (
                     <img
                       src={result.logoURI}
                       alt={result.name}
                       className="
                         w-20
                         h-20
                         rounded-full
                         mb-4
                         border
                         border-white/20
                       "
                     />
                   )}

                   <h2 className="text-3xl font-bold">
                     {result.name}
                   </h2>

                   <p className="text-zinc-400">
                     {result.symbol}
                   </p>

                 </div>

                <ScoreGauge score={score} />
                
                <div
                  className={`
                    inline-block
                    mt-4
                    px-5
                    py-2
                    rounded-full
                    font-bold
                    ${
                      verdict === "LOW RISK"
                        ? "bg-green-500/20 text-green-400"
                        : verdict === "MEDIUM RISK"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {verdict}
                </div>

              </div>

              {/* Metrics */}

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-black/30 p-5 rounded-2xl">
                  <p className="text-zinc-400">
                    Price
                  </p>

                  <h3 className="text-xl font-bold">
                    ${result.price?.toFixed(6)}
                  </h3>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl">
                  <p className="text-zinc-400">
                    Liquidity
                  </p>

                  <h3 className="text-xl font-bold">
                    ${Number(result.liquidity).toLocaleString()}
                  </h3>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl">
                  <p className="text-zinc-400">
                    Market Cap
                  </p>

                  <h3 className="text-xl font-bold">
                    ${Number(result.mc).toLocaleString()}
                  </h3>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl">
                  <p className="text-zinc-400">
                    24h Volume
                  </p>

                  <h3 className="text-xl font-bold">
                    ${Number(result.v24hUSD).toLocaleString()}
                  </h3>
                </div>

              </div>
              <div className="
                 mt-8
         bg-black/30
         rounded-2xl
         p-6
       ">

         <h3 className="text-xl font-bold mb-3">
           Would You Ape?
         </h3>

         {score >= 80 && (
           <div>

             <p className="text-green-400 font-bold">
               YES
             </p>

      <p className="text-zinc-400 mt-2">
        Strong liquidity, healthy metrics,
        and relatively low risk.
      </p>

    </div>
      )}

      {score >= 60 && score < 80 && (
        <div>

      <p className="text-yellow-400 font-bold">
        MAYBE
      </p>

      <p className="text-zinc-400 mt-2">
        Some positive indicators,
        but proceed carefully.
      </p>

    </div>
  )}

  {score < 60 && (
    <div>

      <p className="text-red-400 font-bold">
        NO
      </p>

      <p className="text-zinc-400 mt-2">
        Risk indicators are too high.
        Wait for better confirmation.
      </p>

    </div>
  )}

</div>
<div
  className="
    mt-6
    bg-red-500/10
    border
    border-red-500/20
    rounded-2xl
    p-4
  "
>
  <h4 className="text-red-400 font-bold mb-2">
    Risk Disclaimer
  </h4>

  <p className="text-zinc-300 text-sm">
    CON SCORE AI analyzes public token metrics and provides a risk estimate.
    Scores are not guarantees and should not replace independent research.
  </p>
</div>

            </motion.div>
          )}

        </motion.div>

      </div>
    </>
  );
}