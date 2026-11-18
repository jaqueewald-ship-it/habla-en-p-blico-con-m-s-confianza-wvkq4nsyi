import { PRICE } from '@/config/checkout'

export interface SectionItem {
  id: number
  part: string
  pages: string
  title: string
  description: string
  topics: string[]
}

export interface PreviewImage {
  id: string
  src: string
  title: string
  subtitle: string
  badge: string
  color: string
}

export interface BonusItem {
  id: string
  number: number
  title: string
  description: string
  badge: string
  bullets: string[]
}

export const PRODUCT_DATA = {
  title: 'Habla en público con más confianza',
  subtitle:
    'Un plan práctico de 21 días para organizar tus ideas, entrenar tu voz y aprender a manejar los nervios.',
  price: PRICE.amount,
  priceDisplay: PRICE.display,
  currency: '$',
  currencyLabel: PRICE.currencyLabel,
  driveBonusLink:
    'https://drive.google.com/drive/folders/1vExyPUkas-fIgs1-yuar8pJsT4z2j_oV?usp=drive_link',
  stats: [
    {
      title: 'Un ejercicio al día',
      detail: '10–20 minutos durante 3 semanas: desde la respiración hasta hablar ante otros.',
      badge: '21 días',
    },
    {
      title: 'Guía completa ilustrada',
      detail: '7 partes con esquemas visuales, explicaciones directas y resúmenes aplicables.',
      badge: 'Formato visual',
    },
    {
      title: 'PDF + Audiobook',
      detail: 'La guía completa y su versión de audio para escuchar camino al trabajo.',
      badge: 'Audio incluido',
    },
    {
      title: 'Método práctico y honesto',
      detail: "Entrenamiento progresivo paso a paso, sin consejos vacíos de 'solo relájate'.",
      badge: '100% aplicable',
    },
  ],
}

/* ============================================================
 * PRÉVIAS REAIS DO MATERIAL — 3 páginas do PDF do produto
 * ------------------------------------------------------------
 * Coloque os arquivos em `public/previews/` com os nomes
 * abaixo (páginas extraídas do PDF "Guia_Habla_con_mas_
 * confianza_PREMIUM"). Enquanto os arquivos não existirem,
 * o componente exibe um placeholder ilustrado no lugar.
 * ============================================================ */
export const REAL_PAGE_PREVIEWS: PreviewImage[] = [
  {
    id: 'page-1',
    src: '/previews/pagina-1.jpg',
    title: 'La agitación que ayuda',
    subtitle: 'Parte 1 · Comprender el miedo',
    badge: 'Página real',
    color: 'from-amber-500/10 to-orange-500/5 border-amber-200',
  },
  {
    id: 'page-2',
    src: '/previews/pagina-2.jpg',
    title: 'El suspiro fisiológico',
    subtitle: 'Parte 2 · Respiración y cuerpo',
    badge: 'Página real',
    color: 'from-sky-500/10 to-blue-500/5 border-sky-200',
  },
  {
    id: 'page-3',
    src: '/previews/pagina-3.jpg',
    title: 'Estructura en 3 partes',
    subtitle: 'Parte 3 · Preparar el discurso',
    badge: 'Página real',
    color: 'from-emerald-500/10 to-teal-500/5 border-emerald-200',
  },
]

/* Imagem/capa representando o audiobook (incluído junto ao produto principal) */
export const AUDIOBOOK_IMAGE = {
  src: '/previews/audiobook.jpg',
  title: 'Audiobook completo incluido',
  subtitle: 'PDF + Audio · mismo paquete',
}

