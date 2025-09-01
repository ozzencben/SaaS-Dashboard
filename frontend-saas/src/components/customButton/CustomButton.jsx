import "./ButtonStyles.css";

const CustomButton = ({ title, onClick, disabled }) => {
  return (
    <button className="custom-btn" onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default CustomButton;
