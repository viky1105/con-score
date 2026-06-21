export async function scanToken(address) {
  const res = await fetch(
    `https://public-api.birdeye.so/defi/token_overview?address=${address}`,
    {
      headers: {
        "X-API-KEY": import.meta.env.VITE_BIRDEYE_API_KEY,
      },
    }
  );

  const data = await res.json();

  return data.data;
}