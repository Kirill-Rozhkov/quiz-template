import React from "react"

const QuestionCard = ({
	question,
	selectedAnswer,
	onAnswerSelect,
	onNext,
	isLastQuestion,
	showAnswerResult,
}) => {
	const isCorrect = selectedAnswer === question.correctAnswer

	return (
		<div className="question-card">
			<div className="question-text">{question.question}</div>

			<div className="options-list">
				{question.options.map((option, index) => {
					let buttonClass = "option-button"

					if (showAnswerResult) {
						if (index === question.correctAnswer) {
							buttonClass += " correct-answer"
						} else if (
							index === selectedAnswer &&
							selectedAnswer !== question.correctAnswer
						) {
							buttonClass += " incorrect-answer"
						}
					} else if (selectedAnswer === index) {
						buttonClass += " selected"
					}

					return (
						<button
							key={index}
							onClick={() => onAnswerSelect(index)}
							className={buttonClass}
							disabled={showAnswerResult}
						>
							<span className="option-letter">
								{String.fromCharCode(97 + index)}
							</span>
							<span className="option-text">{option}</span>
							{showAnswerResult &&
								index === question.correctAnswer && (
									<span className="answer-indicator">✓</span>
								)}
							{showAnswerResult &&
								index === selectedAnswer &&
								selectedAnswer !== question.correctAnswer && (
									<span className="answer-indicator">✗</span>
								)}
						</button>
					)
				})}
			</div>

			{showAnswerResult && (
				<div
					className={`answer-feedback ${
						isCorrect ? "correct" : "incorrect"
					}`}
				>
					{isCorrect ? (
						<div className="feedback-content">
							<span className="feedback-icon">🎉</span>
							<span className="feedback-text">
								Correct! Well done!
							</span>
						</div>
					) : (
						<div className="feedback-content">
							<span className="feedback-icon">❌</span>
							<span className="feedback-text">
								Incorrect. The correct answer is:{" "}
								<strong>
									{question.options[question.correctAnswer]}
								</strong>
							</span>
						</div>
					)}
				</div>
			)}

			<div className="question-navigation">
				<span className="navigation-hint">
					{!showAnswerResult
						? "Select an answer to continue"
						: "Click next to continue"}
				</span>

				<button
					onClick={onNext}
					disabled={!showAnswerResult}
					className="btn btn-primary"
				>
					{isLastQuestion ? "Show Results" : "Next Question"} →
				</button>
			</div>
		</div>
	)
}

export default QuestionCard
