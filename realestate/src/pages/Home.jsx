import  { useState } from "react";
import "../css/home.css";

function Home() {
  const [city, setCity] = useState("");
  const [price, setPrice]= useState("")

  const properties = [
    { city: "Casa", price: 1000, img: "/images/1.jpg" },
    { city: "Casa", price: 2000, img: "/images/2.jpg" },
    { city: "Rabat", price: 3000, img: "/images/3.jpg" },
    { city: "Rabat", price: 3000, img: "/images/4.jpg" },
    { city: "Sale", price: 3000, img: "/images/5.jpg" },
    { city: "Sale", price: 4000, img: "/images/6.jpg" },
  ];

const filtered = properties.filter((p) =>
  p.city.toLowerCase().includes(city.toLowerCase()) &&
  (price === "" || p.price === Number(price))
);
  return (
    <>
      <h1>Find Your Dream Home</h1>

      <div className="searchhero">
        <input
          type="text"
          placeholder="City Filter"
          value={city}
          onChange={(e) => setCity(e.target.value)}/>
          <input type="text"placeholder="Price search"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}/>

      </div>
      <div></div>

      <h2>Featured Properties</h2>

      <div className="imgContainer">
        
        {filtered.map((p, index) => (
          <div key={index}>
            <img src={p.img} />
            <p>{p.city}</p>
            <p>{p.price}</p>
            <button>Details</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;