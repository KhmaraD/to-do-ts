import React, {useEffect, useRef, useState} from 'react';
import styles from './InputTask.module.scss';

interface inputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<inputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {

  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [valueInput, setValueInput] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode])

  return (
    <div className={styles.inputTask}>
      <div className={styles.inputTaskWrapper}>
        <input
          type="checkbox"
          checked={checked}
          disabled={isEditMode}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 300);
            }
          }}
        />
        { isEditMode
          ? (
            <input
              value={valueInput}
              ref={editTitleInputRef}
              onChange={(e) => setValueInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEdited(id, valueInput);
                  setIsEditMode(false);
                }
              }}
              className={styles.inputTaskEditTitle}
            />
          )
          : (
            <h3
              className={styles.inputTaskTitle}
              onClick={(e) => {
                if (e.detail === 2 ) {
                  setIsEditMode(true);
                }
              }}
            >
              {title}
            </h3>
          )
        }

      </div>
      {isEditMode
        ? <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, valueInput);
            setIsEditMode(false);
          }}
        />
        : (
          <button
            aria-label="Edit"
            className={styles.inputTaskEdit}
            onClick={() => {
              setIsEditMode(true);
            }}
          />
        )
      }

      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};

