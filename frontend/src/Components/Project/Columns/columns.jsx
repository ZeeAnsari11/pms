import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import Sidebar from "../../Project/Sidebar/index";
import {AiOutlineSetting} from 'react-icons/ai';
import {DownOutlined} from '@ant-design/icons';
import {Modal as Modal1, Input} from 'antd';
import {Modal as Modal2} from 'antd';
import {Modal as Modal3} from 'antd';
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
  padding: 10px 544px 10px 10px;
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

const TableCellForTag = styled.div`
  display: table-cell;
  padding: 10px;
  border: none;
  text-align: center;
  width: 442px;
  word-wrap: break-word;

`;


const NameTag = styled.span`
  margin: 0 30px;
  border-radius: 5px;
  color: black;
  padding: 5px 544px 5px 5px;
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

function Columns() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [color, setColor] = useState('#FFFFFF');
    const [newArray, setNewArray] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [inputValue2, setInputValue2] = useState('');
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

    const handleDeleteTag = (id,name) => {
        setDeleteId(id);
        Modal3.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this column: ' + name + ' ?',
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
                        <SummaryHeading>Project Columns</SummaryHeading>
                    </HeadingWrapper>
                    <BodyWrapper>
                        <ButtonWrapper>
                            <AddTagButton label="Click me!" onClick={showModal}>Add Columns </AddTagButton>
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
                                <TableHeaderCell>Columns</TableHeaderCell>

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
                                                            onClick: () => handleDeleteTag(tag.id,tag.name)
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
                                </TableRow>
                            ))}
                        </TableContainer>
                    </BodyWrapper>
                </ContentWrapper>
            </PageContainer>

            <Modal1
                title="Add New Column"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <label>Name</label>
                <Input style={{marginBottom: `10px`}} value={inputValue} onChange={handleInputChange}/>

                {isEmpty && (
                    <WarningDiv>Oops! The name field is empty. Please enter column name.</WarningDiv>
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

                {isEmpty2 && (
                    <WarningDiv>Oops! The name field is empty. Please enter Column name.</WarningDiv>
                )}
            </Modal2>
        </div>
    );
}

export default Columns;





