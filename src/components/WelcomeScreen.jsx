import React from "react"

const WelcomeScreen = ({ onStart, totalQuestions }) => {
	return (
		<div className="welcome-screen">
			<div className="welcome-card">
				<div className="welcome-icon">🏆</div>
				<h1 className="welcome-title">Unity Quiz</h1>
				<p className="welcome-subtitle">
					Test your Unity game development knowledge
				</p>

				<div className="question-count">
					<p className="question-count-text">
						{totalQuestions} Questions
					</p>
				</div>

				<p className="welcome-description">
					Answer questions about Unity components, scripting, physics,
					and game development concepts.
				</p>

				<button onClick={onStart} className="btn btn-primary">
					Start Quiz →
				</button>
			</div>
		</div>
	)
}

export default WelcomeScreen
