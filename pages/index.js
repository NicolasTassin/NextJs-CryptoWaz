import Layout from "../components/Layout";
import Link from "next/link";


export default function Home({ cryptoData }) {
  
  return (
    <Layout page="CryptoWaz">
      <ul className="md:flex sm:flex-row justify-around py-10 ">
        {cryptoData.map((crypto, index) => (
          
          <li
            index={index}
            key={index}
            className="relative hover:shadow-md p-8 border border-yellow-300 rounded-3xl bg-yellow-100 md:w-auto flex-1 mx-5"
          >
            <Link href="/">
              <a className="rounded-md">
                <div className="text-center">
                  <img
                    src={crypto.logo_url}
                    alt={crypto.name}
                    className="w-20 h-20 mx-auto mb-6"
                  />
                </div>
                <h2 className="text-22xl mb-6 uppercase tracking-wider">
                  {crypto.name}
                </h2>
                <h3 className="font-bold text-22xl mb-4">
                  {parseFloat(crypto.price).toFixed(2)} $USD
                </h3>
                <p>
                  1 Day:{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["1d"].price_change_pct * 100).toFixed(2)}{" "}
                    %{" "}
                  </span>
                  {crypto["1d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p>
                  30 Days:{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["30d"].price_change_pct * 100).toFixed(2)}{" "}
                    %{" "}
                  </span>
                  {crypto["30d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p>
                  1 Year:{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["365d"].price_change_pct * 100).toFixed(2)}{" "}
                    %{" "}
                  </span>
                  {crypto["365d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
   try {
   
    const cryptoData = await fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=demo-b5d84e505a11969a7184f899fbb40ae1&ids=BTC,ETH,UNI,LINK,AAVE,DOT&interval=1d,30d,365d"
    ).then((cryptoData) => cryptoData.json());

    return {
      props: { cryptoData },
      revalidate: 1,
    };
  } catch (err) {
    console.error(err);
  }
}
