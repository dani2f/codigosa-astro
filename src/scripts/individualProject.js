const configAnimations = [
    // fithabit: mv      tblt          pc            pcXL
    [
        [[0, -9, 0], [-15, -10, 0], [-20, -13, 0], [-30, -10, 0]],
        [[0, 9, 0], [10, 12, 0], [20, 15, 0], [27, 15, 0]]
    ],

    // gimnasio
    [

        [[-2, -10, -8], [-15, -13, -10], [-17, -15, -8], [-26, -15, -8]],
        [[2, 9, 8], [0, 14, 8], [16, 9, 8], [23, 14, 8]],
        [[6, -10, -8], [14, -8, 12], [13, -5, -8], [23, -5, -8]],
        [[-6, 9, 8], [-6, 9, 8], [-15, 9, 24], [-24, 9, 24]]

    ],

    // identidad (logo)
    [
        [[-3, -12, 8], [-8, -12, 8], [-16, -12, -18], [-25, -12, -18]],
        [[3, 12, -8], [0, 12, -8], [0, 12, -8],[0, 15, -8]],
        [[6, 12, -8], [12, -10, 12], [12, -6, 12], [23, -6, 30]]
    ],

    // objetivos 
    [
        [[-5, -10, 8], [-12, -10, 8], [-20, -12, 8], [-24, -12, 8]],
        [[5, 9, -8], [6, 13, -8], [20, 10, -8], [24, 10, -8]],
        [[6, -10, -8], [18, -5, -30], [24, -9, -30], [28, -9, -30]],
        [[-6, 9, 8], [-6, 9, 8], [-24, 9, 8], [-28, 9, 8]]
    ],

    // personalidad (fotos web)
    [
        [[-2, -10, 15], [-8, -15, 15], [-15, -15, 15], [-27, -10, -23]],
        [[2, 9, -15], [6, 12, -15], [16, 15, 15], [28, 15, 15]],
        [[6, -10, 15], [12, -7, -15], [17, -12, -15], [20, -12, -15]],
        [[-6, 9, -15], [-6, 9, -15], [-12, 12, -18], [-22, 15, -12]]
    ],

    // paleta colores
    [
        [[-4, -10, 8], [-10, -10, 8], [-10, -10, 8], [-30, -10, 8]],
        [[4, 9, -8], [6, 9, -8], [-17, 13, -8], [-17, 13, -8]],
        [[6, -10, 8], [10, -16, 30], [10, -14, 30], [26, -14, 30]],
        [[6, -10, 8], [10, -16, 30], [20, 15, -38], [20, 15, -38]]
    ],

    // tipografía
    [
        [[-3, -10, -8], [-13, -10, -8], [-18, -10, -8], [-26, -10, -8]],
        [[3, 9, 8], [13, 9, 8], [18, 9, 8], [26, 9, 8]],
        [[6, -10, -8], [6, -10, -8], [6, -10, -8], [6, -10, -8]],
        [[-6, 9, 8], [-6, 9, 8], [-6, 9, 8], [-6, 9, 8]]
    ],

    // tiempos
    [
        [[-4, -10, 8], [-12, -10, 8], [-12, -10, 8], [-19, -13, 8]],
        [[4, 9, -8], [6, 13, -8], [20, 19, -8], [24, 19, -8]],
        [[6, -10, -8], [18, -5, -30], [24, -5, -30], [31, -5, -30]],
        [[-6, 9, 8], [-6, 9, 8], [-24, 9, 8], [-31, 9, 8]]
    ],

    // Proyectos (siguiente / anterior)
    [
        [[0, -2, 0], [0, -2, 0], [0, -2, 0], [0, -2, 0]],
        [[0, 2, 0], [0, 2, 0], [0, 2, 0], [0, 2, 0]]
    ]
];

