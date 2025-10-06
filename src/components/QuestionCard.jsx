import React from "react"

const QuestionCard = ({
        question,
        selectedAnswers,
        onAnswerSelect,
        onSubmitAnswer,
        onNext,
        isLastQuestion,
        showAnswerResult,
}) => {
        if (!question) {
                return null
        }

        const correctAnswers = Array.isArray(question.correctAnswers)
                ? question.correctAnswers
                : [question.correctAnswer]
        const isMultiple = correctAnswers.length > 1
        const normalizedSelected = Array.isArray(selectedAnswers)
                ? selectedAnswers
                : typeof selectedAnswers === "number"
                ? [selectedAnswers]
                : []
        const sortedCorrectAnswers = [...correctAnswers].sort((a, b) => a - b)
        const sortedSelectedAnswers = [...normalizedSelected].sort((a, b) => a - b)

        const isCorrect = showAnswerResult
                ? isMultiple
                        ? sortedCorrectAnswers.every(
                                  (answer, idx) => sortedSelectedAnswers[idx] === answer,
                          ) &&
                          sortedCorrectAnswers.length === sortedSelectedAnswers.length
                        : normalizedSelected[0] === correctAnswers[0]
                : false

	return (
		<div className="question-card">
			<div className="question-text">{question.question}</div>

			<div className="options-list">
				{question.options.map((option, index) => {
					let buttonClass = "option-button"

                                        const isSelected = normalizedSelected.includes(index)

                                        if (showAnswerResult) {
                                                if (correctAnswers.includes(index)) {
                                                        buttonClass += " correct-answer"
                                                } else if (isSelected) {
                                                        buttonClass += " incorrect-answer"
                                                }
                                        } else if (isSelected) {
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
                                                                correctAnswers.includes(index) && (
                                                                        <span className="answer-indicator">✓</span>
                                                                )}
                                                        {showAnswerResult &&
                                                                !correctAnswers.includes(index) &&
                                                                isSelected && (
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
                                                                        {correctAnswers
                                                                                .map((answerIndex) =>
                                                                                        question.options[answerIndex],
                                                                                )
                                                                                .join(", ")}
                                                                </strong>
                                                        </span>
                                                </div>
                                        )}
				</div>
			)}

			<div className="question-navigation">
                                <span className="navigation-hint">
                                        {!showAnswerResult
                                                ? isMultiple
                                                        ? "Select one or more answers and submit"
                                                        : "Select an answer to continue"
                                                : "Click next to continue"}
                                </span>

                                <div className="navigation-buttons">
                                        {isMultiple && !showAnswerResult && (
                                                <button
                                                        onClick={onSubmitAnswer}
                                                        disabled={normalizedSelected.length === 0}
                                                        className="btn btn-secondary"
                                                >
                                                        Submit Answer
                                                </button>
                                        )}

                                        <button
                                                onClick={onNext}
                                                disabled={!showAnswerResult}
                                                className="btn btn-primary"
                                        >
                                                {isLastQuestion ? "Show Results" : "Next Question"} →
                                        </button>
                                </div>
                        </div>
                </div>
        )
}

export default QuestionCard
