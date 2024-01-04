import { useContext } from "react";
import { RoundContext } from "../../../lib/RoundContext";

const DelegateModal = (props) => {
  const { rounds, setRounds } = useContext(RoundContext);
  const { roundID, isDelegated, delegators } = props;
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
                {props.isDelegated
                  ? "被委托候选者地址"
                  : "请填入被委托候选者的地址"}
              </h2>
              <form onSubmit={props.onSubmit}>
                <div>
                  <div
                    className="flex flex-col py-4"
                    style={{ width: "500px" }}
                  >
                    <label className="text-xl ml-1 mb-4 text-left font-semibold">
                      候选者1地址
                    </label>
                    <div className="grid">
                      {isDelegated ? (
                        <>
                          <div className="flex flex-start ml-1 text-left">
                            {delegators[0]}
                          </div>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="请输入地址"
                            name="address1"
                            className="border rounded-xl p-2"
                            required
                          ></input>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col py-4">
                    <label className="text-xl ml-1 mb-4 text-left font-semibold">
                      候选者2地址
                    </label>
                    {isDelegated ? (
                      <>
                        <div className="flex flex-start ml-1 text-left">
                          {delegators[1]}
                        </div>
                      </>
                    ) : (
                      <input
                        type="text"
                        placeholder="请输入地址"
                        name="address2"
                        className="border rounded-xl p-2"
                        required
                      ></input>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                  {isDelegated ? (
                    <>
                      <input
                        type="button"
                        className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4 cursor-pointer"
                        value="确认"
                        onClick={() => {
                          props.close();
                        }}
                      ></input>
                    </>
                  ) : (
                    <input
                      type="submit"
                      className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4 cursor-pointer"
                      value="提交"
                    ></input>
                  )}
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

export default DelegateModal;
