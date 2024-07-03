import React, { useEffect, useRef, useState } from "react";
import FormAdd from "./FormAdd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteArlert from "./DeleteArlert";
import { Modal } from "antd";
import FormEdit from "./FormEdit";

export default function List() {
    //lấy list công việc từ localstorage
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
//stage modalDelete
  const [isModalDelete, setIsModalDelete] = useState(false);
  /**
   * hàm mở modal delete
   */
  const showModalDelete = () => {
    setIsModalDelete(true);
  };
/**
 * hàm xóa
 * @param {*} index vị trí item trong mảng
 */
  const handleOkDelete = (index) => {
    list.splice(index, 1);
    const newList = list;
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setIsModalDelete(false);
  };
  /**
   * cancel delete
   */
  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };
  // stage lưu tên mới
  const [newName, setNewName] = useState();
  //stage modalEdit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  /**
   * hàm chỉnh sửa
   * @param {*} index vị trí item trong mảng
   */
  const handleOk = (index) => {
    list[index].name = newName;
    const newList = [...list];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setIsModalOpen(false);
  };
  /**
   * hàm đóng modal edit
   */
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //stage lưu trữ số công việc đã hoàn thành
  const [completed, setCompleted] = useState(localStorage.getItem("complete")||0);
/**
 * hàm thay đổi số công việc đẫ hoàn thành
 * @param {*} e event object
 * @param {*} index ví trí của item trong mang
 */
  const handleComplete = (e,index) => {
    list[index].complete = !list[index].complete;
    const newList = [...list];
    setList(newList);
    let change;
    localStorage.setItem("list", JSON.stringify(newList));
    if (e.target.checked) {
        change = completed +1
      setCompleted(completed + 1);
    } else {
        change = completed - 1

      setCompleted(completed - 1);
    }
    localStorage.setItem("complete",newList.filter(item=>item.complete===true).length)
  };

  return (
    <>
      <div id="root">
        <div className="flex justify-center items-center mt-[10%]">
          <div className="border rounded-md shadow-md py-5 px-20 min-w-[60%]">
            <h3 className="text-center font-bold text-xl py-6">
              Danh sách công việc
            </h3>
            <FormAdd list={list} setList={setList} />
            <ul className="flex flex-col gap-3 mt-5 max-h-72 overflow-y-auto">
              {list.length > 0 ? (
                <>
                  <ul>
                    {list.map((item, index) => (
                      <>
                        <li className="flex px-2 rounded justify-between items-center hover:bg-gray-200 cursor-pointer">
                          <div className="flex gap-2 items-center">
                            <input
                            checked={item.complete}
                              type="checkbox"
                              className="h-4 w-4 cursor-pointer"
                              onChange={(e)=>handleComplete(e,index)}
                            />
                            {item.complete?<s>{item.name}</s> :<label>{item.name}</label> }
                          </div>
                          <div className="flex gap-4">
                            <EditOutlined onClick={showModal} />
                            <DeleteOutlined onClick={showModalDelete} />
                          </div>
                        </li>
                        <Modal
                          title="Xác nhận"
                          open={isModalDelete}
                          onOk={() => handleOkDelete(index)}
                          onCancel={handleCancelDelete}
                        >
                          <DeleteArlert />
                        </Modal>
                        <Modal
                          title="Cập nhật công việc"
                          open={isModalOpen}
                          onOk={() => handleOk(index)}
                          onCancel={handleCancel}
                        >
                          <FormEdit
                            index={index}
                            list={list}
                            setNewName={setNewName}
                          />
                        </Modal>
                      </>
                    ))}
                  </ul>
                  {completed === list.length ? (
                    <>
                      <div className="mt-3 bg-gray-100 p-2 rounded">
                        <div className="flex items-center justify-center">
                          <CheckOutlined />
                          Hoàn thành công việc
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 bg-gray-100 p-2 rounded">
                      Công việc đã hoàn thành: <b> {completed}</b>/{" "}
                      <b>{list.length}</b>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="py-4 text-center items-center flex flex-col">
                    <img
                      className="h-48 w-52 shadow-lg "
                      src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg"
                      alt=""
                    />
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
