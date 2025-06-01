import React from "react"

const ResultsScreen = ({ score, totalQuestions, onReset }) => {
	const percentage = Math.round((score / totalQuestions) * 100)

	const getResultsClass = () => {
		if (percentage >= 70) return "excellent"
		if (percentage >= 50) return "good"
		return "poor"
	}

	const resultsClass = getResultsClass()

	return (
		<div className="results-screen">
			<div className="results-card">
				<div className="results-header">
					<div className={`results-icon ${resultsClass}`}>🏆</div>
					<h2 className="results-title">Quiz Complete!</h2>
					<p className="score-text">
						You scored{" "}
						<span className="score-highlight">{score}</span> out of{" "}
						<span style={{ fontWeight: "bold" }}>
							{totalQuestions}
						</span>
					</p>
					<p className="percentage-text">({percentage}%)</p>
				</div>

				<div className="score-bar-container">
					<div className="score-bar">
						<div
							className={`score-bar-fill ${resultsClass}`}
							style={{ width: `${percentage}%` }}
						></div>
					</div>
				</div>

				<div className="score-breakdown">
					<div className="score-item correct">
						<div className="score-item-icon correct">✓</div>
						<p className="score-item-label correct">
							Correct Answers
						</p>
						<p className="score-item-value correct">{score}</p>
					</div>
					<div className="score-item incorrect">
						<div className="score-item-icon incorrect">✗</div>
						<p className="score-item-label incorrect">
							Incorrect Answers
						</p>
						<p className="score-item-value incorrect">
							{totalQuestions - score}
						</p>
					</div>
				</div>

				<button onClick={onReset} className="btn btn-primary">
					↻ Try Again
				</button>
			</div>
		</div>
	)
}

export default ResultsScreen
