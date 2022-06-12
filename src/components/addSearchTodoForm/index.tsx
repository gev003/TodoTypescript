import classNames from "classnames";
import { useEffect, useState } from "react";
import { IAddTodoItem } from "../../types/types";
import DrawInput from "../drawInputWithLabel";
import styles from "./index.module.scss";

type OwnProps = {
  addOrUpdateTodo: (inputValue: IAddTodoItem) => void;
  filterAndSetSearchData: (inputValue: string) => void;
  editableData: any;
};

const TodoForm = ({
  addOrUpdateTodo,
  filterAndSetSearchData,
  editableData,
}: OwnProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    addOrUpdateTodo({ name, description });

    setName("");
    setDescription("");
  };

  const setSearchData = (value: string) => {
    setSearchValue(value);
    filterAndSetSearchData(value);
  };

  useEffect(() => {
    if (editableData) {
      const {
        element: { name, description },
      } = editableData;
      setName(name);
      setDescription(description);
    } else {
      setName("");
      setDescription("");
    }
  }, [editableData]);

  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={onFormSubmit}
        className={classNames(styles.form__group, styles.field)}
      >
        <DrawInput
          value={name}
          onChangeHandler={setName}
          name="name"
          maxLength={25}
        />
        <DrawInput
          value={description}
          onChangeHandler={setDescription}
          name="description"
          maxLength={70}
        />
        <button type="submit" className={styles.submitBtn}>
          {editableData ? "Edit" : "Add"}
        </button>
      </form>

      <div className={styles.searchInputWrapper}>
        <DrawInput
          onChangeHandler={setSearchData}
          name="search"
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default TodoForm;
