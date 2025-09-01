import { PiEyeClosedLight, PiEyeFill } from "react-icons/pi";
import "./InputStyles.css";

const CustomInput = ({
  placeholder = "",
  value,
  onChange,
  multiline = false,
  rows = 4,
  icon: Icon = null,
  iconSize = 24,
  iconColor = "black",
  type = "text",
  showPassword = false,
  toggleShowPassword = () => {},
  name,
  hasError = false,
}) => {
  return (
    <div className={`input-container ${hasError ? "input-error" : ""}`}>
      {Icon && (
        <Icon
          size={iconSize}
          color={hasError ? "red" : iconColor}
          className="input-icon"
        />
      )}

      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`input ${hasError ? "input-error" : ""}`}
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input ${hasError ? "input-error" : ""}`}
          type={type === "password" && showPassword ? "text" : type}
        />
      )}

      {type === "password" && (
        <span className="password-toggle" onClick={toggleShowPassword}>
          {showPassword ? (
            <PiEyeFill size={24} color={hasError ? "red" : "white"} />
          ) : (
            <PiEyeClosedLight size={24} color={hasError ? "red" : "white"} />
          )}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
