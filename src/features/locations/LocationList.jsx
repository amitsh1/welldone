import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export function CategoryList(props) {
  
  const [selected, setSelected] = useState(null);
  const { entities } = useSelector((state) => state.categories);
  const loading = useSelector((state) => state.loading);



  const handleSelect = (id,name) => {
    if (id==selected){
      setSelected(null);
      props.onselect(null,false)
      
    }
    else{
      setSelected(id);
      props.onselect(id,name)
    }
    
  };


  return (
    
    <div className="container">
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {entities.length? entities.map(({ id, name, email }, i) => (
                  <tr key={i} onClick={()=> handleSelect(id,name)} bgcolor={selected==id?"#ff6600":"white"}>
                    <td>{id}</td><td>{name}</td>
                  </tr>
                )):null}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
