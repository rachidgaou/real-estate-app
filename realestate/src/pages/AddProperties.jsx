import { useState, useEffect } from "react"
import "../css/prop.css"
function AddProperties (){
 const [name, setName]= useState('')
 const [img, setImg] = useState('')
 const [price, setPrice]= useState('')
 const [elements, setElements]= useState([])
 const [form, setForm] = useState(false)
 const [editId, setEditId] = useState(null)
 /////////////linkt o serevr//////////////////////
 useEffect(()=>{
    const updated = async ()=>{ 
        const res = await fetch("http://localhost:8000/AddProperties")
        const data = await res.json()
        setElements(data)     
    }
    updated()
 },[])



 //////additem/////////
 const addItem = ()=>{
    if (editId!==null){
        update()
              setForm(false)

    } else{ createProperty()
       
  

    }
     setForm(false)
 }
 //////const editing///////////
 const edit = (id)=>{
    const found = elements.find((item)=>item._id ===id)
    if (!found)return
    setEditId(id)
    setName(found.name)
    setImg(found.img)
    setPrice(found.price)
    
 }
 ///////////////update////////////
 const update = async ()=>{
  
         const res = await fetch(`http://localhost:8000/AddProperties/${editId}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: name, img: img, price:price })
    } )
    const data = await res.json()

        setEditId(null)
      setElements(prev =>prev.map(item =>item._id === editId 
        ? data : item))
        setImg('')
        setPrice('')
        setName('')
 }
 //////////////////////////create
 const createProperty = async  ()=>{
    const res = await fetch("http://localhost:8000/AddProperties",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: name, img: img, price:price })
    } )
    const data = await res.json()

    setElements( prev=>[...prev,data])
    setImg('')
        setPrice('')
        setName('')
 }
 ////////////:delete///////////////
 const del =  async (id)=>{
    await fetch(`http://localhost:8000/AddProperties/${id}`,{
        method: "Delete"})

    setElements( elements.filter((item)=>item._id!==id))
 }

    return (
        <div>
<button onClick={()=>setForm(true)}>Add  property</button>

{form&&(<div className="global">
    <img src={img}  />
    
    <input type="text"  onChange={(e)=>
        setImg(e.target.value)} value={img} placeholder="image source"/>
         
         <input type="text" placeholder="name" onChange={(e)=>
        setName(e.target.value)} value={name}/>
        
         <input type="text" placeholder="Price" onChange={(e)=>
        setPrice(e.target.value)} value={price}/>
        <button  onClick={addItem}>Add</button>
</div>)}
<div className="divcontainer">

    {elements.map((s)=><div className="done" key={s._id}>
      <img src={s.img}></img>
        <p >{s.name}</p>
        <p >{s.price}</p>
        <button onClick={()=>del(s._id)}>Delete</button>
        <button onClick={()=>edit(s._id)}>Edit</button>
    </div>)}
</div>

</div>
    )
}
export default AddProperties