import SiteHead from "../components/SiteHead";
import Layout from "../components/Layout";
import Main from "../components/NewRound/Main";

import { rounds } from "../data/rounds";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import { RoundContext } from "../lib/RoundContext";

import { contractInitRound } from "../lib/contractInitRound";

export default function NewRound() {
  const { rounds, setRounds } = useContext(RoundContext);
  //IPFS
  const [ipfs, setIpfs] = useState(null);
  useEffect(() => {
    setIpfs(
      create({
        //       // url: "https://ipfs.infura.io:5001/api/v0",
        //       // url: "http://127.0.0.1:5001/api/v0",
        url: "http://127.0.0.1:5001/api/v0",
      })
    );
  }, []);
  //END

  const router = useRouter();
  //Submit form
  async function formSubmit(event) {
    event.preventDefault();
    console.log("Submit!");
    const {
      roundName,
      funding,
      nominationDuration,
      votingDuration,
      description,
      badgeholders,
    } = event.target.elements;
    let lines = badgeholders.value.split("\n");
    // const splitLines = [];
    // const addressArray = [];
    // lines.forEach((element) => {
    //   // let contents = element.split(",");
    //   // splitLines.push({
    //   //   address: contents[0].trim(),
    //   //   twitter: contents[1].trim(),
    //   // });
    //   // addressArray.push(contents[0].trim());
    //   addressArray.push(element.trim())
    // });
    // console.log(ipfs);
    const newRoundInfo = {
      roundName: roundName.value,
      startBlockTimestamp: new Date().getTime() / 1000,
      funding: +funding.value,
      nominationDuration: +nominationDuration.value * 86400,
      votingDuration: +votingDuration.value * 86400,
      description: description.value,
      badgeholders: lines,
      nominations: [],
      nominationCounter: 0,
    };
    const res = await ipfs.add(JSON.stringify(newRoundInfo));
    const ipfsURI = `ipfs://${res.path}`;
    newRoundInfo.address = ipfsURI;
    // console.log(ipfsURI, "URIURIURI");
    // const metadata = JSON.stringify({
    //   ipfsURI: ipfsURI,
    //   initialPool: funding.value,
    //   addresses: lines,
    // });
    // console.log(metadata);
    // // create transaction with value locked
    // await contractInitRound(
    //   ipfsURI,
    //   lines,
    //   nominationDuration.value * 86400,
    //   votingDuration.value * 86400,
    //   funding.value
    // );
    // (function () {
    //   window.alert = function (name) {
    //     var iframe = document.createElement("IFRAME");
    //     iframe.style.display = "none";
    //     iframe.setAttribute("src", "data:text/plain");
    //     document.documentElement.appendChild(iframe);
    //     window.frames[0].window.alert(name);
    //     iframe.parentNode.removeChild(iframe);
    //   };
    // })();
    rounds.push(newRoundInfo);
    setRounds(rounds);
    alert(`第${rounds.length}轮资助已成功开启！\n资助信息地址：${ipfsURI}`);
    router.push("rounds");
    // console.log("testtest");
  }
  //END

  return (
    <>
      <SiteHead
        title="Retr0x"
        description="Retro-generative public goods funding"
      ></SiteHead>
      <Layout>
        <Main onSubmit={formSubmit}></Main>
      </Layout>
    </>
  );
}
