import  { useState, useEffect } from "react";
import "../css/Contact.css"
import * as XLSX from "xlsx";
function Contact(){
    const [name, setname] = useState('')
    const [message, setmessage]= useState('')
    const [email, setEmail]= useState('')
    const [subject, setSubject]= useState('')
    const [elements, setElements]= useState([])
    const [editId, setEditId] = useState(null)
  //////////////:::export to server
 useEffect(()=>{
  const updated = async()=>{
    const res = await fetch("http://localhost:8000/contact")
    const data = await res.json()
    setElements(data)
  }
  updated()
 },[])




    //////////////:to excel

    const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(elements);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

  XLSX.writeFile(workbook, "contacts.xlsx");
};
    ////////////adda items///////////////////:
    const adddElements = ()=>{
        if (editId!==null){
            upDate()
        } else{
            createElement()
        }
    }
////////////////////////////////////////////:
    const edit = (id)=>{
        const found  = elements.find((item)=>item._id ===id)
        if (!found)return
        setEditId(id)
        setname(found.name)
        setEmail(found.email)
        setmessage(found.message)
        setSubject(found.subject)
    }
/////////////////////////////////////////////
    const upDate=  async ()=>{
        if (editId!==null){
          const res =  await fetch(`http://localhost:8000/contact/${editId}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify({name: name,
             message: message, email: email, subject: subject})
      })
            const data = await res.json()
            setEditId(null)
            setElements( elements.map(item =>
    item._id === editId ? data : item
  ))
            setname("");
  setEmail("");
  setSubject("");
  setmessage("");
        }}


   
    /////creating elements/////
    
    const createElement =  async()=>{
      const res = await fetch("http://localhost:8000/contact",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify({name: name,
             message: message, email: email, subject: subject})
      })
      const data = await res.json()
      setElements(prev =>[...prev, data])
      
    setname("");
  setEmail("");
  setSubject("");
  setmessage("");}
    ///////deleting:::::::::::::::::::::::::::::

    const del = async(id)=>{
   await fetch(`http://localhost:8000/contact/${id}`,{
        method: "DELETE"})
      setElements(elements.filter ((item)=>item._id !==id))
    }

    
    return (
        
        <div className="all">
            <div className="container">
                <div className="cont">
            <label>Email</label>
            <input type="text" />
            <label>Phone number</label>
            <input type="text"/>
            <label>Name</label>
            <input type="text" value={name}
            onChange={(e)=>setname(e.target.value)}
            />
            <label>Email</label>
            <input type="text"value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <label>Subject</label>
            <input type="text" value={subject}
            onChange={(e)=>setSubject(e.target.value)}/>
            <label>Message</label>
            <textarea value={message}
            onChange={(e)=>setmessage(e.target.value)}></textarea>
            <button onClick={adddElements}>Submit</button>
        </div>
        <button onClick={exportToExcel} className="excel">
  Export to Excel
</button>
        </div>
<table>
  <thead>
  
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Subject</th>
      <th>Message</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {elements.map((item) => (
        
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.subject}</td>
        <td>{item.message}</td>
        <td>
          <button onClick={() => edit(item._id)}>Edit</button>
          <button onClick={() => del(item._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
    )
}
export default Contact