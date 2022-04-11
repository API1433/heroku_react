import { Input } from "antd";
import "./InputField.css";

const InputField = (props) => {
    return (
        <>
            <Input
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                type={props.type}
                prefix={props.prefix}
                suffix={props.suffix}
                className={props.className}
                disabled={props.disabled}
                addonBefore={props.addonBefore}
            />
        </>
    );
};
export default InputField;
