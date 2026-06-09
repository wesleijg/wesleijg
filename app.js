document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Mover a div de brilho de fundo de forma suave
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    });

    // 3. Efeito 3D Tilt nos Cards (Especialidades e Projetos)
    const tiltCards = document.querySelectorAll('.specialty-card, .project-item');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Posição do mouse dentro do card (de 0 a cardWidth / cardHeight)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Normalizar a posição para variar de -0.5 a 0.5
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = (x - xc) / xc;
            const dy = (y - yc) / yc;
            
            // Calcular rotações (máximo de 10 graus de inclinação)
            const rotateX = -dy * 10;
            const rotateY = dx * 10;
            
            // Aplicar transformação 3D e sombra neon dinâmica
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none'; // Desabilitar transição temporariamente durante o movimento
            
            // Iluminação sutil na borda
            card.style.boxShadow = `${rotateY * -0.5}px ${rotateX * 0.5}px 25px rgba(0, 169, 224, 0.15)`;
        });
        
        // Restaurar estado original ao retirar o mouse
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s ease';
            card.style.boxShadow = 'none';
        });
    });

    // 4. Filtro de Projetos na Vitrine
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Mostrar com animação suave
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Ocultar com animação suave
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
