class AnimalClicks {
    constructor(innerText = ['🦝'],
                time = 2000,
                angle = 0,
                velocityX = 0,
                velocityY = 0,
                gravity = 0.075,
                dx = 10,
                dy = 10,
                effects = { random: false, physics: false, fade: true, hideCursor: false },
                fontSize = '24px') {
        this.innerText = innerText;
        this.time = time;
        this.angle = angle;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.gravity = gravity;
        this.effects = effects;
        this.fontSize = fontSize;
        this.dx = dx;
        this.dy = dy;
        this.currentIndex = 0;
        this.handleClick = this.handleClick.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.textElement = null;

        this.injectStyles();
        
        if (this.effects.hideCursor) {
            this.hideCursor();
            document.addEventListener('mousemove', this.mouseMoveHandler);
            this.textElement = this.createTextElement(500, 500);
            document.body.appendChild(this.textElement);
            this.textElement.classList.add('visible');
        }
        document.addEventListener('click', this.handleClick);
    }

    hideCursor() {
        document.body.classList.add('hide-cursor');
    }

    injectStyles() {
        if (!document.getElementById('animal-clicks-styles')) {
            const style = document.createElement('style');
            style.id = 'animal-clicks-styles';
            style.innerHTML = `
                .dropping-text {
                    position: absolute;
                    opacity: 0;
                    transition: opacity 0.5s ease-out;
                    will-change: transform;
                    user-select: none;
                    z-index: 1000;
                }

                .dropping-text.visible {
                    opacity: 1;
                }

                .hide-cursor {
                    cursor: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    mouseMoveHandler(event) {
        if (this.textElement) {
            const mouseX = event.clientX - this.dx;
            const mouseY = event.clientY - this.dy;
            this.textElement.style.left = `${mouseX}px`;
            this.textElement.style.top = `${mouseY}px`;
        }
    }

    createTextElement(x, y) {
        let textToDisplay;

        if (this.effects.random) {
            const randomIndex = Math.floor(Math.random() * this.innerText.length);
            textToDisplay = this.innerText[randomIndex];
        } else {
            textToDisplay = this.innerText[this.currentIndex];
            this.currentIndex = (this.currentIndex + 1) % this.innerText.length;
        }
        
        const textElement = document.createElement('span');
        textElement.className = 'dropping-text';
        textElement.innerText = textToDisplay;

        textElement.style.left = `${x}px`;
        textElement.style.top = `${y}px`;
        textElement.style.fontSize = this.fontSize;

        return textElement;
    }

    handleClick(event) {
        const textElement = (this.textElement === null)
        ? this.createTextElement(event.clientX - this.dx, event.clientY - this.dy)
        : this.textElement.cloneNode(true); 

        if (this.effects.hideCursor){
            this.textElement.remove();
            this.textElement = this.createTextElement(event.clientX - this.dx, event.clientY - this.dy);
            document.body.appendChild(this.textElement);
            this.textElement.classList.add('visible');
        }

        document.body.appendChild(textElement);
        const randomRotation = Math.random() * this.angle;
        textElement.style.transform = `rotate(${randomRotation}deg)`;
        
        if (this.effects.fade) {
            setTimeout(() => {
                textElement.classList.add('visible');
            }, 0);
    
            setTimeout(() => {
                textElement.remove();
            }, this.time);
        }

        if (this.effects.physics) {
            this.applyPhysics(textElement);
        }
    }

    applyPhysics(textElement) {
        let VelX = (Math.random() < 0.5 ? -1 : 1) * Math.random() * this.velocityX;
        let VelY = -Math.random() * this.velocityY;

        const maxY = window.innerHeight;
        const maxX = window.innerWidth;
    
        const fall = () => {
            VelY += this.gravity;
    
            const currentTop = parseFloat(textElement.style.top);
            const currentLeft = parseFloat(textElement.style.left);
    
            textElement.style.top = `${currentTop + VelY}px`;
            textElement.style.left = `${currentLeft + VelX}px`;
    
            if (currentTop + VelY < maxY && currentLeft + VelX < maxX && currentLeft + VelX > 0) {
                requestAnimationFrame(fall);
            } else {
                textElement.remove();
            }
        };
    
        requestAnimationFrame(fall);
    }
}

module.exports = AnimalClicks;