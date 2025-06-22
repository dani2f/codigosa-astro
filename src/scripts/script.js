import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
//Flecha

var isScrolling = false;

window.onscroll = function () {
    mostrarFlecha();
};

function mostrarFlecha() {
    var flecha = document.querySelector('.flecha');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        flecha.style.display = 'flex';
    } else {
        flecha.style.display = 'none';
    }
}

addEventListener("load", ()=>{
    var flecha = document.querySelector('.flecha');

    flecha.style.display = 'none';
});

/*Adquirimos el logo para cambiarlo de color cuando queramos*/

var logo = document.querySelector('.logoColor');

/*entramos aqui cuando usa el scroll*/

window.addEventListener("scroll", function () {

    /*adquirimos el header para cambiarlo de color cuando lo necesitemos*/

    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 800);
    const menuLinks = document.querySelectorAll('.menu a');
    /*Si no esta el scroll en 0 (arriba) le ponemos que tenga un  color negro pero con transparencia para que se pueda leer las opciones,
    esto hasta llegar al borde de la portada, ahi se cambiaria a blanco */

    if (window.scrollY > 0) {

        header.style.backgroundColor = "#0008";

    } else {

        /*Si entra aqui significa que esta arriba, si esta en movil no lo dejamos transparente si esta en pc si */

        if (window.innerWidth > 900) {
            header.style.backgroundColor = "transparent";
        }

    }
    if (window.scrollY > 800) {
        /*Si esta en el borde de la portada lo cambiamos a negro el logo y el header a blanco */
        header.style.backgroundColor = "#fff";
        logo.style.fill = "#000";
    } else {
        /*si no esta debajo de la portada el logo seguira blanco */
        logo.style.fill = "#fff";
    }

    menuLinks.forEach(link => {
       
        if (window.scrollY > 800) {
            link.style.setProperty('--after-background-color', '#000'); // Cambia el color según la condición
        } else {
            link.style.setProperty('--after-background-color', '#fff'); // Color original
        }
    });

})

// Menu hamburguesa

document.addEventListener('DOMContentLoaded', function () {

    var menuIcon = document.getElementById('burger');
    var nav = document.getElementById('nav');

    menuIcon.addEventListener('click', function () {
        nav.classList.toggle('open');
    });

});


/*PRUEBA CARROUSELL*/

var bloqueCartas = document.querySelector('#precios-cartas');
var punto = document.querySelectorAll('.punto');

//Cuando click en punto
//Saber pos del punto
//aplicar translateX al bloqueCartas
//quitar clase activos a todos
//añadir clase activo al que hemos dado click

punto.forEach((cadaPunto, i) => {
    punto[i].addEventListener('click', () => {
        let posicion = i;

        let operacion;
        if (posicion == 0) {
            operacion = 33;
        } else if (posicion == 1) {
            operacion = 0;
        } else if (posicion == 2) {
            operacion = -33;
        }

        bloqueCartas.style.transform = `translateX(${operacion}%)`;

        punto.forEach((cadaPunto, h) => {
            punto[h].classList.remove('activo')
        })
        punto[i].classList.add('activo');

    })
});



















//Animación sections

