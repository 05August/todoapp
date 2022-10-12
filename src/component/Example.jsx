import React, { useState, useEffect } from 'react';

function Example() {
  const [albums, setAlbums] = useState([]);
  const array = [];
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(res => {
        return res.json()
      })
      .then(dataAlbums => {
        setAlbums(dataAlbums);
        // array.push({ userId: dataAlbums[0].userId, data: [{ id: dataAlbums[0].id, title: dataAlbums[0].title }] });
        // console.log("dataAlbums[0].userId", dataAlbums[0].userId)
        // console.log("array", array)
        // dataAlbums.forEach(function (album) {
        //   const index = array.findIndex(e => {
        //     e.userId = album.userId;
        //     console.log("🚀 ~ file: Example.jsx ~ line 19 ~ index ~ album.userId", album.userId)
        //     console.log("🚀 ~ file: Example.jsx ~ line 19 ~ e.userId", e.userId);
        //   });
        //   console.log("🚀 ~ file: Example.jsx ~ line 17 ~ useEffect ~ index", index)
        //   console.log('id của mảng ', album.userId)
        //   if (index !== -1) {
        //     array[index].data.push({ id: album.id, title: album.title })
        //   } else {
        //     console.log('thuận')
        //     array.push({ userId: album.userId, data: [{ id: album.id, title: album.title }] });
        //   }
        //   console.log(album);

        // })

        for (let i = 0; i < 9; i++) {
          //index tìm kiếm phần tử chứa userId tồn tại trong array
          const index = array.findIndex(e => {
            return e.userId = dataAlbums[i].userId;
          });
          console.log("Index trong array", index);
          if (index !== -1) {
            // case này xảy ra khi mà tìm thấy userId trong array
            console.log('Kiểm tra userId', dataAlbums[i].userId)
            array[index].data.push({ id: dataAlbums[i].id, title: dataAlbums[i].title })
          } else {
            // case này xảy ra khi mà không tìm thấy userId trong array
            console.log("kiểm tra userId case không tìm thấy", dataAlbums[i].userId)
            array.push({ userId: dataAlbums[i].userId, data: [{ id: dataAlbums[i].id, title: dataAlbums[i].title }] });
            console.log('mảng sau khi insert phần tử đầu tiên', array)
          }
        }
        console.log(array.findIndex(e => {
          return e.userId = dataAlbums[10].userId;
        }))
        console.log('array', array);
      });

    return () => {

    }
  }, []);


  const renderAlbums = function () {
    return albums.map((album, index) => {
      return (
        <ul key={index}>{album.title}</ul>
      )
    })
  }

  // const [nameInput, setNameInput] = useState('');
  // const [textValid, setTextValid] = useState('');

  // useEffect(() => {
  //   console.log('.')
  //   if (nameInput.length < 6) {
  //     console.log('check valid')
  //     setTextValid("Name is not valid");
  //   }
  // }, [nameInput]);
  // useEffect(() => {
  //   if (nameInput.length === 0 || nameInput.length >= 6) {
  //     setTextValid('');
  //   }
  // }, [nameInput]);
  return (
    // <form>
    //   <label htmlFor="nameInput">Name:</label>
    //   <input type="text" name="nameInput" onChange={(e) => { setNameInput(e.target.value) }} value={nameInput} />
    //   <p style={{ color: 'red' }}>{textValid}</p>
    // </form>
    <>
      <div>
        {renderAlbums()};
      </div>
    </>
  );
}

export default Example;