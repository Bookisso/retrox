export default function Form(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="row-span-3 col-span-4 bg-white rounded-xl shadow-md">
        <div className="overflow-y-auto p-5">
          <form onSubmit={props.onSubmit}>
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">资助轮次名称</label>
                <input
                  type="text"
                  placeholder="请输入名称"
                  name="roundName"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">资助总额 (eth)</label>
                <input
                  type="number"
                  placeholder="0.1"
                  name="funding"
                  step="0.001"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">提案周期 (天)</label>
                <input
                  type="number"
                  placeholder="21"
                  name="nominationDuration"
                  step="1"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">投票周期 (天)</label>
                <input
                  type="number"
                  placeholder="7"
                  name="votingDuration"
                  step="1"
                  className="border rounded-xl p-2"
                  required
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">资助描述</label>
                <input
                  type="text"
                  placeholder="请输入资助描述"
                  name="description"
                  className="border rounded-xl p-2"
                  required
                  maxLength="400"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">专家信息</label>
                <textarea
                  name="badgeholders"
                  className="border rounded-xl p-2"
                  placeholder="请输入专家地址"
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
                text="创建新轮次"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
