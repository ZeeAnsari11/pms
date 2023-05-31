import React, {useState} from "react";

const TimeEstimationField = ({onHoursChange}) => {
    const [input, setInput] = useState("");
    const [hours, setHours] = useState("");
    const [error, setError] = useState(null);

    const inputStyles = {
        fontSize: "16px",
        padding: "8px",
        borderRadius: "4px",
        border: "2px solid #ccc",
        marginBottom: "16px",
        width: "96%",
        background: "rgb(242, 242, 242)",
    };

    const errorStyles = {
        color: "red",
        marginTop: "8px",
    };

    const handleInputChange = (e) => {
        const inputVal = e.target.value;
        setInput(inputVal);

        // Regex to match the time estimation format in the sequence of "w d h m"
        const regex = /^(\d+w\s*)(\d+d\s*)(\d+h\s*)(\d+m\s*)?$/;

        // Check if input matches the regex
        if (!regex.test(inputVal) && inputVal !== "") {
            setError("Invalid time estimation format 0w 0d 0h 0m");
            setHours(null);
        } else {
            setError(null);
            const [weeks = 0, days = 0, hours = 0, minutes = 0] = inputVal
                .trim()
                .split(/\s+/);
            const totalHours =
                parseInt(weeks) * 40 +
                parseInt(days) * 8 +
                parseInt(hours) +
                parseFloat(minutes) / 60;
            setHours(totalHours);
            onHoursChange(totalHours);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                style={inputStyles}
                placeholder={"2w 0d 6h 30m"}
            />
            {error && <p style={errorStyles}>{error}</p>}
        </div>
    );
};

export default TimeEstimationField;
