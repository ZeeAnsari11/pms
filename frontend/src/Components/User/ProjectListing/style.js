import styled from "styled-components";

export const ProjectListingTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-weight: bold;
    padding: 12px 8px;
    border-bottom: 2px solid #ddd;
  }

  td {
    padding: 12px 8px;
  }

  tr:not(:first-child) {
    border-top: 1px solid #ddd;
  }

  tr:hover {
    background-color: #EBECF0;
  }

  .name-column {
    display: flex;
    align-items: center;
  }

  .name-column img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .option-column-align {
    margin-right: 45%;
  }

  .star-column {
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }

  .star-column:hover {
    color: #ffd700;
  }

  .lead-column {
    display: flex;
    align-items: center;
  }

  .lead-column img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .options-column {
    text-align: center;
    cursor: pointer;
    justify-content: center;
  }

  .options-column:hover {
    text-decoration: underline;
  }
`;


export const NameColumn = styled.td`
  display: flex;
  align-items: center;

  a {
    color: #000;
    text-decoration: none;
    position: relative;

    &:hover {
      color: #1E64D1;
      text-decoration: underline;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: #1E64D1;
        transition: transform 0.2s ease-in-out;
        transform: scaleX(0);
        transform-origin: left;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: #1E64D1;
        transform: scaleX(1);
        transform-origin: right;
        transition: transform 0.2s ease-in-out;
      }
    }
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 32px);
  }
`;


export const ProjectAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const ProjectName = styled.span`
`;


export const ProjectAvatarWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
export const OptionsColumn = styled.th`
  text-align: center;
  cursor: pointer;
  justify-content: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const modalStyle = {
    borderRadius: 0,
};


export const NoProjectsMessage = styled.tr`
  text-align: center;
  font-weight: bold;

  td {
    padding: 24px 0;
  }
`;

export const StarColumn = styled.span`
  margin-right: 5px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffd700;
  }
`;
export const StarSelect = styled.td`
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

export const LeadColumn = styled.td`
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

export const OptionsColumns = styled.td`
  text-align: center;
  cursor: pointer;
  justify-content: center;

  &:hover {
    text-decoration: underline;
  }
`;