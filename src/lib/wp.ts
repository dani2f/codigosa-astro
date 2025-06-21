const domain = import.meta.env.PUBLIC_WP_DOMAIN;

const apiUrl = `${domain}wp-json/wp/v2`;


interface ImageField {
  url: string;
  alt?: string;
  title?: string;
}

// Interfaz para la estructura de ACF (la parte que nos interesa)
interface ACFData {
  //Desatacado
  imagen_destacada: ImageField;
  descripcion_destacada: string;
  //Portada
  titulo_portada: string;
  imagen_1_portada: object;
  imagen_2_portada: object;
  //Temática
  titulo_tematica: string;
  imagen_1_tematica: object;
  imagen_2_tematica: object;
  imagen_3_tematica: object;
  imagen_4_tematica: object;
  //Identidad
  imagen_1_identidad: object;
  imagen_2_identidad: boolean;
  //Objetivos
  imagen_1_objetivos: object;
  imagen_2_objetivos: object;
  imagen_3_objetivos: object;
  imagen_4_objetivos: object;
  //Personalidad
  imagen_1_personalidad: object;
  imagen_2_personalidad: object;
  imagen_3_personalidad: object;
  imagen_4_personalidad: object;
  //Paleta de colores
  color_1_paleta_de_colores: string;
  color_2_paleta_de_colores: string;
  color_3_paleta_de_colores: string;
  color_4_paleta_de_colores: string;
  //Tipografias
  tipografia_1_tipografias: object;
  tipografia_2_tipografias: object;
  //Tiempos
  duracion_tiempos: string;
  ejecucion_tiempos: string;
  //Seo
  meta_description: string;
  meta_title: string;
  //Configuracion
  clases_adicionales: string;
  id: number;
  destacado: boolean;
}

// Estructura básica del proyecto que incluye el campo ACF
interface Proyecto {
  id: number;
  title: {
    rendered: string;
  };
  acf: ACFData; // Solo queremos la parte de ACF
  //identificador
  slug: string;
}



export const getIndividualProject = async (slug: string) => {
  const response = await fetch(`${apiUrl}/proyecto?slug=${slug}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const [data] = await response.json();
  // console.log("prueba", data);
  // console.log(data.slug);

  // Retornar el objeto completo de Proyecto, no solo el `acf`
  return data; // Retornamos el objeto completo del proyecto
};

export const getProjects = async (): Promise<Proyecto[]> => {
  // Cambié el tipo de retorno a `Proyecto[]`
  const response = await fetch(`${apiUrl}/proyecto`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  // Convertir la respuesta a JSON y tipar como un array de proyectos completos
  const data: Proyecto[] = await response.json(); // `data` es un array completo de proyectos

  // Ordenar los proyectos por id
  data.sort((a, b) => Number(b.acf.id) - Number(a.acf.id)); // Usamos el `acf.id` para el orden

  return data; // Devolvemos el array completo de proyectos
};

export const getFeaturedProjects = async (): Promise<Proyecto[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_WP_DOMAIN}/wp-json/wp/v2/proyecto`
    );

    if (!response.ok) {
      console.error(
        "WP returned error status:",
        response.status,
        await response.text()
      );
      return []; // devolvemos array vacío en caso de fallo
    }

    const data: Proyecto[] = await response.json();

    // Filtrar y ordenar los destacados
    const featured = data
      .filter((proyecto) => proyecto.acf.destacado)
      .sort((a, b) => Number(b.acf.id) - Number(a.acf.id));

       
      

    return featured;
  } catch (error) {
    console.error("Fetch failed in getFeaturedProjects:", error);
    return []; // devolvemos array vacío si lanza excepción
  }
};



export const getStaticProjects = async (): Promise<ACFData[]> => {
  const response = await fetch(`${apiUrl}/proyecto`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  // Convertir la respuesta a JSON y tipar como un array de proyectos
  const data: Proyecto[] = await response.json(); // `data` es un array de proyectos

  // Extraer solo la parte `acf` de cada proyecto
  const acfData = data.map(({ acf }) => acf); // Extraemos el campo `acf` de cada proyecto

  return acfData; // Devolvemos el array de datos `acf`
};

export const getNextAndPreviousProjects = async (
  name: string
): Promise<string[]> => {
  //Recogemos los Proyectos, y el proyecto actual en el que estamos
  const acfData = await getProjects();
  const project = await getIndividualProject(name);

  //Buscamos la posicion del proyecto actual en el array por el id del proyecto
  let position = acfData.findIndex((p) => p.acf.id === project.acf.id);

  //Definimos el siguiente y el anterior proyecto
  let nextProject = null;
  let previousProject = null;

  //Si entra en este, significa que es el último proyecto
  if (position == acfData.length - 1) {
    //Como es el último le decimos que el siguiente sera el primero del array para hacer el ciclo
    nextProject = acfData[0];
    //Y el anterior será el anterior al actual por lo que con la posicion podemos hacerlo
    previousProject = acfData[position - 1];
  } else if (project.acf.id == acfData[0].acf.id) {
    //Si entra aqui significa que es el primero del array
    //Indicamos que el siguiente será el siguiente al actual
    nextProject = acfData[position + 1];
    //Y el anterior será el último del array
    previousProject = acfData[acfData.length - 1];
  } else {
    //Si entra aqui esta por el medio por lo que sera el siguiente o anterior al actual
    nextProject = acfData[position + 1];
    previousProject = acfData[position - 1];
  }
  // console.log(nextProject);

  //Indicamos el nombre del siguiente y anterior proyecto y los devolvemos
  const nextProjectName = nextProject.slug;
  const previousProjectName = previousProject.slug;

  return [nextProjectName, previousProjectName]; // Devolvemos el next y previous
};
