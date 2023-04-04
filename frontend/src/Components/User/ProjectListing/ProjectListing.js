import React from 'react';
import styled from 'styled-components';

const ProjectListingTable = styled.table`
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
  }

  .options-column:hover {
    text-decoration: underline;
  }
`;

const ProjectListing = () => {
  return (
    <ProjectListingTable>
      <thead>
        <tr>
          <th><span className="star-column">★</span></th>
          <th>Name</th>
          <th>Key</th>
          <th>Type</th>
          <th>Lead</th>
          <th className="options-column">...</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="star-column">★</td>
          <td className="name-column">
            <img src="https://i.pravatar.cc/300" alt="Project Avatar" />
            <a href="project-link">Project Name</a>
          </td>
          <td>PROJ-001</td>
          <td>Task Management</td>
          <td className="lead-column">
            <img src="https://i.pravatar.cc/300" alt="Lead Avatar" />
            <a href="lead-link">Lead Name</a>
          </td>
          <td className="options-column">...</td>
        </tr>
        <tr>
          <td className="star-column">★</td>
          <td className="name-column">
            <img src="https://i.pravatar.cc/300" alt="Project Avatar" />
            <a href="project-link">Project Name</a>
          </td>
          <td>PROJ-002</td>
          <td>Bug Tracking</td>
          <td className="lead-column">
            <img src="https://i.pravatar.cc/300" alt="Lead Avatar" />
            <a href="lead-link">Lead Name</a>
          </td>
          <td className="options-column">...</td>
        </tr>
        {/* more project rows */}
      </tbody>
    </ProjectListingTable>
  );
};

export default ProjectListing;
