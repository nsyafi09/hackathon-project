import './placeholder.css';
import { useEffect, useState } from 'react';


function ShowItem() {
  console.log("__dirname")
  console.log(__filename)


  const [state, setState] = useState({
    item_id : 1167566, name : "Loading",price: "Loading",rating: "Loading",
    discription: "Loading",
    images: [0],
  });

  // CAll API HERE
  // For now, just read json and sparse that data.
  // Ref : https://qiita.com/apollo_program/items/01fa3c4621155f64f930
  useEffect(() => {
      // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
      const access_db = async () => {
          const response = await import("../item_data_full.json");
          console.log(response)
          console.log(response.default.name)
          setState(
            (prevState) => (
              {
                ...prevState, item_id: response.default.item_id,
                name: response.default.name, price: response.default.price,
                rating: response.default.rating,
                discription: response.default.description,
                images: response.default.images,
                url: response.default.url
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
        <img src={`${process.env.PUBLIC_URL}` + `${state.images[0]}`}/>
      </div>
      <div className="item-details">
        <h1 className='Item_name'>{state.name ?? "loading"} </h1>
        <p className='Item_price'> Price : {state.price ?? "loading"} </p>
        <p className='Item_rating'> Rating : {state.rating ?? "loading"} </p>
        <p className='Item_description'>{state.discription ?? "loading"} </p>
        <button className='item-url'>
          <a href={state.url}>Buy <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>
</span>
          </a>
        </button>
      </div>
      
      {/* <a href="http://localhost:3000/anotherpage.html"> Link Test</a> */}
    </section>
  );
}

export default ShowItem;