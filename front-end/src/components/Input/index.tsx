import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: boolean;
  position?: "top" | "bottom";
  type: string;
}

const Input: React.FC<InputProps> = ({
  name,
  icon,
  containerStyle,
  position,
  type,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEye, setIsEye] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [value, setValue] = useState<string>(() => {
    const value =
      localStorage.getItem(`Traveler:signin-form-${fieldName}`) || "";

    return value;
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleToggleEye = useCallback(() => {
    setIsEye((state) => !state);
  }, []);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      style={containerStyle}
      position={position}
      icon={!!icon}
    >
      <div className="treatmentInput">
        {(!isEmpty || value) && <label>{rest.placeholder}</label>}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          onChange={(event) => {
            setIsEmpty(event.target.value === "" ? true : false);
            setValue(event.target.value);
          }}
          type={isEye ? "text" : type}
          value={value}
          {...rest}
        />
      </div>

      {icon !== undefined || false ? (
        isEye ? (
          <FiEye size={22} color="#f25d27" onClick={handleToggleEye} />
        ) : (
          <FiEyeOff size={22} onClick={handleToggleEye} />
        )
      ) : null}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
