import React from 'react'

export default function DeleteArlert({itemName}) {
  return (
   <>
   <div className="w-[490px]  shadow px-6 py-5 bg-white rounded">
  <div className="py-2 flex items-center justify-between">
  </div>
  <div className="flex items-center py-2 gap-3">
    <i className="text-[#F06666] fa-solid fa-circle-exclamation text-2xl" />
    <div className='text-red-600'>
      Bạn có xác nhận xóa công việc <b>{itemName}</b>  không?
    </div>
  </div>
</div>
   </>
  )
}