export const BOOK_SECTIONS: SectionItem[] = [
  {
    id: 1,
    part: 'Parte 1',
    pages: 'pp. 4–8',
    title: 'Comprender el miedo',
    description:
      'Por qué tenemos miedo a hablar en público, el cuerpo en estado de alarma y cómo transformar la agitación en tu combustible.',
    topics: [
      'Por qué nos da pánico ser evaluados',
      'El cuerpo en alerta y el latido acelerado',
      'Los pensamientos saboteadores más comunes',
      'La agitación que te ayuda a enfocar',
      'Tu punto de partida y autodiagnóstico',
    ],
  },
  {
    id: 2,
    part: 'Parte 2',
    pages: 'pp. 9–13',
    title: 'La respiración y el cuerpo',
    description:
      'Técnicas fisiológicas validadas para desactivar la taquicardia y soltar la tensión antes de poner un pie en el escenario o reunión.',
    topics: [
      'Respirar con el diafragma paso a paso',
      'El suspiro fisiológico que calma en 30 segundos',
      'La respiración cuadrada (técnica 4x4)',
      'Liberar mandíbula, hombros y cuello',
      'La postura anclada y pies firmes',
    ],
  },
  {
    id: 3,
    part: 'Parte 3',
    pages: 'pp. 14–20',
    title: 'Preparar el discurso',
    description:
      'Cómo estructurar cualquier tema en minutos, conectar con la audiencia y crear una narrativa que se recuerde sin memorizar palabra por palabra.',
    topics: [
      'El mensaje central en una sola frase',
      'Conocer y mapear a tu audiencia',
      'La estructura imbatible en 3 partes',
      'Un gancho inicial que atrapa la atención',
      'Historias cortas, analogías y ejemplos vivos',
      'Un cierre contundente que deje huella',
      'El uso correcto de diapositivas y fichas de apoyo',
    ],
  },
  {
    id: 4,
    part: 'Parte 4',
    pages: 'pp. 21–25',
    title: 'La voz y su presencia',
    description:
      'Ejercicios de vocalización, proyección sonora, manejo de silencios y eliminación de muletillas para sonar seguro y sereno.',
    topics: [
      'Volumen, aire y proyección hacia el fondo',
      'El poder de las pausas y los silencios',
      'Entonación para evitar la monotonía',
      'Dicción clara y articulación precisa',
      'Cómo erradicar las muletillas inconscientes',
    ],
  },
  {
    id: 5,
    part: 'Parte 5',
    pages: 'pp. 26–30',
    title: 'La mirada y los gestos',
    description:
      'El lenguaje corporal del orador seguro: manos abiertas, contacto visual cálido, manejo del espacio y cómo hablar ante la cámara.',
    topics: [
      'La mirada en abanico y contacto uno a uno',
      'Qué hacer con las manos (y qué evitar)',
      'Moverse por el escenario con propósito',
      'Expresión facial y la sonrisa genuina',
      'Cómo comunicar con impacto en videollamadas',
    ],
  },
  {
    id: 6,
    part: 'Parte 6',
    pages: 'pp. 31–35',
    title: 'Situaciones específicas',
    description:
      'Estrategias a medida para reuniones de trabajo, exámenes orales, brindis personales, rondas de preguntas difíciles y bloqueos mentales.',
    topics: [
      'La reunión de trabajo y defender tus ideas',
      'El examen oral o defensa de proyecto',
      'El brindis, boda o evento social',
      'Cómo responder preguntas incómodas del público',
      'Protocolo de emergencia: salir airoso de un bloqueo',
    ],
  },
  {
    id: 7,
    part: 'Parte 7',
    pages: 'pp. 36–41',
    title: 'El plan de los 21 días',
    description:
      'El cronograma día a día que te guía de menor a mayor exigencia para que ganes soltura sin saltarte ningún fundamento.',
    topics: [
      'El mapa general del plan',
      'Semana 1: El dominio de tu cuerpo y respiración',
      'Semana 2: La preparación ágil del discurso',
      'Semana 3: La exposición gradual ante otros',
      'El checklist definitivo para el día del discurso',
      'Mantenimiento después de los 21 días',
    ],
  },
]

/* BÔNUS — aparecem APENAS na seção da oferta final (sem valores individuais) */
export const BONUSES: BonusItem[] = [
  {
    id: 'bonus-cuaderno',
    number: 1,
    title: 'El Cuaderno de Práctica de los 21 Días',
    badge: 'Plantillas imprimibles',
    description:
      'Fichas de trabajo en PDF diseñadas para imprimir o rellenar en tablet: seguimiento diario, nivel de ansiedad y progreso.',
    bullets: [
      'Escala visual de situaciones estresantes',
      'Diario de los 21 días con registro de avances',
      'Checklist de preparación de 1 hora antes de hablar',
    ],
  },
  {
    id: 'bonus-plantillas',
    number: 2,
    title: '30 Esquemas de Discurso Listos para Rellenar',
    badge: 'Plantillas probadas',
    description:
      'Estructuras prediseñadas paso a paso para no empezar nunca desde la hoja en blanco. Solo completa con tus datos.',
    bullets: [
      'Plantillas para: reunión semanal, presentación ejecutiva, elevator pitch',
      'Guiones para defensa de examen, entrevista de trabajo y ponencias',
      'Esquemas para eventos personales: brindis de boda, agradecimientos y despedidas',
    ],
  },
]

