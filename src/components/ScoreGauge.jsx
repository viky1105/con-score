export default function ScoreGauge({ score }) {

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) * circumference;

  return (
    <div className="flex justify-center mt-8">

      <svg
        width="240"
        height="240"
        className="-rotate-90"
      >

        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="#222"
          strokeWidth="16"
          fill="transparent"
        />

        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="#22c55e"
          strokeWidth="16"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />

      </svg>

      <div className="absolute mt-[85px] text-center">

        <h2 className="text-6xl font-black text-green-400">
          {score}
        </h2>

        <p className="text-zinc-400">
          ApeScore
        </p>

      </div>

    </div>
  );
}