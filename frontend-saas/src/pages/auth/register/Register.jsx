import { useContext, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import CustomButton from "../../../components/customButton/CustomButton";
import CustomInput from "../../../components/customInput/CustomInput";
import Spacer from "../../../components/spacer/Spacer";
import { AuthContext } from "../../../context/auth/AuthContext";
import { checkAvailability } from "../../../services/AuthServices";
import "./RegisterStyles.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      // Debounce ile API çağrılarını azalt
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        checkEmailAvailability(value);
      }, 300);
    }
  };

  const checkEmailAvailability = async (email) => {
    if (!email) return;
    try {
      await checkAvailability(email);
      setEmailError(false);
    } catch (err) {
      setEmailError(true);
      console.error("Email availability check failed:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      console.log("Registration is successful");
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <Spacer />
        <div className="bar"></div>
        <Spacer size={30} />
        <h1 className="heading">Register</h1>
        <Spacer size={30} />
        <div className="form">
          <CustomInput
            placeholder="Fullname"
            icon={BsPersonCircle}
            iconSize={30}
            iconColor="white"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <Spacer />
          <CustomInput
            placeholder="Email"
            icon={MdOutlineAlternateEmail}
            iconSize={30}
            iconColor="white"
            name="email"
            value={userData.email}
            onChange={handleChange}
            hasError={emailError}
          />
          <Spacer />
          <CustomInput
            name="password"
            placeholder="Password"
            icon={RiLockPasswordFill}
            iconSize={30}
            iconColor="white"
            type="password"
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
            value={userData.password}
            onChange={handleChange}
          />
          <Spacer size={20} />
          <CustomButton title="Sign Up" onClick={handleRegister} />
        </div>
        <Spacer size={20} />
        <div className="login-prompt">
          <p className="prompt-text">Do you already have an account?</p>
          <a href="login" className="prompt-link">
            Sign In
          </a>
        </div>
        <Spacer size={20} />
      </div>
    </div>
  );
};

export default Register;