document.addEventListener("DOMContentLoaded", function() {
    let velocityToAppear = 1;
    if(document.querySelector('.unique-project') != null){     
        velocityToAppear = 1.3;
    }
    
    
    const animarElements = document.querySelectorAll('.animar');
    function checkVisibility() {
        const triggerBottom = window.innerHeight / velocityToAppear;

        animarElements.forEach(element => {
            const boxTop = element.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});






if (window.innerWidth >= 1200 && document.getElementById('destacado-inicio')) {
  const destacadosTitulo = document.getElementById('destacadosTitulo-inicio');
  const destacadosSection = document.getElementById('destacado-inicio');
  const header = document.querySelector('header');

    // Función para actualizar los límites dinámicamente
    function updateBounds() {
        const headerHeight = header.offsetHeight;
        const sectionTop = destacadosSection.offsetTop - headerHeight;
        const sectionBottom = sectionTop + destacadosSection.offsetHeight;
        const destacadosTituloHeight = destacadosTitulo.offsetWidth + (window.innerHeight * 0.25);

        return { sectionTop, sectionBottom, destacadosTituloHeight, headerHeight};
    }

    // Actualizamos los límites al cargar y al redimensionar la ventana
    let bounds = updateBounds();
    window.addEventListener('resize', () => {
    bounds = updateBounds();
    });

    // Evento de scroll para mover la caja
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY - header.offsetHeight;



            if (scrollY >= bounds.sectionTop && scrollY <= bounds.sectionBottom - bounds.destacadosTituloHeight - (window.innerHeight * 0.09)) {
                destacadosTitulo.style.position = 'fixed';
                destacadosTitulo.style.top = '9vh';
            } else if (scrollY < bounds.sectionTop) {
                destacadosTitulo.style.position = 'absolute';
                destacadosTitulo.style.top = '9vh';
            } else {
                destacadosTitulo.style.position = 'absolute';
                destacadosTitulo.style.top = `${bounds.sectionBottom - bounds.sectionTop - bounds.destacadosTituloHeight}px`;
            }
            

    });
}





if(document.getElementById('button-contacto')){
const domain = import.meta.env.PUBLIC_WP_DOMAIN;
  

//FETCH DEL CONTACTO PARA WORDPRESS
document.getElementById('button-contacto').addEventListener('click', async () => {
  // 1. Recolectar los valores de cada campo
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const emailEmisor = document.getElementById('emailEmisor').value;
  const telefono = document.getElementById('telefono').value;
  const ideaProyecto = document.getElementById('ideaProyecto').value;
  const presupuesto = document.getElementById('presupuesto').value;
  const mensajeCompleto = document.getElementById('mensajeCompleto').value;
  const privacidad = document.getElementById('privacidadContacto').checked;
  const privacidadValue = privacidad ? "Acepto la política de privacidad" : "";

  // 2. Crear un objeto FormData (multipart/form-data)
  const formData = new FormData();
  // Añadimos los campos con los mismos nombres que en tu formulario CF7
  formData.append('nombre', nombre);
  formData.append('apellidos', apellidos);
  formData.append('emailEmisor', emailEmisor);
  formData.append('telefono', telefono);
  formData.append('ideaProyecto', ideaProyecto);
  formData.append('presupuesto', presupuesto);
  formData.append('mensajeCompleto', mensajeCompleto);
  formData.append('privacidad', privacidadValue);

  // 3. Añadir también los campos ocultos que CF7 requiere
  //    (estos valores los obtienes del HTML generado por CF7)
  //    El _wpcf7 debe ser el ID numérico (181 en tu caso).
  formData.append('_wpcf7', '181');
  //    Ajusta el valor de _wpcf7_unit_tag según tu formulario (por ejemplo, wpcf7-f181-p6-o1)
  formData.append('_wpcf7_unit_tag', 'wpcf7-f181-p6-o1');

  //    Si tu formulario usa más hidden inputs, añádelos también:
  // formData.append('_wpcf7_locale', 'es_ES');
  // formData.append('_wpcf7_version', '5.7');
  // formData.append('_wpcf7_container_post', '6');
  // etc.

  try {
    // 4. Enviar con fetch usando FormData
    const respuesta = await fetch(
      `${domain}wp-json/contact-form-7/v1/contact-forms/181/feedback`,
      {
        method: 'POST',
        body: formData
        // Importante: NO agregues headers "Content-Type", fetch lo gestiona solo.
      }
    );

    // 5. Procesar la respuesta
    const resultado = await respuesta.json();

    // Dependiendo de la versión de CF7, puede que el "status" esté en
    // resultado.status o en resultado.data.status. Ajusta según lo que veas en el console.log:
   
    if (resultado.status === 'mail_sent') {
      showToast('success', '¡Mensaje enviado correctamente!');   

    } else if (resultado.status === 'validation_failed') {
      
      let mensajeError = "";
      let campo = "";
      for (let i = 0; i < resultado.invalid_fields.length; i++) {
          campo = `<div style='color: #FFDC84;'>${capitalizeFirstLetter(resultado.invalid_fields[i].field)}:</div>`;
          mensajeError = campo + " "+resultado.invalid_fields[i].message;
          showToast('error', mensajeError);
      }
         
    }else {
      let mensajeError = "Error al enviar: " + resultado.message;
      showToast('error', mensajeError);   
    }
    
  } catch (error) {
      showToast('error', 'Ocurrió un error inesperado al enviar el formulario.');
  }
});

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


//Estilos para las alertas de CF7

function createToastContent(alertType, text) {
    const content = document.createElement("div");
    Object.assign(content.style, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: "0.5rem", // Equivalente a Tailwind 'gap-2'
      fontSize: "0.89em",
      fontWeight: "bold"
    });

    if(alertType == "error"){
      content.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" class="t_icon" style="fill: rgb(239, 68, 68);"><path d="M128 24a104 104 0 10104 104A104.11 104.11 0 00128 24zm-8 56a8 8 0 0116 0v56a8 8 0 01-16 0zm8 104a12 12 0 1112-12 12 12 0 01-12 12z"></path></svg>
      ${text}
      `;
    }else{
      content.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" class="t_icon" style="fill: rgb(34, 197, 94);">
        <path d="M128 24a104 104 0 10104 104A104.11 104.11 0 00128 24zm45.66 85.66l-56 56a8 8 0 01-11.32 0l-24-24a8 8 0 0111.32-11.32L112 148.69l50.34-50.35a8 8 0 0111.32 11.32z"></path>
      </svg>
      ${text}
      `;
    }
    
    return content;
  }

  function showToast(alertType, text) {
  // Detectamos si estamos en móvil (puedes ajustar el breakpoint)
  const isMobile = window.matchMedia('(max-width: 600px)').matches;

  // Estilos base
  const baseStyle = {
    background: "#171717",
    color: "#fff",
    border: "0.5px solid #fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "none",
    borderRadius: "0.35rem",
  };

  // Estilos de tamaño + límite de ancho
  const sizeStyle = isMobile
    ? {
        height: "2.2rem",
        padding: 0,
        paddingInline: "0.5rem",
        fontSize: "0.75rem",
        maxWidth: "90vw",    // no más del 90% del viewport
      }
    : {
        height: "3rem",
        padding: 0,
        paddingInline: "0.8rem",
        fontSize: "1rem",
        maxWidth: "350px",   // no más de 350px en desktop
      };

  Toastify({
    node: createToastContent(alertType, text),
    duration: 3000,
    gravity: "bottom",
    position: "right",
    close: true,
    style: { ...baseStyle, ...sizeStyle },
  }).showToast();

  // Ajustes extra al botón de cerrar
  setTimeout(() => {
    document.querySelectorAll(".toast-close").forEach((btn) => {
      btn.style.padding = "0";
      btn.style.marginLeft = isMobile ? "20px" : "40px";
      btn.style.fontSize = isMobile ? "0.7em" : "0.8em";
      btn.style.height = "100%";
      btn.style.borderLeft = "1px solid #fff5";
      btn.style.paddingLeft = "0.7rem";
    });
  }, 100);

  // Fuerza el layout flex (por si acaso)
  setTimeout(() => {
    document.querySelectorAll(".toastify").forEach((toast) => {
      toast.style.display = "flex";
      toast.style.flexDirection = "row";
      toast.style.justifyContent = "center";
    });
  }, 100);
}




}
