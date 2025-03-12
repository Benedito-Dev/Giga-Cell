const Calcular_Reparo = document.getElementById('Calcular')
cart = document.getElementById('')
let valor_reparo = document.getElementById('valor-reparo')

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('chat-form').style.display = 'none'
})

// Efeito Carrosel

document.addEventListener('DOMContentLoaded', function () {
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const carouselTrack = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const cardWidth = cards[0].offsetWidth + 20; // Width + margin

    let scrollPosition = 0;

    function loopCarousel(direction) {
        if (direction === 'right') {
            const firstCard = carouselTrack.firstElementChild;
            carouselTrack.appendChild(firstCard.cloneNode(true));
            carouselTrack.removeChild(firstCard);
        } else {
            const lastCard = carouselTrack.lastElementChild;
            carouselTrack.insertBefore(lastCard.cloneNode(true), carouselTrack.firstElementChild);
            carouselTrack.removeChild(lastCard);
        }
    }

    leftBtn.addEventListener('click', function () {
        scrollPosition -= cardWidth;
        carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;

        setTimeout(() => {
            loopCarousel('left');
            scrollPosition += cardWidth;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    });

    rightBtn.addEventListener('click', function () {
        scrollPosition += cardWidth;
        carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;

        setTimeout(() => {
            loopCarousel('right');
            scrollPosition -= cardWidth;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    });
});

// Fim de Efeito Carrosel

// Calcular Reparo

Calcular_Reparo.addEventListener('click', function() {
    let phone_model = document.getElementById('phone-models');
    let phone_problem = document.getElementById('phone-issues');
            
    let phone_model_Option = phone_model.options[phone_model.selectedIndex].text;
    let phone_problem_Option = phone_problem.options[phone_problem.selectedIndex].text;

    // Gera um número aleatório entre 0 e 999
    let randomNumber = Math.random() * 999;
    // Formata o número com 2 casas decimais
    let formattedNumber = randomNumber.toFixed(2);
            
    console.log(`Modelo: ${phone_model_Option}, Problema: ${phone_problem_Option}`);
    valor_reparo.textContent = `R$${formattedNumber}`
})

// Fim de Calcular Reparo

// Chat de Suporte



document.getElementById('chat-button').addEventListener('click', function() {
    const chatForm = document.getElementById('chat-form');
    const body = document.body;
    const chatBox = document.getElementById('chat-box');

    if (chatForm.style.display === 'block') {
        chatForm.style.display = 'none';
        body.classList.remove('no-scroll');
    } else {
        chatForm.style.display = 'block';
        body.classList.add('no-scroll');

        // Mostrar mensagem do servidor após 1 segundo
        setTimeout(() => {
            const serverMessage = document.createElement('div');
            serverMessage.className = 'chat-message server';
            serverMessage.textContent = 'Para qualquer suporte contate nosso whatssap (85) 98864-0696';
            chatBox.appendChild(serverMessage);
        }, 500);
    }
});

// Fim de Chat de Suporte


// Adicionar ao Carrinho