
import { useState } from 'react';

function StudentForm({ onAdd, students }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setError(null); 

    const gradeNum = Number(grade); 

    if (name.trim() === '') {
      setError('Student name cannot be empty.');
      return;
    }
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      setError('Grade must be a number between 0 and 100.');
      return;
    }

    const nameExists = students.some(
      (student) => student.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (nameExists) {
      setError('A student with this name already exists.');
      return;
    }

    onAdd({
      id: Date.now(), 
      name: name.trim(),
      grade: gradeNum,
    });

    setName('');
    setGrade('');
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      
      {}
      {error && <div className="form-error">{error}</div>}

      <input
        type="text"
        className="input"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        className="input"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <button type="submit" className="btn">
        Add Student
      </button>
    </form>
  );
}

export default StudentForm;