const Example = ({avtGroup,groupName,arrMember,typeCard,description,task}) => {
  return <div className="containerExample">
    <div className="header">
      <p>{avtGroup}</p>
      <div>
        <h1>{groupName}</h1>
        <p>{arrMember}</p>
      </div>
      <p>{typeCard}</p>
    </div>
    <div className="description">
      <p>đây là những dòng mô tả</p>
    </div>
    <div className="task">
      đây là ô task + icon
    </div>
  </div>
}

export default Example;