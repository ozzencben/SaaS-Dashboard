import { useState } from "react";
import { FaSquareCheck } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import "./CheckStyles.css";

const CustomCheckBox = () => {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="box" onClick={() => setShowIcon(!showIcon)}>
      {showIcon ? (
        <FaSquareCheck size={20} color="#fff" />
      ) : (
        <MdCheckBoxOutlineBlank size={20} color="#fff" />
      )}
    </div>
  );
};

export default CustomCheckBox;
