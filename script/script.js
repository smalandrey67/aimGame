document.addEventListener("DOMContentLoaded", function(event) {
    const startButton = document.querySelector("#start-game");
    const screens = document.querySelectorAll(".screen");
    const wrapper = document.querySelector(".screen__wrapper");
    const timer = document.querySelector(".screen__title-span");
    const board = document.querySelector("#board");

    let time = 0;
    let score = 0;

    startButton.addEventListener("click", (e) => {
        e.preventDefault();
        screens[0].classList.add("screen-up");
    })

    wrapper.addEventListener("click", (e) => {
        if(e.target.classList.contains("screen__button")){
            time = +e.target.dataset.time
            screens[1].classList.add("screen-up")
            showGame(); 
        }
    })

    board.addEventListener("click", (e) => {
        if(e.target.classList.contains("screen__circle")){
            score++
            e.target.remove();
            createCircle();
        }
    })

    function showGame(){
        setInterval(calcTime, 1000)
        createCircle();
        showTime(time)
    }

    function calcTime(){
        if(time === 0){
            showFinishGame()
        }else{
            let count = --time;
            if(count < 10){
                count = `0${count}`;
            }
            showTime(count)
        }
    }

    function showTime(value){
        timer.innerHTML = `00:${value}`;
    }

    function showFinishGame(){
        timer.parentNode.classList.add("screen__tilte--hide")
        board.innerHTML = `
            <h1 class="screen__subtitle">Your result: <span>${score}</span></h1>
            <button id="restart" class="screen__restart">Restart game</button>
        `
        const restart = document.querySelector("#restart")
        restart.addEventListener("click", () => {
            location.reload();
        })
    }
    function createCircle(){
        const circle = document.createElement("div");
        circle.classList.add("screen__circle");

        const size = getRandoData(20, 60)
        const {width, height} = board.getBoundingClientRect();
       
        const x = getRandoData(0, width - size);
        const y = getRandoData(0,  height - size);

        //size of circle
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // position of circle
        circle.style.top = `${y}px`;
        circle.style.left = ` ${x}px`;

        board.append(circle);
    }

    function getRandoData(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})
