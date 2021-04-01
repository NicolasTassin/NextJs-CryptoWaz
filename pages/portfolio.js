import Layout from "../components/Layout";
import signRequest from "../components/Crypto-com.js/Signature"
import publicAuth from "../components/Crypto-com.js/Auth"
import { w3cwebsocket, W3CWebSocket } from "websocket";
import { useEffect, useLayoutEffect } from "react";


export default function Portfolio(cryptoData) {

    const apiKey = process.env.CRYPTO_API; /* User API Key */
    const apiSecret = process.env.CRYPTO_SECRET; /* User API Secret */

    // const subscription = {
    //     id: 11,
    //     method: "subscribe",
    //     params: {
    //         channels: ["user.balance"]
    //     },
    //     nonce: Date.now()
    // };


    const cryptoClient = new w3cwebsocket('wss://uat-stream.3ona.co/v2/user');

    useEffect(() => {
        cryptoClient.onopen = () => {
            //cryptoClient.send(JSON.stringify(signRequest(request, apiKey, apiSecret)))

             
            cryptoClient.send(JSON.stringify(publicAuth(auth, apiKey, apiSecret)))
            // cryptoClient.send(JSON.stringify(subscription))


        }
        cryptoClient.onmessage = (message) => {
            console.log(message.data, "this is the message data");
        };

    });






    let request = {
        id: 11,
        method: "public/auth",
        api_key: apiKey,
        nonce: Date.now(),
    };
    const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret));

    let signature = signRequest(request, apiKey, apiSecret).sig


    let auth = {
        id: 11,
        method: "public/auth",
        api_key: apiKey,
        sig: signature,
        nonce: Date.now(),
    };



    let balance = {
        id: 11,
        method: "subscribe",
        api_key: apiKey,
        params: {
            channels: ["user.balance"]
        },
        nonce: Date.now(),
    };

    // let privateAccount = {
    //     "id": 11,
    //     "method": "private/get-account-summary",
    //     "params": {},
    //     "nonce": 1587523073344
    // }





    const authBody = JSON.stringify(publicAuth(auth, apiKey, apiSecret));

    const balanceBody = JSON.stringify(signRequest(balance, apiKey, apiSecret));

    return (
        <Layout page="portfolio">
            <h1>Request body</h1>
            <h2>{requestBody}</h2>
            <h1>Auth body</h1>
            <h2>{authBody}</h2>
            <h1>balance</h1>
            <h2>{balanceBody}</h2>
            <h1>cryptoData</h1>
            <h2>{JSON.stringify(cryptoData)}</h2>


        </Layout>
    )

}



export async function getStaticProps(context) {
    try {

        const cryptoData = await fetch(
            "https://uat-api.3ona.co/v2/public/get-ticker?instrument_name=BTC_USDT"
        ).then((cryptoData) => cryptoData.json());

        return {
            props: { cryptoData },
            revalidate: 1,
        };
    } catch (err) {
        console.error(err);
    }
}