import React, { useState, useEffect } from 'react';

function PasswordStrengthMeter({ password }) {
  const [strength, setStrength] = useState('Weak');

  useEffect(() => {
    // Define conditions for password strength
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    // Calculate strength based on conditions
    if (password.length >= 8 && hasUppercase && hasLowercase && hasNumber && hasSymbol) {
      setStrength('Strong');
    } else if (password.length >= 8) {
      setStrength('Moderate');
    } else {
      setStrength('Weak');
    }
  }, [password]);

  return (
    <div>
      <p>Password Strength: {strength}</p>
    </div>
  );
}

export default PasswordStrengthMeter;
