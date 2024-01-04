import { useContext } from "react";
import { RoundContext } from "../../../lib/RoundContext";

const SignModal = (props) => {
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
                恶意参与者地址
              </h2>
              <form onSubmit={props.onSubmit}>
                <div>
                  <textarea
                    name="advice"
                    className="border rounded-xl p-3 my-2"
                    placeholder={`请输入恶意参与者，以 “,” 隔开；\n若无，则可直接提交进入计票阶段。`}
                    rows="6"
                    cols="50"
                  ></textarea>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <input
                    type="submit"
                    className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4"
                    value="提交"
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

export default SignModal;
