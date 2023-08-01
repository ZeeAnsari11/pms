import React, {useState, useEffect} from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import * as EstimateTimerComponents from "./Style"

function convertToTimeFormat(hours) {
    if (typeof hours === 'string') {
        return hours;
    }
    const weeks = Math.floor(hours / 40);
    hours %= 40;
    const days = Math.floor(hours / 8);
    hours %= 8;
    const minutes = Math.ceil((hours - Math.floor(hours)) * 60);
    hours = Math.floor(hours);

    let timeFormat = '';
    if (weeks > 0) {
        timeFormat += `${weeks}w `;
    }
    if (days > 0) {
        timeFormat += `${days}d `;
    }
    if (hours > 0) {
        timeFormat += `${hours}h `;
    }
    if (minutes > 0) {
        timeFormat += `${minutes}m`;
    }

    return timeFormat.trim();
}

const TimeEstimationField = ({onHoursChange, defaultValue}) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (defaultValue) {
            const formattedTime = convertToTimeFormat(defaultValue);
            setInput(formattedTime);
            handleInputChange({target: {value: formattedTime}});
        }
    }, [defaultValue]);


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
            <EstimateTimerComponents.StyledInput
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={"Use the format: 2w 0d 6h 30m"}
                suffix={<EstimateTimerComponents.StyledTooltip color={"white"} title={tooltipContent} placement="right"><InfoCircleOutlined
                    style={{color: "#888888"}}/></EstimateTimerComponents.StyledTooltip>}
            />

            {error && <EstimateTimerComponents.StyledErrorText>{error}</EstimateTimerComponents.StyledErrorText>}
        </div>
    );
};

export default TimeEstimationField;
