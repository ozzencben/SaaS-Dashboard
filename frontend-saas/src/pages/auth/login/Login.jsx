import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/customButton/CustomButton";
import CustomCheckBox from "../../../components/CustomCheckBox/CustomCheckBox";
import CustomInput from "../../../components/customInput/CustomInput";
import Spacer from "../../../components/spacer/Spacer";
import { AuthContext } from "../../../context/auth/AuthContext";
import "./LoginStyles.css";

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Kullanıcı bilgileri dolu mu kontrolü (buton için)
  const isAvailable = userData.email !== "" && userData.password !== "";

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(userData);
      navigate("/");
      console.log("Login is successful");
    } catch (err) {
      console.error("Login failed", err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <Spacer />
        <div className="bar"></div>
        <Spacer size={30} />
        <h1 className="heading">LOGIN</h1>
        <Spacer size={30} />
        <div className="form">
          <CustomInput
            name="email"
            placeholder="Email"
            icon={FaUser}
            iconSize={30}
            iconColor="white"
            value={userData.email}
            onChange={handleChange}
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
          <div className="remember-me">
            <CustomCheckBox />
            <span className="remember-text">Remember Me</span>
          </div>
          <Spacer size={20} />
          <CustomButton
            title="Sign In"
            onClick={handleLogin}
            disabled={!isAvailable}
          />
        </div>
        <Spacer size={20} />
        <div className="register-prompt">
          <p className="prompt-text">Don't have an account yet?</p>
          <a href="register" className="prompt-link">
            Sign Up
          </a>
        </div>
        <Spacer size={20} />
      </div>
    </div>
  );
};

export default Login;
