//*เก่า ------------------------------------------------------

import axios from "axios";
import { useState, useEffect } from "react";

export default function ModalEdit(props) {
  const { el, closeModal, setTrigger } = props;
  const [input, setInput] = useState({
    name: "",
  });
  const [status, setStatus] = useState([])

  useEffect( ()=> {
    let allStatus = JSON.parse(localStorage.getItem('status'))
    if(allStatus) {
      return setStatus(allStatus)
    }
    const run = async () => {
      const token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8889/todos/all-status', {
        headers : { Authorization : `Bearer ${token}`}
      })
      localStorage.setItem('status', JSON.stringify(rs.data.status))
      setStatus(rs.data.status)
    }
    run()
  }, [] )

  useEffect(() => {
    setInput({
      name: el?.name,
    });
  }, [el?.id]);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const output = { ...input };
      const token = localStorage.getItem("token");
      const rs = await axios.put(`http://localhost:8000/product/${el.id}`, output, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // alert("Update OK");
      setTrigger(prv => !prv)
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Todo title</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              name="title"
              value={input.name}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full max-w-[220px] ">
            <div className="label">
              <span className="label-text">Due Date</span>
            </div>
            <input type="date" name="dueDate" value={input.name} onChange={hdlChange} />
          </label>
          <select className="select select-bordered w-full max-w-xs"
            name="status"
            value={input.name}
            onChange={hdlChange}
          >
            {status.map(el => (
              <option key={el} value={el}>{el}</option>
            ))}
          </select>
          <button type='submit' className="btn btn-primary" onClick={closeModal}>Update</button>
          <button type='button' className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

//*ใหม่ ------------------------------------------------------
// import axios from "axios";
// import { useState, useEffect } from "react";

// export default function ModalEdit(props) {
//   const { el, closeModal, setTrigger } = props;
//   const [input, setInput] = useState({
//     name: "",
//   });
//   const [status, setStatus] = useState([])

//   // useEffect( ()=> {
//   //   let allStatus = JSON.parse(localStorage.getItem('status'))
//   //   if(allStatus) {
//   //     return setStatus(allStatus)
//   //   }
//   //   const run = async () => {
//   //     const token = localStorage.getItem('token')
//   //     const rs = await axios.get('http://localhost:8889/todos/all-status', {
//   //       headers : { Authorization : `Bearer ${token}`}
//   //     })
//   //     localStorage.setItem('status', JSON.stringify(rs.data.status))
//   //     setStatus(rs.data.status)
//   //   }
//   //   run()
//   // }, [] )

//   useEffect(() => {
//     setInput({
//       name: el?.name,
//     });
//   }, [el?.id]);

//   const hdlChange = (e) => {
//     setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
//   };
//   const hdlSubmit = async (e) => {
//     try {
//       e.preventDefault();

//       const output = { ...input };
//       const token = localStorage.getItem("token");
//       const rs = await axios.put(`http://localhost:8000/product/${el.id}`, output, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
      
//       // alert("Update OK");
//       setTrigger(prv => !prv)
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <dialog id="my_modal_2" className="modal">
//       <div className="modal-box">
//         <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
//           <label className="form-control w-full ">
//             <div className="label">
//               <span className="label-text">Todo title</span>
//             </div>
//             <input
//               type="text"
//               placeholder="Type here"
//               className="input input-bordered w-full "
//               name="title"
//               value={input.name}
//               onChange={hdlChange}
//             />
//           </label>
//           <label className="form-control w-full max-w-[220px] ">
//             <div className="label">
//               <span className="label-text">Due Date</span>
//             </div>
//             <input type="date" name="dueDate" value={input.name} onChange={hdlChange} />
//           </label>
//           <select className="select select-bordered w-full max-w-xs"
//             name="status"
//             value={input.name}
//             onChange={hdlChange}
//           >
//             {status.map(el => (
//               <option key={el} value={el}>{el}</option>
//             ))}
//           </select>
//           <button type='submit' className="btn btn-primary" onClick={closeModal}>Update</button>
//           <button type='button' className="btn btn-secondary" onClick={closeModal}>Cancel</button>
//         </form>
//       </div>
//       <form method="dialog" className="modal-backdrop">
//         <button>close</button>
//       </form>
//     </dialog>
//   );
// }
