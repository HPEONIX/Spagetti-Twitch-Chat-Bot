const quizElem = document.getElementById('quiz')
const optionElem = document.getElementById('options')

const socket = new WebSocket("ws://localhost:3000/socket");
socket.onopen = () => {
    console.log("socket open")
    socket.send(JSON.stringify({ event: "getPollData" }))
}

socket.onmessage = (stringData) => {
    console.log("recieved", stringData.data)
    const payload = JSON.parse(stringData.data)

    switch (payload.event) {
        case "voteStart":
            voteStart(payload)
            break;
        case "voteEnd":
            voteEnd(payload)
            break;
        case "voteCast":
            voteCast(payload)
            break
    }
}


const voteStart = ({data}) => {
    optionElem.innerHTML = ""
    quizElem.innerText = ""
    quizElem.innerText = data.quiz
    for (const i in data.options) {
        if (Object.hasOwnProperty.call(data.options, i)) {
            const item = data.options[i];
            {
                var option = document.createElement('div')
                var optionContainer = document.createElement('div')
                var progressBar = document.createElement('div')

                option.innerText = `${i}) ${item}`
                option.classList.add(["option"])
                option.id = `option-${i}`

                progressBar.id = `option-bar-${i}`
                progressBar.classList.add(["option-bar"])

                optionContainer.classList.add(["option-container"])
                optionContainer.appendChild(option)
                optionContainer.appendChild(progressBar)

                optionElem.appendChild(optionContainer)
            }
        }
    }
}
const voteEnd = (data) => {
    optionElem.innerHTML = ""
    quizElem.innerText = ""
}
const voteCast = ({data}) => {
    for (const key in data.poll) {
        if (Object.hasOwnProperty.call(data.poll, key)) {
            const value = data.poll[key].votes;
            const progressBar = document.getElementById(`option-bar-${key}`)
            progressBar.innerText = value
            progressBar.style.width = rtop(value, data.total).toString() + "%"
        }
    }
}

const rtop = (val, total) => {
    return (val / total) * 100
}