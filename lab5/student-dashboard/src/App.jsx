// src/App.jsx

import { useState } from 'react';
import './styles/lab-styles.css';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentControls from './components/StudentControls'; 

const initialStudents = [
  { id: 1, name: 'Ali', grade: 85 },
  { id: 2, name: 'Siti', grade: 72 },
  { id: 3, name: 'Rahim', grade: 55 },
];

function App() {
  const [students, setStudents] = useState(initialStudents);

  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all'); 
  const [sortBy, setSortBy] = useState('high-low'); 

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };
  const visibleStudents = students
    .filter((student) => {
      if (filterBy === 'pass') return student.grade >= 60;
      if (filterBy === 'fail') return student.grade < 60;
      return true;
    })
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'high-low') {
        return b.grade - a.grade; 
      }
      return a.grade - b.grade; 
    });
  
  const noMatches = students.length > 0 && visibleStudents.length === 0;

  return (
    <div className="app">
      <header className="header">
        <h1>Student Dashboard</h1>
      </header>

      <StudentForm onAdd={addStudent} students={students} />

      <StudentControls
        filterBy={filterBy}
        sortBy={sortBy}
        searchTerm={searchTerm}
        setFilterBy={setFilterBy}
        setSortBy={setSortBy}
        setSearchTerm={setSearchTerm}
      />

      {}
      {noMatches && (
        <p className="no-data">
          No students match "<em>{searchTerm}</em>"
        </p>
      )}
      <StudentList
        students={visibleStudents}
        onDelete={deleteStudent}
      />
    </div>
  );
}

export default App;