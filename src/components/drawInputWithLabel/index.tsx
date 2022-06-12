import styles from "./index.module.scss";

type OwnProps = {
  value?: string;
  onChangeHandler: (inputVal: string) => void;
  name: string;
  maxLength?: number;
};

const DrawInput = ({ value, onChangeHandler, name, maxLength }: OwnProps) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChangeHandler(e.target.value)}
        className={styles.form__field}
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        name={name}
        id={name}
        {...(maxLength && { maxLength })}
        maxLength={maxLength}
        required
      />
      <label htmlFor={name} className={styles.form__label}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    </div>
  );
};
export default DrawInput;
