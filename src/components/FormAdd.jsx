import React, { useEffect, useRef, useState } from "react";

export default function FormAdd({ list, setList }) {
  /**
   * hàm thêm mới công việc
   * @param {*} e event object
   */
  const handleAdd = (e) => {
    e.preventDefault();
    const newJob = {
      id: Math.round(Math.random() * 1000),
      name: e.target.name.value,
      complete: false,
    };
    if(newJob.name.trim()===""){
      setIsError(true)
    } else{
      setIsError(false)
    const newList = [...list, newJob];
    e.target.name.value = "";
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));}
  };
  //Ref cho ô input
  const addInput = useRef();
  // focus cho ô input mỗi khi chạy lại ứng dụng
  useEffect(() => {
    addInput.current.focus();
  }, [list.length]);
  //state cho lỗi
  const [isError,setIsError] = useState(false)
  return (
    <>
      <form className="flex gap-4" onSubmit={handleAdd}>
        <input
          ref={addInput}
          placeholder="Nhập tên công việc"
          type="text"
          className="focus:border-blue-700 hover:shadow-md h-9 border outline-none px-4 rounded flex-1"
          defaultValue=""
          name="name"
        />
        <button
          type="submit"
          className="h-9 rounded px-4 border bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white"
        >
          Thêm
        </button>
      </form>
      {isError&& <div className="text-red-500">Không được để trống</div>} 

    </>
  );
}
