import { useState } from "react";
const LengthInput = () => {

    const [length,setLength]= useState('16');
    return ( <> <input type='range' id="lengthInput" min={6} max={16} value={length} onChange={(e)=> setLength(e.target.value)}></input>
    <p>{length}</p></> );
}
 
export default LengthInput;