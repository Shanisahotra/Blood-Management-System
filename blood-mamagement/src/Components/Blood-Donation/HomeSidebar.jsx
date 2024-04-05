import React from 'react';
import './HomeSidebar.css';
const HomeSidebar = () => {
  // Sample data for demonstration
  const data = [
    { name: 'John Doe', age: 30, bloodGroup: 'O+', unit: 2, disease: 'None' },
    { name: 'Jane Smith', age: 25, bloodGroup: 'A-', unit: 3, disease: 'Hypertension' },
    { name: 'Alice Johnson', age: 40, bloodGroup: 'B+', unit: 1, disease: 'Diabetes' }
  ];

  return (
    <div>
      <table>
        <thead>
        <h2>Donor</h2>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Unit</th>
            <th>Disease</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.bloodGroup}</td>
              <td>{person.unit}</td>
              <td>{person.disease}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeSidebar;
