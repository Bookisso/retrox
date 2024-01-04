import SiteHead from "../components/SiteHead";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

// import { loopOverData } from '../lib/pushoptimismData';

export default function Home() {
  return (
    <div className="bg-[#070048]">
      {/* SITE HEAD */}
      <SiteHead
        title="Fund with us"
        description="Retro-generative public goods funding"
      ></SiteHead>
      {/* MAIN BODY */}
      <main className="grid justify-center h-screen w-screen overflow-hidden pt-40">
        {/* MAIN GRID */}
        <div className="bg-[#070048] grid justify-center w-screen">
          <p className="text-white text-8xl h-full p-75 content-center justify-center grid font-bold">
            FUND WITH US!
          </p>
          {/* <div className="bg-[#070048] justify-content content-center grid">
            <Image src='/logo.jpeg' width="600" height="400" className=""></Image>
          </div> */}
          <div className="bg-[#070048] w-full justify-center grid">
            <Link href="/rounds">
              <a className="bg-white text-black p-6 rounded-2xl my-20 z-50 text-3xl h-20 font-bold content-center justify-center grid">
                进入
              </a>
            </Link>
            {/* <button onClick={() => loopOverData(5)} className="text-white">Push data</button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
