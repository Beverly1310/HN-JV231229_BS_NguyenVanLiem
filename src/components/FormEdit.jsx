import React, { useState } from "react";

export default function FormEdit({ setNewName, index, list }) {
    // stage cho lỗi
  const [isError, setIsError] = useState(false);
/**
 * hàm chỉnh sửa
 * @param {*} e event object
 */
  const handleEdit = (e) => {
    if (e.target.value.trim() === "") {
      setIsError(true);
    } else {
      setIsError(false);
      setNewName(e.target.value);
    }
  };
  return (
    <>
      <div className="w-[450px]  shadow px-6 py-5 bg-white rounded">
        <div className="py-2 flex items-center justify-between">
          <i className="cursor-pointer px-4 py-3 text-base fa-solid fa-xmark" />
        </div>
        <form>
          <div className="flex flex-col gap-2">
            <label className="text-start font-semibold" htmlFor="jobName">
              Tên công việc
            </label>
            <input
              id="jobName"
              type="text"
              className="rounded h-9 border px-4 outline-none hover:shadow-md shadow focus:border-[#004999]"
              defaultValue={list[index].name}
              onChange={handleEdit}
            />
          </div>
      {isError&& <div className="text-red-500">Không được để trống</div>} 
        </form>
      </div>
    </>
  );
}
