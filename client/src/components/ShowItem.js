import './placeholder.css';
import { useEffect, useState } from 'react';



function ShowItem(props) {
  // const item_id = props.item_id
  const item_id = "ezaki-g:10225380"
  console.log("__dirname")
  console.log(__filename)


  const [state, setState] = useState({
    item_id : 1167566, name : "Loading",price: "Loading",
    discription: "Loading",
    images: [0],
  });

  // CAll API HERE
  // Ref : https://qiita.com/apollo_program/items/01fa3c4621155f64f930
  useEffect(() => {
      // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
      const access_db = async () => {
        const requestOptions ={
          method: 'GET'
        };
      const url = "http://herozxzx.aa0.netvolante.jp:3001/get_item/" + item_id
      const response_raw = await fetch(url,requestOptions); // External API
      const response = await response_raw.json();
      // const response = await import("../item_data_full.json");
      console.log("GET Item Response is");
      console.log(response_raw);
      setState(
        {
          item_id: response.item_id,
          name: response.name, price: response.price,
          discription: response.description,
          images: response.images
        }
      ); // set state for re-render
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
        {/* <p className='Item_rating'> Rating : {state.rating ?? "loading"} </p> */}
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