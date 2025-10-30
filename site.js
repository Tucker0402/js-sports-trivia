//
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const NextButton = document.querySelector('button#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function

	const getNextQuestion = async () => {
    const url = await fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple')
	const json = await url.json()

	const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
	const answers = shuffle([ ...incorrect, correct ])
	return { question, answers, correct }
    }

	// todo: create your "renderQuestion" function
	const renderQuestion = async ({ question, answers, correct }) => {
		answersElement.innerHTML = ''

		answers.forEach(answer => {
		const answerButton = document.createElement('button')
		answerButton.textContent = decodeHtml(answer)
		questionElement.textContent = decodeHtml(question)

		answerButton.addEventListener('click', () => {
			if (answer === correct) {
    			answerButton.classList.add('correct')
    			answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
    			alert('Correct!')
    			return
			}
			else {
				answerButton.disabled = true
				alert('Incorrect!')
			}})
		answersElement.appendChild(answerButton)
	})}

	// todo: add the event listener to the "nextQuestion" button

	NextButton.addEventListener('click', async () => {
        renderQuestion(await getNextQuestion())
		NextButton.disabled = true
		setTimeout(() => NextButton.disabled = false, 10000)
	})

})()

// mimic a click on the "nextQuestion" button to show the first question
NextButton.click()