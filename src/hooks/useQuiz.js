import { useState } from "react"

export const useQuiz = (questions) => {
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState(null)
	const [userAnswers, setUserAnswers] = useState({})
	const [showResults, setShowResults] = useState(false)
	const [quizStarted, setQuizStarted] = useState(false)
	const [showAnswerResult, setShowAnswerResult] = useState(false)

	const totalQuestions = questions.length
	const currentQ = questions[currentQuestion]

	const handleAnswerSelect = (answerIndex) => {
		if (showAnswerResult) return // Предотвращаем изменение ответа после показа результата

		setSelectedAnswer(answerIndex)
		setShowAnswerResult(true)

		// Сохраняем ответ пользователя
		setUserAnswers((prev) => ({
			...prev,
			[currentQuestion]: answerIndex,
		}))
	}

	const handleNextQuestion = () => {
		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion((prev) => prev + 1)
			setSelectedAnswer(null)
			setShowAnswerResult(false)
		} else {
			setShowResults(true)
		}
	}

	const calculateScore = () => {
		let correct = 0
		questions.forEach((question, index) => {
			if (userAnswers[index] === question.correctAnswer) {
				correct++
			}
		})
		return correct
	}

	const resetQuiz = () => {
		setCurrentQuestion(0)
		setSelectedAnswer(null)
		setUserAnswers({})
		setShowResults(false)
		setQuizStarted(false)
		setShowAnswerResult(false)
	}

	const startQuiz = () => {
		setQuizStarted(true)
	}

	return {
		currentQuestion,
		selectedAnswer,
		userAnswers,
		showResults,
		quizStarted,
		showAnswerResult,
		totalQuestions,
		currentQ,
		handleAnswerSelect,
		handleNextQuestion,
		calculateScore,
		resetQuiz,
		startQuiz,
	}
}
