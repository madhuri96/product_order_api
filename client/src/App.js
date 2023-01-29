import { useState, useEffect} from 'react';
import axios from "axios";       //import axios to make HTTP requests



function App() {
  const [todata, setData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/reports/1")          //get request
    .then((result)=>{
      setData(result.data);
      console.table(result.data);
      // console.log(result.data);
    }).catch(err => console.log(err));
  },[]);                       //[] only fires one time when the component loads



  const arr = todata.map((data,index)=>{
    return(
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td> {data.phone}</td>
      
    </tr>
    )
  });

  return (
  <div>
    {arr}
  </div>
  ); 
}

export default App;
