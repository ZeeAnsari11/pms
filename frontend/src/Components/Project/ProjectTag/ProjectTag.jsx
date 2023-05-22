import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import Sidebar from "../../Project/Sidebar/index";
import {AiOutlineSetting} from 'react-icons/ai';
import {DownOutlined} from '@ant-design/icons';
import {Modal as Modal1, Input} from 'antd';
import {Modal as Modal2} from 'antd';
import {Modal as Modal3} from 'antd';
import {ChromePicker} from "react-color";
import {Dropdown, Space} from 'antd';
import {Pagination} from 'antd';


const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SummaryHeading = styled.p`
  font-size: 26px;
  color: black;
  margin-left: 40px;
  font-weight: bolder;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const HeadingWrapper = styled.div`
  width: 100%;
`;

const BodyWrapper = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  height: auto;
`;

const AddTagButton = styled.button`
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-right: 310px;

  &:hover {
    background-color: #3e81ed;
  }
`;

const TableContainer = styled.div`
  display: table;
  border-collapse: collapse;
  width: 100%;

  @media (max-width: 768px) {
    display: block;
  }
`;

const TableHeader = styled.div`
  display: table-header-group;
  background-color: #f5f5f5;
  font-weight: bold;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableHeaderCell = styled.div`
  display: table-cell;
  padding: 10px;
  border: none;
  text-align: center;

  @media (max-width: 768px) {
    display: block;
    width: 50%;
    float: left;
  }
`;

const TableRow = styled.div`
  display: table-row;

  &:hover {
    background-color: #EBECF0;
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 10px;
  }
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 10px;
  border: none;
  text-align: center;

  @media (max-width: 768px) {
    display: block;
    width: 50%;
    float: left;
  }
`;

const TableCellForTag = styled.div`
  display: table-cell;
  padding: 10px;
  border: none;
  text-align: center;
  width: 442px;
  word-wrap: break-word;

`;

const Tag = styled.span`
  padding: 5px;
  border-radius: 5px;
  color: black;
`;

const NameTag = styled.span`
  padding: 5px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 5px;
  color: black;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

const PaginationWrapper = styled.div`
  float: right;
  margin-top: 15px;
`;

