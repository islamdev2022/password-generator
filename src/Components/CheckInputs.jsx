import { useState, useEffect } from "react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import LengthInput from "./LengthInput";

const CheckInputs = () => {
  const [length, setLength] = useState(16);
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

  // Check if at least one checkbox is checked
  const isAtLeastOneChecked = Object.values(options).some((value) => value);

  return (
    <>
      <input
        type="range"
        id="lengthInput"
        min={6}
        max={16}
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <p>{length}</p>
      <form>
        {Object.keys(options).map((key) => (
          <label key={key}>
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
      <button onClick={generatePassword} disabled={!isAtLeastOneChecked}>
        Generate Password
      </button>
      <p>Generated Password: {password}</p>
      <PasswordStrengthMeter password={password} />
    </>
  );
};

export default CheckInputs;
