import { useContext } from "react";
import { RoundContext } from "../../../lib/RoundContext";

const AdviceModal = (props) => {
  const { rounds, setRounds } = useContext(RoundContext);
  const { roundID, nomination } = props;
  const isAdviced = rounds[roundID].nominations[nomination].advice;
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-5"
        onClick={() => {
          props.close();
        }}
      >
        <div className="relative w-auto my-6 mx-auto max-w-full max-h-screen my-5 mx-5 py-5">
          <div
            className="border rounded-2xl shadow-lg relative bg-white flex flex-col w-full outline-none focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="relative px-20 py-8 flex-auto mx-auto text-center text-xl">
              <h2 className="font-bold text-3xl my-4 text-blue-600">
                评审信息
              </h2>
              <form onSubmit={props.onSubmit}>
                <div>
                  <div className="flex flex-col py-4">
                    <label className="text-xl ml-1 mb-4 text-left font-semibold">
                      是否通过评审
                    </label>
                    <div className="grid grid-cols-4 ">
                      {isAdviced ? (
                        <>
                          <div className="flex flex-start ml-1">
                            {isAdviced.pass ? "" : "不"}通过
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-start">
                            <input
                              type="radio"
                              name="pass"
                              value={true}
                              className="checked:bg-blue-500 mx-2"
                              id="pass"
                              required
                            ></input>
                            <label htmlFor="pass">通过</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="pass"
                              value={false}
                              className="checked:bg-blue-500 mx-2"
                              id="unpass"
                            ></input>
                            <label htmlFor="unpass">不通过</label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col py-4">
                    <label className="text-xl ml-1 mb-4 text-left font-semibold">
                      评审意见
                    </label>
                    {isAdviced ? (
                      <>
                        <div className="flex flex-start ml-1 w-96 text-left">
                          {isAdviced.advice}
                        </div>
                      </>
                    ) : (
                      <textarea
                        name="advice"
                        className="border rounded-xl p-2"
                        placeholder="请输入评审意见"
                        rows="4"
                        cols="50"
                        required
                      ></textarea>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <input
                    type="submit"
                    className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4"
                    value={isAdviced ? "确认" : "提交"}
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AdviceModal;
