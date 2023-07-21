import React from "react";
import {Dropdown, Space} from 'antd';

const App = ({items, name, icon, minWidth}) => (
    <div>
        <Dropdown
            menu={{
                items
            }}
            trigger={['click']}
            overlayStyle={{minWidth: minWidth || "250px"}}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{display: "flex", alignItems: "center"}}>
                    <span style={{
                        marginRight: '0px',
                        marginLeft: "5px",
                        fontWeight: "400",
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>{name}</span>
                    {icon}
                </Space>
            </a>
        </Dropdown>
    </div>
);
export default App;