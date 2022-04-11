import { Button } from "antd";
require("./Button.css");

const ButtonReuse = (props) => {
    return (
        <Button
            type={props.type}
            htmlType={props.htmlType}
            className={props.className}
            size={props.size ?? "default"}
            icon={props.icon}
            onClick={props.onClick}
            style={props.style}
        >
            {props.value}
        </Button>
    );
};

export default ButtonReuse;
