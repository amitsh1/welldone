import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationTable from "../../components/LocationTable/LocationTable";

export function LocationList(props) {
  
  const [selected, setSelected] = useState(null);
  const { entities } = useSelector((state) => state.locations);
  console.log(entities,'entities');
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
    
    <LocationTable data={entities}/>
  );
}
