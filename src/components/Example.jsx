import React, { useState, useEffect, useContext } from "react";
import CountContext from "./CountContext";

// function Example() {
//   const [albums, setAlbums] = useState([]);
//   const array = [];
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/albums')
//       .then(res => {
//         return res.json()
//       })
//       .then(dataAlbums => {
//         dataAlbums.forEach(function (album) {
//           const index = array.findIndex(e => {
//             return e.userId === album.userId;
//           });
//           if (index !== -1) {
//             array[index].data.push({ id: album.id, title: album.title })
//           } else {
//             array.push({ userId: album.userId, data: [{ id: album.id, title: album.title }] });
//           }
//         })
//         setAlbums(array);
//       });

//     return () => {

//     }
//   }, []);

//   const renderAlbums = function () {
//     return albums.map((album, index) => {
//       return album.data.map((data, index) => {
//         return (
//           <ul key={index}>{data.title}</ul>
//         )
//       })
//     })
//   }

//   return (
//     <>
//       <div>
//         {renderAlbums()}
//       </div>
//     </>
//   );
// }

// export default Example;

function Example() {
  const { count, upCount, downCount, changeCount, tinhLuyThua } =
    useContext(CountContext);
  const [valueInput, setValueInput] = useState();
  const [result, setResult] = useState();

  return (
    <div className="layout">
      <h3>COUNT: {count}</h3>

      <button onClick={upCount}>UP</button>

      <button onClick={downCount}>DOWN</button>

      <br />
      <h1>{result}</h1>

      <input
        type="number"
        value={valueInput}
        onChange={(e) => {
          setValueInput(e.target.value);
        }}
      />

      <button
        onClick={() => {
          setResult(tinhLuyThua(valueInput - 0));
        }}
      >
        Change Count
      </button>
    </div>
  );
}

export default Example;
