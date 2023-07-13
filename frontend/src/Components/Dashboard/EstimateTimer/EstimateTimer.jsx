import React, {useState, useEffect} from "react";
import {Tooltip, Input} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const TimeEstimationField = ({onHoursChange, defaultValue}) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (defaultValue) {
            setInput(defaultValue);
            handleInputChange({target: {value: defaultValue}});
        }
    }, [defaultValue]);

    const inputStyles = {
        fontSize: "16px",
        padding: "8px",
        borderRadius: "4px",
        border: "2px solid #D9D9D9",
        marginBottom: "16px",
        width: "96%",

    };

    const errorStyles = {
        color: "red",
        marginTop: "8px",
    };

    const tooltipContent = (
        <div style={{color: "black"}}>
            <p>Use the format: 2w 4d 6h 45m</p>
            <ul>
                <li>w = weeks</li>
                <li>d = days</li>
                <li>h = hours</li>
                <li>m = minutes</li>
            </ul>
        </div>
    );

    const handleInputChange = (e) => {
        const inputVal = e.target.value;
        setInput(inputVal);

        // Updated regex to match the time estimation format in the sequence of "w d h m"
        const regex = /^(\d+w\s*)?(\d+d\s*)?(\d+h\s*)?(\d+m\s*)?$/;

        // Check if input matches the regex
        if (!regex.test(inputVal) && inputVal !== "") {
            setError("Invalid time estimation format 0w 0d 0h 0m");
        } else {
            setError(null);
            const timeUnits = inputVal
                .trim()
                .split(/\s+/)
                .filter((unit) => unit !== ""); // Filter out any empty units

            let totalHours = 0;

            for (const unit of timeUnits) {
                const numericValue = parseInt(unit);
                const unitType = unit.charAt(unit.length - 1);

                switch (unitType) {
                    case "w":
                        totalHours += numericValue * 40;
                        break;
                    case "d":
                        totalHours += numericValue * 8;
                        break;
                    case "h":
                        totalHours += numericValue;
                        break;
                    case "m":
                        totalHours += numericValue / 60;
                        break;
                    default:
                        // Handle invalid unit type
                        break;
                }
            }
            onHoursChange(totalHours);
        }
    };

    return (
        <div>

            <Input
                type="text"
                value={input}
                onChange={handleInputChange}
                style={inputStyles}
                placeholder={"2w 0d 6h 30m"}
                suffix={<Tooltip color={"white"} title={tooltipContent} placement="right"><InfoCircleOutlined
                    style={{color: "#888888"}}/></Tooltip>}
            />

            {error && <p style={errorStyles}>{error}</p>}
        </div>
    );
};

export default TimeEstimationField;
