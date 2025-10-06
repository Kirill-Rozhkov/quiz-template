import React, { useState, useEffect } from "react"
import "./App.css"
import WelcomeScreen from "./components/WelcomeScreen"
import QuizHeader from "./components/QuizHeader"
import QuestionCard from "./components/QuestionCard"
import ResultsScreen from "./components/ResultsScreen"
import { useQuiz } from "./hooks/useQuiz"

function App() {
	const [questionsData, setQuestionsData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch("/questions.json")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to load questions")
				}
				return response.json()
			})
			.then((data) => {
				setQuestionsData(data)
				setLoading(false)
			})
			.catch((error) => {
				console.error("Error loading questions:", error)
				setError("Failed to load questions. Please refresh the page.")
				setLoading(false)
			})
	}, [])

	const {
		currentQuestion,
                selectedAnswers,
                showResults,
                quizStarted,
                showAnswerResult,
                totalQuestions,
                currentQ,
                handleAnswerSelect,
                handleSubmitAnswer,
                handleNextQuestion,
                calculateScore,
                resetQuiz,
                startQuiz,
        } = useQuiz(questionsData?.questions || [])

	if (loading) {
		return (
			<div className="welcome-screen">
				<div className="welcome-card">
					<div className="welcome-icon">⏳</div>
					<h1 className="welcome-title">Loading...</h1>
					<p className="welcome-subtitle">
						Please wait while we load the quiz questions
					</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="welcome-screen">
				<div className="welcome-card">
					<div className="welcome-icon">❌</div>
					<h1 className="welcome-title">Error</h1>
					<p className="welcome-subtitle">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="btn btn-primary"
					>
						Refresh Page
					</button>
				</div>
			</div>
		)
	}

	if (!quizStarted) {
		return (
			<WelcomeScreen
				onStart={startQuiz}
				totalQuestions={totalQuestions}
			/>
		)
	}

	if (showResults) {
		const score = calculateScore()
		return (
			<ResultsScreen
				score={score}
				totalQuestions={totalQuestions}
				onReset={resetQuiz}
			/>
		)
	}

	return (
		<div className="app-container">
			<div className="content-wrapper">
				<QuizHeader
					currentQuestion={currentQuestion}
					totalQuestions={totalQuestions}
				/>

                                <QuestionCard
                                        question={currentQ}
                                        selectedAnswers={selectedAnswers}
                                        onAnswerSelect={handleAnswerSelect}
                                        onSubmitAnswer={handleSubmitAnswer}
                                        onNext={handleNextQuestion}
                                        isLastQuestion={currentQuestion === totalQuestions - 1}
                                        showAnswerResult={showAnswerResult}
                                />
			</div>
		</div>
	)
}

export default App
