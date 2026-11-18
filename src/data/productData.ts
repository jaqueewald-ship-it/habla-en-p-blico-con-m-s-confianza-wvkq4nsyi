export interface SectionItem {
  id: number
  part: string
  pages: string
  title: string
  description: string
  topics: string[]
}

export interface PreviewItem {
  id: string
  title: string
  subtitle: string
  badge: string
  summary: string
  exercise: string
  tips: string[]
  color: string
}

export interface BonusItem {
  id: string
  number: number
  title: string
  value: number
  description: string
  badge: string
  bullets: string[]
}

export const PRODUCT_DATA = {
  title: 'Habla en público con más confianza',
  subtitle:
    'Un plan práctico de 21 días para organizar tus ideas, entrenar tu voz y aprender a manejar los nervios.',
  totalValue: 97,
  promoPrice: 27,
  savings: 70,
  currency: '€',
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
      title: 'Audiobook + Búsquedas',
      detail: 'Versión de audio para escuchar camino al trabajo y plantillas listas para usar.',
      badge: 'Audio incluido',
    },
    {
      title: 'Método práctico y honesto',
      detail: "Entrenamiento progresivo paso a paso, sin consejos vacíos de 'solo relájate'.",
      badge: '100% aplicable',
    },
  ],
}

export const PREVIEW_CARDS: PreviewItem[] = [
  {
    id: 'prev-1',
    title: 'La agitación que ayuda',
    subtitle: 'Parte 1: Comprender el miedo',
    badge: 'Día 1 · El cuerpo en alerta',
    summary:
      'Tu corazón late rápido no porque seas incapaz, sino porque tu cuerpo se prepara para rendir. Cómo canalizar la adrenalina a tu favor.',
    exercise: 'Ejercicio del día: Mapeo de síntomas físicos y reencuadre del estrés (10 min).',
    tips: [
      'No luches contra la aceleración del pulso: acéptala como energía útil.',
      'Identifica en qué parte del cuerpo sientes la tensión.',
      "Frase ancla: 'Estoy preparado y con energía para comunicar'.",
    ],
    color: 'from-amber-500/10 to-orange-500/5 border-amber-200',
  },
  {
    id: 'prev-2',
    title: 'El suspiro fisiológico',
    subtitle: 'Parte 2: Respiración y cuerpo',
    badge: 'Día 4 · Calmar el sistema',
    summary:
      'Dos inhalaciones cortas por la nariz y una exhalación larga y lenta por la boca. El método neurológico más rápido para bajar pulsaciones.',
    exercise: 'Ejercicio del día: Ciclo de 5 suspiros antes de entrar a la sala o llamada.',
    tips: [
      'Inhalación 1: llena los pulmones al 80%.',
      'Inhalación 2: pequeño extra para abrir los alvéolos.',
      'Exhalación bucal prolongada y desinflada por completo.',
    ],
    color: 'from-sky-500/10 to-blue-500/5 border-sky-200',
  },
  {
    id: 'prev-3',
    title: 'Estructura en 3 partes',
    subtitle: 'Parte 3: Preparar el discurso',
    badge: 'Día 8 · Claridad mental',
    summary:
      'Apertura magnética (el qué y por qué importa), Desarrollo (máximo 3 puntos clave) y Cierre con llamada a la acción memorable.',
    exercise: 'Ejercicio del día: Escribir tu discurso en una sola ficha de cartulina.',
    tips: [
      'Si tienes 10 minutos, habla solo de 1 gran idea principal.',
      'Cada punto debe responder a la pregunta: ¿qué gana la audiencia?',
      'Elimina todo lo que no aporte a tu conclusión final.',
    ],
    color: 'from-emerald-500/10 to-teal-500/5 border-emerald-200',
  },
  {
    id: 'prev-4',
    title: 'Un inicio que captura',
    subtitle: 'Parte 3: Técnicas de apertura',
    badge: 'Día 10 · Los primeros 30 seg',
    summary:
      "Olvídate de 'buenos días, hoy vengo a hablaros de...'. Inicia con una pregunta provocativa, un dato revelador o una breve historia.",
    exercise: 'Ejercicio del día: Diseñar 3 comienzos alternativos y grabarlos en video.',
    tips: [
      'Empieza directamente con la acción o pregunta sin preámbulos.',
      'Pausa de 2 segundos de silencio antes de soltar la primera palabra.',
      'Sonrisa suave y postura anclada.',
    ],
    color: 'from-violet-500/10 to-purple-500/5 border-violet-200',
  },
  {
    id: 'prev-5',
    title: 'Ritmo, volumen y pausas',
    subtitle: 'Parte 4: La voz',
    badge: 'Día 13 · Tu instrumento',
    summary:
      'El silencio es tu mejor aliado. Las pausas estratégicas demuestran dominio y dan tiempo a la audiencia para procesar tus ideas.',
    exercise: 'Ejercicio del día: Lectura de 1 página marcando silencios de 2 segundos.',
    tips: [
      "Sustituye las muletillas ('ehhh', 'o sea') por silencio puro.",
      'Varía el volumen: baja la voz para generar intimidad y súbela para enfatizar.',
      'Articula abriendo la mandíbula y proyectando desde el abdomen.',
    ],
    color: 'from-rose-500/10 to-pink-500/5 border-rose-200',
  },
  {
    id: 'prev-6',
    title: 'La mirada y las manos',
    subtitle: 'Parte 5: Lenguaje no verbal',
    badge: 'Día 16 · Conexión humana',
    summary:
      'La técnica del triángulo visual y las palmas abiertas: cómo proyectar autoridad sin parecer rígido ni intimidante.',
    exercise: 'Ejercicio del día: Práctica frente al espejo o cámara manteniendo mirada continua.',
    tips: [
      'Mira a una persona durante una idea completa (3-5 segundos) antes de moverte.',
      'Mantén las manos por encima de la cintura con movimientos naturales.',
      'Evita refugiarte detrás del atril o cruzar los brazos.',
    ],
    color: 'from-indigo-500/10 to-blue-500/5 border-indigo-200',
  },
  {
    id: 'prev-7',
    title: 'El vacío de memoria',
    subtitle: 'Parte 6: Manejo de imprevistos',
    badge: 'Día 18 · Qué hacer si te bloqueas',
    summary:
      'El protocolo exacto cuando te quedas en blanco: qué decir, cómo beber un trago de agua con elegancia y cómo retomar el hilo sin pedir disculpas.',
    exercise: 'Ejercicio del día: Simular un bloqueo y salir de él usando la frase puente.',
    tips: [
      "Nunca digas: 'Perdón, me quedé en blanco'.",
      'Haz una pausa reflexiva: parece que estás buscando el término exacto.',
      'Usa una pregunta a la audiencia para ganar 10 segundos de calma.',
    ],
    color: 'from-amber-500/10 to-yellow-500/5 border-amber-200',
  },
  {
    id: 'prev-8',
    title: 'Semana 3: Delante de otros',
    subtitle: 'Parte 7: El plan de 21 días',
    badge: 'Días 19–21 · El despegue',
    summary:
      'La progresión de exposición controlada: de grabarte a ti mismo, pasar a exponer ante una persona de confianza y dar el salto al grupo.',
    exercise: 'Ejercicio del día: Exposición real de 3 minutos y checklist post-discurso.',
    tips: [
      'Revisa la escala de situaciones de menor a mayor exigencia.',
      'Celebra cada avance: la confianza se construye con repeticiones.',
      'Tu lista de chequeo para el día de la presentación definitiva.',
    ],
    color: 'from-teal-500/10 to-emerald-500/5 border-teal-200',
  },
]

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

