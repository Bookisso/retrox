export default function Form(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="row-span-3 col-span-4 bg-white rounded-xl shadow-md">
        <div className="overflow-y-auto p-5">
          <form onSubmit={props.onSubmit}>
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">项目名称</label>
                <input
                  type="text"
                  placeholder="Retro"
                  name="projectName"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">提案者名称</label>
                <input
                  type="text"
                  placeholder="Retro"
                  name="nominatorName"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">项目URL</label>
                <input
                  type="url"
                  placeholder="Retro"
                  name="projectURL"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">所需资助资金(ETH)</label>
                <input
                  type="number"
                  placeholder="Retro"
                  name="fundingAmount"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">项目描述</label>
                <textarea
                  type="text"
                  name="projectDescription"
                  placeholder="Retro"
                  className="border rounded-xl p-2"
                  rows="4"
                  cols="5"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">未来工作计划</label>
                <textarea
                  name="futurePlan"
                  className="border rounded-xl p-2"
                  placeholder="This is a description"
                  rows="4"
                  cols="50"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <input
                type="submit"
                className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4"
                text="Nominate"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
