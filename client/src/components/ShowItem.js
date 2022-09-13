import '../css/showitem.css';
import { useEffect, useState } from 'react';


function ShowItem() {
  console.log("__dirname")
  console.log(__filename)


  const [state, setState] = useState({
    item_id : 1167566, name : "Loading",price: "Loading",rating: "Loading",
    discription: "Loading",
    image1: "NoImage",image2: "NoImage",image3: "NoImage",image4: "NoImage",
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
                image1: response.default.images.pic1,image2: response.default.images.pic2,
                image3: response.default.images.pic3,image4: response.default.images.pic4
              }
            )
          ); // stateに反映する
      };
      access_db(); 
  }, []);


  console.log(state)
  console.log(`${process.env.PUBLIC_URL}` + `${state.image1}`)

  return (
    <div className="ItemArea">
      <p className="ItemPIC">
        <img src={`${process.env.PUBLIC_URL}` + `${state.image1}`}/>
      </p>
      <p className='name'> Name : {state.name ?? "loading"} </p>
      <p className='price'> Price : {state.price ?? "loading"} </p>
      <p className='rating'> Rating : {state.rating ?? "loading"} </p>
      <p className='description'> Discription : {state.discription ?? "loading"} </p>      
    </div>
  );
}

export default ShowItem;