function ProjectTags() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [color, setColor] = useState('#FFFFFF');
    const [isChecked, setIsChecked] = useState(false);
    const [newArray, setNewArray] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [inputValue2, setInputValue2] = useState('');
    const [isChecked2, setIsChecked2] = useState(false);
    const [isEmpty2, setIsEmpty2] = useState(false);
    const [color2, setColor2] = useState('#FFFFFF');
    const [id, setId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(0);


    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputChange2 = (e) => {
        setInputValue2(e.target.value);
    };

    function handleChange(newColor) {
        setColor(newColor.hex);
    }

    function handleChange2(newColor) {
        setColor2(newColor.hex);
    }

    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
    }

    function handleCheckboxChange2(event) {
        setIsChecked2(event.target.checked);
    }

    const project = {
        name: 'Project Name',
        category: 'Project Setting'
    };

    const WarningDiv = styled.div`
      background-color: #fff6f6;
      border: 1px solid #e0b4b4;
      color: #9f3a38;
      margin-top: 10px;
      padding: 5px;
    `;

    const handleOk = () => {
        const newTag = {
            id: newArray.length + 1,
            name: inputValue,
            color: color
        };

        if (inputValue === '' || color === '') {
            setIsEmpty(true);
        }

        if (inputValue && color) {
            setNewArray([...newArray, newTag]);
            setIsModalVisible(false);
            setIsEmpty(false);

        }
        setInputValue('');
        setColor("#ffffff");
    };

    const handleOk2 = () => {
        const newTag = {
            id: id,
            name: inputValue2,
            color: color2
        };

        if (inputValue2 === '' || color2 === '') {
            setIsEmpty2(true);
            return;
        }

        const updatedArray = newArray.filter((item) => item.id !== id);
        let insertIndex = 0;
        for (let i = 0; i < updatedArray.length; i++) {
            if (updatedArray[i].id < id) {
                insertIndex = i + 1;
            } else {
                break;
            }
        }

        updatedArray.splice(insertIndex, 0, newTag);
        setNewArray(updatedArray);
        setIsModalVisible2(false);
        setIsEmpty2(false);
        setInputValue2('');
        setColor2("#ffffff");
        setId(0);
    };

    const handleEditTag = (id) => {
        setIsModalVisible2(true);
        setId(id);
    };

    const handleDeleteTag = (id, name) => {
        setDeleteId(id);
        Modal3.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this tag: ' + name + ' ?',
            onOk() {
                // Set the isDelete state to true
                setIsDelete(true);
            },
        });
    };

    useEffect(() => {
        if (isDelete) {
            const updatedArray = newArray.filter((item) => item.id !== deleteId);
            setNewArray(updatedArray);
            setIsDelete(false);
            setDeleteId(0);
        }
    }, [isDelete]);

    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(newArray.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = newArray.slice(startIndex, endIndex);

    return (
        <div>
            <PageContainer>
                <Sidebar project={project}/>
                <NavBar/>
                <ContentWrapper>
                    <HeadingWrapper>
                        <SummaryHeading>Project Tags</SummaryHeading>
                    </HeadingWrapper>
                    <BodyWrapper>
                        <ButtonWrapper>
                            <AddTagButton label="Click me!" onClick={showModal}>Add Tag </AddTagButton>
                            <PaginationWrapper>
                                <Pagination
                                    current={currentPage}
                                    total={newArray.length}
                                    pageSize={ITEMS_PER_PAGE}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    showQuickJumper={false}
                                />
                            </PaginationWrapper>
                        </ButtonWrapper>
                        <TableContainer>
                            <TableHeader>
                                <TableHeaderCell>Tags</TableHeaderCell>
                                <TableHeaderCell>Color</TableHeaderCell>
                            </TableHeader>
                            {currentItems.map(tag => (
                                <TableRow key={tag.id}>
                                    <TableCellForTag>
                                        <IconWrapper>
                                            <Dropdown
                                                menu={{
                                                    items: [
                                                        {
                                                            key: 'edit',
                                                            label: 'Edit',
                                                            onClick: () => handleEditTag(tag.id)
                                                        },
                                                        {
                                                            key: 'delete',
                                                            label: 'Delete',
                                                            onClick: () => handleDeleteTag(tag.id, tag.name)
                                                        }
                                                    ]
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <AiOutlineSetting size={'24px'}/>
                                                        <DownOutlined/>
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </IconWrapper>
                                        <NameTag color={tag.color}>{tag.name}</NameTag>
                                    </TableCellForTag>
                                    <TableCell>
                                        <Tag color={tag.color}>{tag.color}</Tag>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableContainer>
                    </BodyWrapper>
                </ContentWrapper>
            </PageContainer>

            <Modal1
                title="Add New Tag"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <label>Name</label>
                <Input style={{marginBottom: `10px`}} value={inputValue} onChange={handleInputChange}/>
                <label style={{marginTop: '10px', marginBottom: '10px'}}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                    Show color picker
                </label>

                {isChecked && (
                    <div>
                        <ChromePicker color={color} onChange={handleChange}/>
                    </div>
                )}

                {isEmpty && (
                    <WarningDiv>Oops! The name field is empty. Please enter tag name.</WarningDiv>
                )}

            </Modal1>

            <Modal2
                title="Edit Tag"
                open={isModalVisible2}
                onOk={handleOk2}
                onCancel={handleCancel2}
            >

                <label>Name</label>
                <Input style={{marginBottom: `10px`}} value={inputValue2} onChange={handleInputChange2}/>
                <label style={{marginTop: '10px', marginBottom: '10px'}}>
                    <input type="checkbox" checked={isChecked2} onChange={handleCheckboxChange2}/>
                    Show color picker
                </label>

                {isChecked2 && (
                    <div>
                        <ChromePicker color={color2} onChange={handleChange2}/>
                    </div>
                )}

                {isEmpty2 && (
                    <WarningDiv>Oops! The name field is empty. Please enter tag name.</WarningDiv>
                )}
            </Modal2>
        </div>
    );
}

export default ProjectTags;





