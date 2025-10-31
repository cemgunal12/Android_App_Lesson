// src/components/StudentItem.jsx

// 'onDelete' prop'unu StudentList'ten alın
function StudentItem({ student, onDelete }) {
  
  // 1. Geçti/Kaldı Durumunu Hesapla
  // (Not 60 ve üzeri ise 'passed' true olur)
  const passed = student.grade >= 60;

  // 2. Koşullu CSS class'larını belirle
  // Temel class 'student-item' ve duruma göre 'student-pass' veya 'student-fail'
  const itemClasses = `student-item ${
    passed ? 'student-pass' : 'student-fail'
  }`;

  return (
    <li className={itemClasses}>
      
      {/* Öğrenci bilgilerini bir div içinde gruplayalım */}
      <div>
        <span className="student-name">{student.name}</span>
        <span className="student-grade">{student.grade}</span>
        
        {/* 3. "Pass" veya "Fail" etiketini ekle */}
        <span className="student-status">{passed ? 'Pass' : 'Fail'}</span>
      </div>
      
      {/* 4. Silme (Delete) butonunu ekle */}
      <button
        className="delete-btn"
        // Tıklandığında, 'onDelete' fonksiyonunu öğrencinin id'si ile çağır
        onClick={() => onDelete(student.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default StudentItem;