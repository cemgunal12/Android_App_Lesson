import { useState } from 'react';
import './App.css';
import QuestionCard from './QuestionCard';
import ResultsScreen from './ResultsScreen';

const QUESTIONS = [
  {
    id: 1,
    question: "React uygulamasının yapı taşı nedir?",
    options: ["Component", "Prop", "State", "Hook"],
    correctAnswer: "Component",
  },
  {
    id: 2,
    question: "Ebeveyn bileşenden çocuğa veri nasıl aktarılır?",
    options: ["State", "Props", "JSX", "Functions"],
    correctAnswer: "Props",
  },
  {
    id: 3,
    question: "React'te durumu (state) yönetmek için hangi Hook kullanılır?",
    options: ["useEffect", "useReducer", "useState", "useContext"],
    correctAnswer: "useState",
  },
  {
    id: 4,
    question: "JSX neyin kısaltmasıdır?",
    options: ["Java Super X", "JavaScript XML", "JSON X", "Java Source X"],
    correctAnswer: "JavaScript XML",
  },
  {
    id: 5,
    question: "Bir bileşen yaşam döngüsü bittiğinde hangi metot çalışır?",
    options: ["componentDidMount", "componentWillUnmount", "render", "constructor"],
    correctAnswer: "componentWillUnmount",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const isQuizFinished = currentQuestionIndex >= QUESTIONS.length;

  return (
    <div className="App">
      <h1>Midterm Quick Quiz</h1>

      {isQuizFinished ? (
        <ResultsScreen
          score={score}
          totalQuestions={QUESTIONS.length}
          onRestart={restartQuiz}
        />
      ) : (
        <QuestionCard
          question={QUESTIONS[currentQuestionIndex]}
          onAnswerClick={handleAnswerClick}
        />
      )}
    </div>
  );
}

export default App;