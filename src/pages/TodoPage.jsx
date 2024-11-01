// hook
import { useState } from "react";

// component
import DButton from "../components/DButton";
import DCheckbox from "../components/DCheckbox";
import { FaPlus } from "react-icons/fa";

const TodoPage = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
    console.log("Checkbox value changed:", checked);
  };
  return (
    <div>
      <h1>todopage</h1>

      <DButton label="新增任務" density="comfortable" onClick={handleClick} />
      <DButton label="新增任務" onClick={handleClick} />
      <DButton label="新增" appendIcon={<FaPlus />} size="large" />
      <DCheckbox
        isChecked={isChecked}
        onChange={handleCheckboxChange}
        label="基本選項"
      />
    </div>
  );
};

export default TodoPage;
