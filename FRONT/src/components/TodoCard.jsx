import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

export default function TodoCard(props) {
  const { el, openModal, setTrigger } = props;

  console.log(el.data)
  // const statusColor = el.status==='PENDING' ? 'bg-pink-300' 
  //   : el.status==='DOING' ? 'bg-blue-300' : 'bg-lime-300'
  // const hdlDelete = async e => {
  //   try {
  // e.stopPropagation()
  // const token = localStorage.getItem('token')
  // let rs = await axios.delete(`http://localhost:8000/product/${el.id}`, {
  //   headers : { Authorization : `Bearer ${token}`}
  // })
  // alert('Delete successful') 
  // setTrigger(prv=>!prv)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  return (
    <div
      // className={`card w-5/6 ${statusColor} shadow-xl mx-auto cursor-pointer
      // active:shadow-none active:translate-x-2 active:translate-y-1`}
      onClick={() => openModal(el.id)}
    >
      <div className="card-body">
        <div className="block w-50 h-60">
          {el.product_img.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Product Image ${index + 1}`}
              className="w-50 h-60 mr-2"
            />
          ))}
          <p className="card-title">{`${el.name} (${el.category.name})`}</p>
          <p className="card-title">{`ราคา ${el.price} บาท`}</p>
          {/* <div className="badge badge-secondary" onClick={hdlDelete}>delete</div> */}
        </div>
        {/* <div className="flex">
          <p>Due-date : {new Date(el.dueDate).toDateString()}</p>
          <p className="text-right">Status : {el.status}</p>
        </div> */}
      </div>
    </div>
  );
}
