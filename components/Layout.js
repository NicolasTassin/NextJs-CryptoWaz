import Head from "next/head"
import Link from "next/link"
import Image from "next/image"

export default function Layout({ children, page }) {
  return (
    <div className='bg-yellow-50 pt-5 text-center min-h-screen'>
      <Head>
        <title>{page}</title>
      </Head>
      <header className="container-lg">
        <h1 className ="text-5xl mb-2">Crypto Waz</h1>
        <div className="inline-grid grid-cols-2 gap-x-10 p-4">
          <Link href="/">
            <button
            className="bg-yellow-300 p-3 m-2 rounded-3xl hover:shadow-md border-2 border-yellow-300">
              Home
            </button>
          </Link>
          <Link href="/about">
            <button
            className="bg-yellow-300 p-3 m-2 rounded-3xl hover:shadow-md border-2 border-yellow-300">
              About
            </button>
          </Link>
        </div>
        <div>
          <Image 
          src="/crypto-currency-3130382_1920.jpg" 
          width="400" 
          height="100" 
          className="rounded-3xl object-cover"
          />
        </div>
      </header>
      <main className="pt-4 mx-20">{children}</main>
      <footer className="p-10">
      <Image 
          src="/crypto-currency-3130382_1920.jpg" 
          width="1000" 
          height="100" 
          className="rounded-3xl object-cover"
          />
          <ul className=" pt-10 pb-4 flex justify-around">
            <li>About</li>
            <li>From Scratch</li>
            <li>Portfolio</li>
          </ul>
          <p>
            
          </p>
      </footer>

      <style jsx>{`
        p:{
        color: grey;
        }
        `}</style>
      
    </div>
  );
}
