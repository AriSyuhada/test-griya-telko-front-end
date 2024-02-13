import { FaCheck, FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";
import HouseBuy from "../assets/house-buy-illustration.png"
import HouseSell from "../assets/house-sell-illustration.png"
import HouseRent from "../assets/house-rent-illustration.png"
import { Link } from "react-router-dom";

const ASSETS = {
  'buy': HouseBuy,
  'sell': HouseSell,
  'rent': HouseRent
}

export default function Landing() {

  return (
    <div className="flex flex-col">
      <header className="flex flex-row bg-gradient-to-b from-white to-slate-200">
        <div className="basis-2/5 flex flex-col justify-center items-start px-24 gap-10">
          <h1 className="text-4xl text-start font-extrabold text-emerald-600">Welcome to Real Estates: Your Premier Destination for Buying and Selling Properties!</h1>
          <h2 className="text-2xl text-start font-semibold text-slate-800">We buy and sell homes in <span className="font-bold text-emerald-600">any conditions</span> for <span className="font-bold text-emerald-600">CASH!</span></h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-row items-center gap-4">
              <div className="flex justify-center items-center p-1 rounded-full border-4 border-emerald-600">
                <FaCheck className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-slate-800 text-xl font-semibold"><span className="text-emerald-600 font-bold">NO</span> realtor commisions</h3>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex justify-center items-center p-1 rounded-full border-4 border-emerald-600">
                <FaCheck className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-slate-800 text-xl font-semibold"><span className="text-emerald-600 font-bold">NO</span> closing costs</h3>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex justify-center items-center p-1 rounded-full border-4 border-emerald-600">
                <FaCheck className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-slate-800 text-xl font-semibold"><span className="text-emerald-600 font-bold">NO</span> repair expenses</h3>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex justify-center items-center p-1 rounded-full border-4 border-emerald-600">
                <FaCheck className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-slate-800 text-xl font-semibold"><span className="text-emerald-600 font-bold">NO</span> waiting months</h3>
            </div>
          </div>
          <div className="flex flex-row">
            <button className="cursor-pointer px-6 py-4 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-white text-2xl font-bold uppercase">Request for more offers today</button>
          </div>
        </div>
        <div className="basis-3/5 flex justify-center items-center">
          <div className="overflow-hidden mx-24 my-16 rounded-3xl">
            <img className="object-cover" src="https://images.unsplash.com/photo-1611444143036-6678f7f94652?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="header-pict" />
          </div>
        </div>
      </header>

      <div className="flex flex-col justify-center items-center py-20 bg-slate-100">
        <h2 className="text-4xl font-semibold text-slate-800 mb-4">Whether you&apos;re <span className="text-emerald-600">buying</span>, <span className="text-emerald-600">selling</span> or <span className="text-emerald-600">renting</span>,</h2>
        <h2 className="text-3xl font-semibold text-slate-800">we can help you move forward.</h2>
        <div className="flex flex-row justify-center gap-12 my-12">
          <div className="flex flex-col gap-6 items-center py-12 px-6 rounded-lg text-center bg-white basis-[calc(25%-1.5rem)]">
            <img src={ASSETS.buy} alt="buy-illustration" />
            <h4 className="text-2xl font-bold text-emerald-600">Sell a home</h4>
            <p className="text-wrap text-xl text-slate-800">Find your place with an immersive photo experience and the most listings, including things you won&apos;t find anywhere else</p>
            <button className="mt-auto cursor-pointer px-4 py-2 bg-white hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-emerald-600 hover:text-white font-bold">Load More</button>
          </div>
          <div className="flex flex-col gap-6 items-center py-12 px-6 rounded-lg text-center bg-white basis-[calc(25%-1.5rem)]">
            <img src={ASSETS.sell} alt="sell-illustration" />
            <h4 className="text-2xl font-bold text-emerald-600">Rent a home</h4>
            <p className="text-wrap text-xl text-slate-800">No matter what path you take to sell your home, we can help you navigate a successful sale.</p>
            <button className="mt-auto cursor-pointer px-4 py-2 bg-white hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-emerald-600 hover:text-white font-bold">Load More</button>
          </div>
          <div className="flex flex-col gap-6 items-center py-12 px-6 rounded-lg text-center bg-white basis-[calc(25%-1.5rem)]">
            <img src={ASSETS.rent} alt="rent-illustration" />
            <h4 className="text-2xl font-bold text-emerald-600">Buy a home</h4>
            <p className="text-wrap text-xl text-slate-800">We&apos;re creating a seamless online experience &ndash; from shopping on the largest rental network, to applying, to paying rent.</p>
            <button className="mt-auto cursor-pointer px-4 py-2 bg-white hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-emerald-600 hover:text-white font-bold">Load More</button>
          </div>
        </div>
      </div>

      <footer className="bg-slate-800 px-4 md:px-8 lg:px-28 py-12 xl:px-32 3xl:px-72 4xl:px-96 text-white">
        <div className="flex flex-col lg:flex-row mb-16 space-x-0 lg:space-x-10 space-y-12 lg:space-y-0">
          <div className="basis-3/4">
            <h2 className="font-semibold text-4xl mb-8 text-start max-w-[60%]">Your Premier Destination for Buying and Selling Properties!</h2>
            <div className="flex flex-grow flex-col sm:flex-row max-w-[50%] sm:max-w-[100%] space-x-0 sm:space-x-4 space-y-3 sm:space-y-0">
              <button className="cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-xl text-white font-bold uppercase">Request Cash Offer!</button>
              <button className="flex flex-row items-center justify-center gap-4 cursor-pointer px-4 py-2 bg-white hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-emerald-600 hover:text-white font-bold text-xl uppercase"><FaPhone size="1.2rem" /> (0888) 123-4567</button>
            </div>
          </div>
          <div className="basis-1/4 space-y-4">
            <Link to='/' className="text-lg font-extrabold uppercase text-white">Real <span className="text-emerald-600">Estate</span> App</Link>
            <div className="flex flex-row space-x-2">
              <FaFacebook size="1.2rem" />
              <FaYoutube size="1.2rem" />
              <FaInstagram size="1.2rem" />
              <FaTwitter size="1.2rem" />
            </div>
            <p className="flex flex-row items-center">
              <span className="mr-2"><FaEnvelope size="1.5rem" /></span>
              real-estates@example.com
            </p>
            <p className="flex flex-row items-center">
              <span className="mr-2"><FaLocationDot size="1.5rem" /></span>
              Jakarta, Indonesia
            </p>
          </div>
        </div>
        <h4 className="text-center opacity-30">©Copyright {new Date().getFullYear()} Real Estates</h4>
      </footer>
    </div>
  );
}