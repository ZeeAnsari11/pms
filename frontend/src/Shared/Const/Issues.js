import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import React from "react";

export const priorityOptions = [
        {label: "Low", value: "Low", icon: <AiOutlineArrowDown color={"#2E8738"}/>},
        {label: "Medium", value: "Medium", icon: <AiOutlineArrowUp color={"#E97F33"}/>},
        {label: "High", value: "High", icon: <AiOutlineArrowUp color={"#E9494B"}/>},
]