import SiteHead from "../components/SiteHead";
import Layout from "../components/Layout";
import Main from "../components/NewNomination/Main";

import { rounds } from "../data/rounds";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import { RoundContext } from "../lib/RoundContext";

import { contractInitNomination } from "../lib/contractInitNomination";

export default function NewNomination() {
  //RoundID
  const router = useRouter();
  const roundID = router.query.id;
  const { rounds, setRounds } = useContext(RoundContext);

  //END

  //IPFS
  const [ipfs, setIpfs] = useState(null);
  useEffect(() => {
    setIpfs(
      create({
        url: "http://127.0.0.1:5001/api/v0",
      })
    );
  }, []);
  //END

  //Form submit
  async function formSubmit(event) {
    event.preventDefault();

    const {
      nominatorName,
      projectName,
      projectURL,
      fundingAmount,
      projectDescription,
      futurePlan,
    } = event.target.elements;
    const nominationInfo = {
      nominatorName: nominatorName.value,
      projectName: projectName.value,
      projectURL: projectURL.value,
      fundingAmount: fundingAmount.value,
      projectDescription: projectDescription.value,
      futurePlan: futurePlan.value,
    };
    const res = await ipfs.add(JSON.stringify(nominationInfo));
    const ipfsURI = `ipfs://${res.path}`;
    nominationInfo.address = ipfsURI;
    rounds[roundID].nominations.push(nominationInfo);
    rounds[roundID].nominationCounter = rounds[roundID].nominations.length;
    setRounds(rounds);
    alert(
      `第${+roundID + 1}轮资助的提案已成功提交！\n提案信息地址：${ipfsURI}`
    );
    router.push("round-detail?id=" + roundID);
    // const metadata = JSON.stringify({
    //   ipfsURI: ipfsURI,
    //   recipientAddress: recipientAddress.value
    // })
    // console.log(metadata)
    // console.log(roundID)
    // console.log(recipientAddress.value)
    // await contractInitNomination(roundID, ipfsURI, recipientAddress.value)
    // create transaction with staking
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