export const BONUSES: BonusItem[] = [
  {
    id: 'bonus-audiobook',
    number: 1,
    title: 'Versión Audiobook Completa (MP3)',
    value: 29,
    badge: 'Audio HD',
    description:
      'La guía completa narrada en audio de alta fidelidad, para escuchar mientras entrenas, cocinas o vas al trabajo.',
    bullets: [
      'Capítulos separados para fácil navegación',
      'Ejercicios guiados de respiración con pausas reales',
      'Descargable en Google Drive para escuchar sin conexión',
    ],
  },
  {
    id: 'bonus-cuaderno',
    number: 2,
    title: 'El Cuaderno de Práctica de los 21 Días',
    value: 19,
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
    number: 3,
    title: '30 Esquemas de Discurso Listos para Rellenar',
    value: 22,
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

export const FAQ_ITEMS = [
  {
    q: '¿Cómo y cuándo recibiré el material?',
    a: 'El acceso es inmediato tras completar tu compra. Serás redirigido a la página de entrega y recibirás acceso directo a la carpeta compartida de Google Drive con la guía en PDF en alta resolución, el audiobook completo en MP3 y los 2 cuadernos de plantillas descargables.',
  },
  {
    q: '¿El pago es único o tiene suscripciones mensuales?',
    a: 'Es un pago único promocional de 27€. No hay cuotas ocultas, ni cobros recurrentes, ni suscripciones de ningún tipo. Acceso para siempre a todos los materiales.',
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
    q: '¿Qué cubre la garantía de 30 días?',
    a: 'Tienes 30 días naturales completos para poner a prueba el plan. Si revisas el material y sientes que no es para ti, o si tienes cualquier problema técnico para abrir los archivos, escríbenos y te devolveremos el 100% de tu dinero de inmediato. Sin preguntas incómodas.',
  },
]
