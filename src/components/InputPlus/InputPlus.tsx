import React, {useCallback, useState} from 'react';
import styles from "./InputPlus.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({onAdd}) => {
  const [inputValue, setInputValue] = useState("");

  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("")
  }, [inputValue])

  return (
    <div className={styles.InputPlus}>
      <input
        type="text"
        className={styles.InputPlusValue}
        value={inputValue}
        placeholder="Add new task..."
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask()
          }
        }}
      />
      <button
        onClick={addTask}
        aria-label="Add"
        className={styles.InputPlusButton}
      />
    </div>
  );
};
