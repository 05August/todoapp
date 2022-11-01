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
        dataAlbums.forEach(function (album) {
          const index = array.findIndex(e => {
            return e.userId === album.userId;
          });
          if (index !== -1) {
            array[index].data.push({ id: album.id, title: album.title })
          } else {
            array.push({ userId: album.userId, data: [{ id: album.id, title: album.title }] });
          }
        })
        setAlbums(array);
      });

    return () => {

    }
  }, []);


  const renderAlbums = function () {
    return albums.map((album, index) => {
      return album.data.map((data, index) => {
        return (
          <ul key={index}>{data.title}</ul>
        )
      })
    })
  }

  return (
    <>
      <div>
        {renderAlbums()}
      </div>
    </>
  );
}

export default Example;