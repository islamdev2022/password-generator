import { useState, useEffect } from "react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import LengthInput from "./LengthInput";

const CheckInputs = () => {
  const [length, setLength] = useState(6);
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const generatePassword = () => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+[]{}|;:,.<>?",
    };

    const selectedCharsets = [];

    for (const key in options) {
      if (options[key]) {
        selectedCharsets.push(charset[key]);
      }
    }

    if (selectedCharsets.length === 0) {
      alert("Please select at least one character type.");
      return;
    }

    let allChars = selectedCharsets.join("");

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          alert("Password copied to clipboard!");
        })
        .catch((error) => {
          console.error("Copy to clipboard failed: ", error);
        });
    } else {
      alert("There's no password to copy.");
    }
  };

  // Check if at least one checkbox is checked
  const isAtLeastOneChecked = Object.values(options).some((value) => value);

  return (<div className="all">
    <div className="Container">
    <div className="pass-copy">
      <p>{password}</p>
      <button  onClick={copyToClipboard} disabled={!password}><img src="images/icon-copy.svg" alt="copy" width={15}/></button>
    </div>
    <div className="length">
      <div className="char-length"><p>Character Length : </p><p className="nbr">{length}</p></div>
      <input
        type="range"
        id="lengthInput"
        min={6}
        max={16}
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
    </div>
    
      
      <form>
        {Object.keys(options).map((key) => (
          <label key={key}><br></br>
            <input
              type="checkbox"
              onChange={() =>
                setOptions({ ...options, [key]: !options[key] })
              }
            />
            Include {key.charAt(0).toUpperCase() + key.slice(1)} Letters
          </label>
        ))}
      </form>
      <PasswordStrengthMeter password={password} />
      <button className="generate" onClick={generatePassword} disabled={!isAtLeastOneChecked}>
        GENERATE <img src="images/icon-arrow-right.svg" alt="arrow" width={10}/>
      </button>    
    </div></div>
  );
};

export default CheckInputs;
