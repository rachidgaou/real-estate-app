import React, { useState } from "react";
import "../css/prop.css"
function Properties(){
    const [city, setCity] = useState('')
    const [price, setPrice]= useState('')

    const properties = [
        { city: "Casa", price: 1000, img: "/images/1.jpg" },
    { city: "Casa", price: 2000, img: "/images/2.jpg" },
    { city: "Rabat", price: 3000, img: "/images/3.jpg" },
    { city: "Rabat", price: 3000, img: "/images/4.jpg" },
    { city: "Sale", price: 3000, img: "/images/5.jpg" },
    { city: "Sale", price: 4000, img: "/images/6.jpg" },
    { city: "Rabat", price: 7000, img: "/images/7.jpg" },
    { city: "Sale", price: 8000, img: "/images/8.jpg" },
    { city: "Sale", price: 4000, img: "/images/9.jpg" },
    ];
    const filtering = properties.filter((s)=>
    s.city.toLowerCase().includes(city.toLowerCase())&&
    (price ===""||s.price ===Number(price)))
    
    return (
        <div>
            <div className="search">
        <input type="text" value={city}placeholder="city search"
        onChange={(e)=>setCity(e.target.value)}/>

        <input type="text" value={price} 
        placeholder="price search"
        onChange={(e)=>setPrice(e.target.value)}/>
        </div>

        
<div className="imgcont" >
    {filtering.map((m,index)=><div key={index}> 
        <img src={m.img}/>
        <p>{m.city}</p>
          <p>{m.price}</p>
          <button>Contact button</button>
        </div> )}
</div>
  
    </div>
      )
}
export default Properties