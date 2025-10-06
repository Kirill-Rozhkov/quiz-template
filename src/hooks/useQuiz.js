import { useEffect, useMemo, useState } from "react"

const shuffleArray = (array) => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
}

const arraysAreEqual = (arrA = [], arrB = []) => {
        if (arrA.length !== arrB.length) {
                return false
        }

        for (let i = 0; i < arrA.length; i++) {
                if (arrA[i] !== arrB[i]) {
                        return false
                }
        }

        return true
}

export const useQuiz = (questions) => {
        const [currentQuestion, setCurrentQuestion] = useState(0)
        const [selectedAnswers, setSelectedAnswers] = useState([])
        const [userAnswers, setUserAnswers] = useState({})
        const [showResults, setShowResults] = useState(false)
        const [quizStarted, setQuizStarted] = useState(false)
        const [showAnswerResult, setShowAnswerResult] = useState(false)
        const [shuffledQuestions, setShuffledQuestions] = useState(() =>
                shuffleArray(questions),
        )

        useEffect(() => {
                setShuffledQuestions(shuffleArray(questions))
        }, [questions])

        const totalQuestions = shuffledQuestions.length
        const currentQ = shuffledQuestions[currentQuestion]

        const handleAnswerSelect = (answerIndex) => {
                if (!currentQ || showAnswerResult) return

                const isMultiple = Array.isArray(currentQ.correctAnswers)

                if (isMultiple) {
                        setSelectedAnswers((prev) => {
                                const exists = prev.includes(answerIndex)
                                if (exists) {
                                        return prev.filter((index) => index !== answerIndex)
                                }
                                return [...prev, answerIndex].sort((a, b) => a - b)
                        })
                        return
                }

                setSelectedAnswers([answerIndex])
                setShowAnswerResult(true)
                setUserAnswers((prev) => ({
                        ...prev,
                        [currentQuestion]: answerIndex,
                }))
        }

        const handleSubmitAnswer = () => {
                if (!currentQ || showAnswerResult || selectedAnswers.length === 0) {
                        return
                }

                const isMultiple = Array.isArray(currentQ.correctAnswers)

                const answerToStore = isMultiple
                        ? [...selectedAnswers].sort((a, b) => a - b)
                        : selectedAnswers[0]

                setUserAnswers((prev) => ({
                        ...prev,
                        [currentQuestion]: answerToStore,
                }))
                setShowAnswerResult(true)
        }

        const handleNextQuestion = () => {
                if (currentQuestion < totalQuestions - 1) {
                        setCurrentQuestion((prev) => prev + 1)
                        setSelectedAnswers([])
                        setShowAnswerResult(false)
                } else {
                        setShowResults(true)
                }
        }

        const calculateScore = useMemo(() => {
                return () => {
                        let correct = 0

                        shuffledQuestions.forEach((question, index) => {
                                const userAnswer = userAnswers[index]

                                if (Array.isArray(question.correctAnswers)) {
                                        if (
                                                Array.isArray(userAnswer) &&
                                                arraysAreEqual(
                                                        [...userAnswer].sort((a, b) => a - b),
                                                        [...question.correctAnswers].sort((a, b) => a - b),
                                                )
                                        ) {
                                                correct++
                                        }
                                } else if (userAnswer === question.correctAnswer) {
                                        correct++
                                }
                        })

                        return correct
                }
        }, [shuffledQuestions, userAnswers])

        const resetQuiz = () => {
                setCurrentQuestion(0)
                setSelectedAnswers([])
                setUserAnswers({})
                setShowResults(false)
                setQuizStarted(false)
                setShowAnswerResult(false)
                setShuffledQuestions(shuffleArray(questions))
        }

        const startQuiz = () => {
                setShuffledQuestions(shuffleArray(questions))
                setCurrentQuestion(0)
                setSelectedAnswers([])
                setShowAnswerResult(false)
                setQuizStarted(true)
        }

        return {
                currentQuestion,
                selectedAnswers,
                userAnswers,
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
        }
}
