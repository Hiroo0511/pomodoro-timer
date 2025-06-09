class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.shortBreakTime = 5 * 60; // 5分
        this.longBreakTime = 15 * 60; // 15分
        this.currentTime = this.workTime;
        this.isRunning = false;
        this.interval = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.workButton = document.getElementById('work');
        this.shortBreakButton = document.getElementById('short-break');
        this.longBreakButton = document.getElementById('long-break');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.startTimer());
        this.pauseButton.addEventListener('click', () => this.pauseTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        this.workButton.addEventListener('click', () => this.setMode('work'));
        this.shortBreakButton.addEventListener('click', () => this.setMode('short-break'));
        this.longBreakButton.addEventListener('click', () => this.setMode('long-break'));
    }

    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => {
                this.currentTime--;
                this.updateDisplay();
                if (this.currentTime <= 0) {
                    this.pauseTimer();
                    this.playSound();
                }
            }, 1000);
        }
    }

    pauseTimer() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.interval);
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.currentTime = this.workTime;
        this.updateDisplay();
    }

    setMode(mode) {
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(button => button.classList.remove('active'));
        
        switch(mode) {
            case 'work':
                this.currentTime = this.workTime;
                this.workButton.classList.add('active');
                break;
            case 'short-break':
                this.currentTime = this.shortBreakTime;
                this.shortBreakButton.classList.add('active');
                break;
            case 'long-break':
                this.currentTime = this.longBreakTime;
                this.longBreakButton.classList.add('active');
                break;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    playSound() {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2067/2067-preview.mp3');
        audio.play();
    }
}

// インスタンスの作成
const pomodoro = new PomodoroTimer();
