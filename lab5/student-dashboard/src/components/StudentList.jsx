
import StudentItem from './StudentItem';

function StudentList({ students, onDelete }) {
  
  if (students.length === 0) {
    return (
      <p className="no-data">No students yet. Use the form above.</p>
    );
  }

  return (
    <ul className="student-list">
      {students.map((student) => (
        <StudentItem
          key={student.id}
          student={student}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default StudentList;