import React from "react"

const QuizHeader = ({ currentQuestion, totalQuestions }) => {
	const progress = ((currentQuestion + 1) / totalQuestions) * 100

	return (
		<div className="quiz-header">
			<div className="header-top">
				<h1 className="quiz-title">Quiz</h1>
				<span className="question-counter">
					Question {currentQuestion + 1} of {totalQuestions}
				</span>
			</div>

			<div className="progress-bar-container">
				<div
					className="progress-bar"
					style={{ width: `${progress}%` }}
				></div>
			</div>
		</div>
	)
}

export default QuizHeader
