import { useEffect, useState } from 'react';
import '../App-fromRiku.css';

function ShowItem(props) {
  const item_id = props.item_id
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
    <div className="ItemArea">
      <p className="ItemPIC">
        <img src={`${process.env.PUBLIC_URL}` + `${state.images[0]}`}/>
      </p>
      <p className='Item_name'>{state.name ?? "loading"} </p>
      <p className='Item_price'> Price : {state.price ?? "loading"} </p>
      <p className='Item_rating'> Rating : {state.rating ?? "loading"} </p>
      <p className='Item_description'>{state.discription ?? "loading"} </p>
      
      <a href="http://localhost:3000/anotherpage.html"> Link Test</a>
    </div>
  );
}

export default ShowItem;