export const AUDIENCE_CARDS = [
  {
    title: 'Profesionales y líderes de equipo',
    subtitle: 'Reuniones, presentaciones y entrevistas',
    description:
      'Quieres intervenir con autoridad en reuniones de trabajo, presentar resultados ante clientes o liderar a tu equipo sin titubear ni quedarte en blanco.',
    icon: 'briefcase',
  },
  {
    title: 'Estudiantes e investigadores',
    subtitle: 'Exámenes orales, tesis y defensas',
    description:
      'Llevas meses estudiando el tema a fondo y necesitas que los nervios no echen por tierra todo tu conocimiento en los 15 minutos decisivos.',
    icon: 'graduation',
  },
  {
    title: 'Personas que evitan el centro de atención',
    subtitle: 'Brindis, eventos sociales y conferencias',
    description:
      "Sientes taquicardia cada vez que dicen 'ahora dinos unas palabras'. Buscas un método paso a paso, visual y sin juicios para sentirte cómodo hablando.",
    icon: 'sparkles',
  },
]

export const COMPARISON_DIFF = {
  oldWay: [
    'Aprender el discurso de memoria palabra por palabra (y entrar en pánico si olvidas una).',
    "Consejos vagos como 'respira hondo y estate tranquilo'.",
    'Evitar cualquier oportunidad de hablar y vivir con frustración profesional.',
    "Sentir que 'no naciste con don de palabra' y resignarte al miedo.",
  ],
  newWay: [
    'Un ejercicio guiado al día de 10 a 20 minutos durante 3 semanas.',
    'Técnicas neurológicas y corporales explicadas con esquemas visuales claros.',
    'Exposición gradual del pequeño al gran escenario, controlando la respuesta al estrés.',
    'Aprender a estructurar ideas sólidas en 3 pasos con plantillas rellenables.',
  ],
}

/* FAQ — sem valores em dólares/euros, garantia de 7 DIAS */
export const FAQ_ITEMS = [
  {
    q: '¿Cómo y cuándo recibiré el material?',
    a: 'El acceso es inmediato tras completar tu compra en Hotmart. Serás redirigido a la página de entrega y recibirás acceso directo a la carpeta compartida de Google Drive con la guía en PDF en alta resolución, el audiobook completo en MP3 y los cuadernos de plantillas descargables.',
  },
  {
    q: '¿El pago es único o tiene suscripciones mensuales?',
    a: 'Es un pago único. No hay cuotas ocultas, ni cobros recurrentes, ni suscripciones de ningún tipo. Acceso para siempre a todos los materiales.',
  },
  {
    q: '¿En 21 días desaparecerán todos mis nervios?',
    a: 'Sentir un punto de activación o energía antes de hablar es una respuesta biológica normal y saludable. El objetivo del plan no es convertirte en un robot sin emociones, sino enseñarte a canalizar esa energía para que tu voz no tiemble, tus ideas no se borren y hables con calma y seguridad.',
  },
  {
    q: '¿Es un tratamiento terapéutico o psicológico?',
    a: 'No. Es un programa práctico de entrenamiento comunicativo y técnicas de oratoria corporal. Si experimentas ansiedad clínica severa, ataques de pánico o fobia social incapacitante, te recomendamos consultar con un profesional de la salud mental.',
  },
  {
    q: '¿Necesito experiencia previa en oratoria?',
    a: 'Ninguna. El método parte de cero absoluto y utiliza un lenguaje claro, cercano y visual. Cada concepto está diseñado para entenderse en 2 minutos y practicarse de inmediato.',
  },
  {
    q: '¿Puedo imprimir los cuadernos y las plantillas?',
    a: 'Sí, todos los archivos PDF están optimizados en alta resolución tanto para leer cómodamente en móvil, tablet o pantalla de ordenador como para imprimirlos en papel si prefieres rellenarlos a mano.',
  },
  {
    q: '¿Qué cubre la garantía de 7 días?',
    a: 'Tienes 7 días naturales completos para poner a prueba el plan. Si revisas el material y sientes que no es para ti, o si tienes cualquier problema técnico para abrir los archivos, escríbenos y te devolveremos el 100% de tu dinero de inmediato. Sin preguntas incómodas.',
  },
]