if (document.querySelector(".nombreLargoTematica")) { // Reemplaza 'condicion' con la que necesites
    configAnimations[1][2][2] = [23, -7, -12]; 
    configAnimations[1][2][3] = [27, -9, -12]; 
}else if(document.querySelector(".movilRotate")){
    configAnimations[0][1][0][2] = -20; 
    configAnimations[0][1][1][2] = -20; 

    configAnimations[0][0][2] = [-20, -7, 0]; 
    configAnimations[0][0][3]= [-28, -7, 0];     
    configAnimations[0][1][2] = [20,5,-20]; 
    configAnimations[0][1][3]= [28,5,-20]; 
}

document.addEventListener("DOMContentLoaded", () => {
    // Determina la velocidad en función de si existe el elemento .unique-project
    const velocityToAppear = document.querySelector('.unique-project') ? 1.3 : 1;
    const animar2Elements = document.querySelectorAll('.animar2');

    // Detecta el modo según el ancho de ventana
    function getDeviceMode() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width >= 1024) return 'pc';
        return 'tablet';
    }

    // Para cada hermano (sibling) según el modo y su índice, recupera la configuración
    function animateSibling(sibling, sectionIndex, index, visible) {
        const mode = getDeviceMode();
        let config;


        if (mode === 'mobile') {
            // Sólo se animan los hermanos 0 y 1 en móvil (tal como en el código original)
            if (index > 1) return;
            config = configAnimations[sectionIndex][index][0];
        } else if (mode === 'pc') {
             // En PC se animan hasta 4 hermanos (índices 0 a 3)
            if (index > 3) return;

            if(window.innerWidth >= 1300){
                config = configAnimations[sectionIndex][index][3];
            }else{
                config = configAnimations[sectionIndex][index][2];
            }
           
        } else { // tablet
            // En tablet sólo se animan índices 0, 1 y 2
            if (index > 2) return;
            config = configAnimations[sectionIndex][index][1];
            // Para el hermano 1 se fuerza que translateX sea 0
            if (index === 1) config = [config[0], config[1], config[2]];
        }
        // Los valores de destino para escala y opacidad son 1 cuando es visible y 0 cuando no lo es
        animarElemento(sibling, config[0], config[1], visible ? 1 : 0, visible ? 1 : 0, config[2]);
    }

    // Función que comprueba la visibilidad y lanza las animaciones correspondientes
    function checkVisibility() {
        const triggerBottom = window.innerHeight / velocityToAppear;

        animar2Elements.forEach((element, sectionIndex) => {
            const { top, bottom } = element.getBoundingClientRect();
            const isVisible = top < triggerBottom && bottom > (triggerBottom - 250);

            // Actualiza las clases del elemento
            if (isVisible) {
                element.classList.add("visible");
                element.classList.remove("visible2");
            } else {
                if (bottom < (triggerBottom - 250)) element.classList.add("visible2");
                if (top > triggerBottom) element.classList.remove("visible");
            }

            // Para cada hermano (excluyendo el mismo elemento) se anima solo cuando cambia el estado
            const siblings = [...element.parentElement.children].filter(sib => sib !== element);
            siblings.forEach((sibling, idx) => {
                if (isVisible && !sibling.classList.contains("viewing")) {
                    animateSibling(sibling, sectionIndex, idx, true);
                    sibling.classList.add("viewing");
                } else if (!isVisible && sibling.classList.contains("viewing")) {
                    animateSibling(sibling, sectionIndex, idx, false);
                    sibling.classList.remove("viewing");
                }
            });
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});

// Función de animación que utiliza requestAnimationFrame (mantiene la misma lógica que en el original)
function animarElemento(element, translateX, translateY, scaleTarget, opacityTarget, rotateZ) {
    const duration = 350; // Duración fija en ms
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    const initialScale = initialOpacity === 0 ? 0 : 1;
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = (timestamp - start) / duration;
        if (progress > 1) progress = 1;

        const currentOpacity = initialOpacity + (opacityTarget - initialOpacity) * progress;
        const currentScale = initialScale + (scaleTarget - initialScale) * progress;

        // Se conserva la misma forma que en el código original (la traslación se aplica sin interpolar)
        element.style.opacity = currentOpacity;
        element.style.transform = `translate(${translateX}rem, ${translateY}rem) scale(${currentScale}) rotateZ(${rotateZ}deg)`;

        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}