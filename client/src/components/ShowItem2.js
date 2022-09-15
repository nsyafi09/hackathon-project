import './placeholder.css';
import { useEffect, useState } from 'react';


function ShowItem() {
  console.log("__dirname")
  console.log(__filename)


  const [state, setState] = useState({
    item_id : "circle-y:10416641", name : "Loading",price: "Loading",rating: "Loading",
    discription: "Loading",
    images: [0],
  });

  // CAll API HERE
  // For now, just read json and sparse that data.
  // Ref : https://qiita.com/apollo_program/items/01fa3c4621155f64f930
  useEffect(() => {
      // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
      const access_db = async () => {
          const response = await import("../JSON/Apexlegends.json");
          console.log(response)
          console.log(response.default.name)
          setState(
            (prevState) => (
              {
                ...prevState, item_id: response.default.item_id,
                name: response.default.name, price: response.default.price,
                rating: response.default.rating,
                discription: response.default.description,
                images: response.default.images
              }
            )
          ); // stateに反映する
      };
      access_db(); 
  }, []);

  // TODO
  // - make css to align info like Figma
  // - prepare codes that proccess rating star rendering


  console.log(state)
  console.log(`${process.env.PUBLIC_URL}` + `${state.image1}`)

  return (
    <section className="item-container">
      <div className="item-picture">
        <img src={`${process.env.PUBLIC_URL}` + `${state.images[1]}`}/>
      </div>
      <div className="item-details">
        <p className='Item_name'>{state.name ?? "loading"} </p>
        <p className='Item_price'> Price : {state.price ?? "loading"} </p>
        <p className='Item_rating'> Rating : {state.rating ?? "loading"} </p>
        <p className='Item_description'>{state.discription ?? "loading"} </p>
        <button className='item-url'>
          <a href="/">Buy!</a>
        </button>
      </div>
      
      {/* <a href="http://localhost:3000/anotherpage.html"> Link Test</a> */}
    </section>
  );
}

export default ShowItem;