import React, { useMemo } from 'react'
import Data from './Data.json'
import './App.css'
import FormComponent from './Form';

var groupBy = function (xs, key, subKey) {

  return xs.reduce(function (rv, x) {

    (rv[x[key]] = rv[x[key]] || []).push(x);
    rv[x[key]].sort((a, b) => a[subKey] - b[subKey]);
    return rv;
  }, {});
};
const App = () => {
  // const [blur, setBlur] = useState([]);
  const datanew = useMemo(() => {
    const newData = Data.map((val) => {
      return {
        ...val,
        sectionName: val.fieldData.sectionName,
        order: val.fieldData.order,
      }
    })
    const newGroupedData = groupBy([...newData], 'sectionName', 'order');
    return newGroupedData;
  }, [])
  console.log(datanew)


  return (
      <FormComponent input={datanew} />   
  );
}
export default App;
