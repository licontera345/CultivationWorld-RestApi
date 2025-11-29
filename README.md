# CultivationWorld-RestApi
Una cordillera con antiguos templos envueltos en niebla evoca la atmósfera de un mundo de cultivo inmortal.

Diseño de Aplicación: Simulador de Progresión de Cultivo Inmortal
Introducción

En este proyecto crearemos una aplicación web que simula la progresión de un cultivador a través de diversos reinos de poder, inspirados en las novelas de Xianxia (cultivo inmortal). El objetivo es diseñar un juego interactivo de progresión donde el jugador comienza como un mortal y, mediante entrenamiento, misiones y uso de habilidades, asciende paso a paso hacia la inmortalidad. La aplicación contará con una interfaz atractiva (HTML/CSS con imágenes temáticas) y lógica en JavaScript para gestionar la experiencia, habilidades, misiones y niveles. Se implementará almacenamiento local para guardar el progreso, y se dejará preparada la base para futuras ampliaciones. A continuación se detalla el diseño completo del juego, que luego convertiremos en un “súper prompt” para Codex, de modo que genere el código siguiendo estas especificaciones.

Reinos de Cultivo: Mortal e Inmortal

El sistema de reinos define las etapas de poder del personaje. Tendremos dos grandes etapas: Reinos Mortales (etapas iniciales de cultivo) y Reinos de la Inmortalidad (etapas avanzadas tras alcanzar la iluminación mortal). A continuación se listan estos reinos en orden ascendente:

Reinos Mortales:

Refinación del Cuerpo – El inicio del camino, fortalecimiento físico básico del cultivador.

Refinación del Qi – Aprendizaje para absorber y refinar la energía espiritual (Qi)
ultimate-scheming-system.fandom.com
.

Establecimiento de la Fundación – Formación de una base sólida para futuros avances
ultimate-scheming-system.fandom.com
.

Formación del Núcleo Dorado (Golden Core) – Condensar un núcleo dorado de poder interno
ultimate-scheming-system.fandom.com
.

Alma Naciente – Nacimiento del alma interior; el núcleo dorado evoluciona a un infante espiritual
ultimate-scheming-system.fandom.com
.

Transformación Divina – El alma naciente crece y el cultivador adquiere poderes divinos (a veces llamada Transformación del Alma)
ultimate-scheming-system.fandom.com
.

Transformación del Vacío – Capacidad de fusionarse con el vacío; el cultivador trasciende lo físico
ultimate-scheming-system.fandom.com
.

Mahayana (Gran Ascensión) – Etapa cúlmine del camino mortal, previa a la ascensión a la inmortalidad
ultimate-scheming-system.fandom.com
.

Reinos de la Inmortalidad:

Inmortal Humano – Primer peldaño inmortal (también llamado Ren Xian); vida infinita comienza
ultimate-scheming-system.fandom.com
.

Inmortal de la Tierra – Poder arraigado a la esencia de la tierra
ultimate-scheming-system.fandom.com
.

Inmortal del Cielo – Un inmortal celestial de mayor jerarquía (Tian Xian)
ultimate-scheming-system.fandom.com
.

Inmortal Rey – Rey inmortal (Xian Wang), capaz de dominar reinos menores
ultimate-scheming-system.fandom.com
.

Inmortal Emperador – Emperador inmortal (Xian Di), soberano supremo que domina el Dao Celestial
ultimate-scheming-system.fandom.com
.

Inmortal Divino – Alcance cercano a lo divino (a veces referido como Inmortal Venerable o 仙尊); su poder roza lo de un dios.

Inmortal Eterno – Un inmortal cuyo poder y vida son eternos, invencible con medios convencionales.

Ser Único/Eterno – La cima absoluta: una entidad única en la existencia (similar a un Dios Creador en algunos sistemas)
ultimate-scheming-system.fandom.com
.

Cada reino puede subdividirse en niveles o grados (por ejemplo: inicial, medio, avanzado) para mayor granularidad, pero en esta aplicación inicial nos centraremos en la progresión principal por cada reino. Este orden de niveles sigue la estructura común de muchas historias de cultivo
ultimate-scheming-system.fandom.com
ultimate-scheming-system.fandom.com
, proporcionando a los jugadores una sensación familiar de avance épico.

Sistema de Progresión y Experiencia

El núcleo del juego es un simulador de progresión donde el jugador gana experiencia (XP) para avanzar de un reino al siguiente. A continuación describimos cómo funciona este sistema:

Experiencia y Niveles: El personaje acumula XP completando misiones, entrenando habilidades, derrotando enemigos y otros logros. Cada reino requiere una cierta cantidad de XP para alcanzar su pico y desencadenar la prueba de avance (por ejemplo, una tribulación celestial antes de volverse inmortal, aunque en esta versión inicial podría simplificarse). La dificultad aumenta exponencialmente: reinos superiores requieren cantidades mayores de XP, reflejando la dificultad creciente
davideaversa.it
. Se puede implementar una fórmula de progresión (por ejemplo, XP necesaria que crece un 50% más por nivel, etc.) para dar incremento exponencial en las necesidades de XP, ralentizando la subida en niveles altos. Esto asegura que el jugador deba invertir más esfuerzo a medida que asciende, simulando el obstáculo de cada nuevo reino.

Ganancia de XP: Las principales fuentes de experiencia serán:

Misiones completadas: Cada misión otorgará XP (y posiblemente recompensas) al completarse
webnovel.com
. Misiones más peligrosas o difíciles otorgan más experiencia.

Entrenamiento/Meditación: El jugador puede tomar tiempo para meditar o practicar, generando una cantidad modesta de XP periódicamente (por ejemplo, "Entrenar durante 1 hora = +10 XP"). Esto podría manejarse con temporizadores o simplemente como una opción repetible.

Combate: Derrotar enemigos en combates otorga XP proporcional al enemigo (los enemigos tendrán un nivel o dificultad).

Uso de habilidades: En algunas mecánicas, usar ciertas técnicas mejora la afinidad o maestría, pudiendo otorgar pequeñas cantidades de XP o experiencia de habilidad. Por simplicidad, podríamos omitir XP por uso y centrarnos en misiones y combates, pero es algo que se puede ampliar.

Recolección de recursos: Encontrar hierbas espirituales u objetos valiosos podría dar XP o al menos recursos que indirectamente ayudan (e.g. ingredientes para pociones de experiencia).

Avance de Reino: Cuando el jugador alcanza el límite de XP de su reino actual, deberá intentar un avance. Esto podría ser automático al llegar al tope, o requerir que el jugador presione un botón de "Avanzar de Reino" (por ejemplo, "Intentar romper la barrera hacia Alma Naciente"). Aquí se puede introducir un elemento de decisión o probabilidad: en muchas novelas, el avance puede fallar si no se cumplen condiciones (ej.: necesidad de un objeto, o una probabilidad de éxito). En nuestro caso, inicialmente podemos simplificar y hacer que el avance siempre ocurra al llegar al XP necesario, mostrando un mensaje estilo "Has avanzado a Golden Core!". Más adelante, se podría añadir la mecánica de tribulación: si se desea, por ejemplo, para pasar de Mahayana a Inmortal Humano, el jugador podría enfrentar un último combate (la Tribulación Celestial) como prueba final.

Decisiones Múltiples: El juego no será completamente lineal; ofreceremos elecciones al jugador en ciertas situaciones, afectando su progreso. Por ejemplo, al recibir una misión, el jugador puede decidir cómo abordarla: ¿Ir de frente combatiendo (riesgo alto, alta recompensa) o escabullirse (riesgo bajo, menor recompensa)? Estas decisiones múltiples añadirán rejugabilidad y simularán el camino único de cada cultivador. Implementaremos esto presentando opciones en texto (por ejemplo, botones de decisión durante una misión narrativa). Las decisiones tomadas pueden influir en la recompensa de XP o ítems e incluso en la historia (por ejemplo, aliarse con un clan u otro podría desbloquear diferentes misiones más adelante).

En síntesis, el sistema de progresión motivará al jugador a realizar actividades variadas para ganar XP. Mostraremos al jugador su XP actual y la necesaria para el próximo nivel/reino mediante una barra de progreso o indicador claro en la interfaz. Esto, combinado con eventos de avance espectaculares (por ejemplo, animaciones o descripciones épicas al ascender de reino), proporcionará una experiencia gratificante de crecimiento de poder.

Habilidades y Técnicas

Un elemento clave del juego es un amplio repertorio de habilidades que el jugador puede aprender y usar. Estas habilidades de cultivo incluyen artes marciales, técnicas energéticas, hechizos y habilidades de apoyo. En la aplicación, las habilidades estarán diseñadas con efectos numéricos (ejemplo: daño, curación, bonificaciones) para integrarlas en la mecánica de juego
immortalmountain.wordpress.com
. Las habilidades se pueden clasificar en varias categorías, asegurando “de todo tipo un poco”, como se detalla a continuación:

Técnicas de Cultivo (功法): Son métodos de cultivación internos que aumentan la eficiencia del entrenamiento y el ritmo de acumulación de Qi
martial-world.fandom.com
. Ejemplo: “Técnica de la Fundación Sólida” (incrementa la ganancia de XP en Refinación del Qi en un +20%). Estas técnicas suelen ser pasivas o de activación prolongada (meditación) y no tienen efecto de combate directo, pero son fundamentales para progresar más rápido. En el juego, podrían implementarse como bonificaciones permanentes al personaje tras aprenderlas (por ejemplo, al alcanzar un nuevo reino el jugador desbloquea una técnica de cultivo correspondiente).

Habilidades Marciales (ofensivas): Son ataques físicos o de energía destinados a dañar al oponente
martial-world.fandom.com
. Ejemplos: “Golpe del Dragón Ascendente” (daño físico 120; un potente puñetazo potenciado con Qi), “Llama Purificadora” (ataque de elemento fuego, daña al enemigo con 100 de daño mágico). Cada habilidad mostrará su daño numérico. Algunas pueden tener adicionales como probabilidad de crítico o efectos de estado (quemar, paralizar, etc.), aunque inicialmente mantendremos efectos simples. Estas técnicas consumen energía (mana/Qi) si implementamos un recurso de energía; de lo contrario, podrían tener tiempos de recarga para equilibrar.

Habilidades Defensivas: Técnicas para reducir daño o protegerse. Ejemplos: “Escudo Espiritual” (reduce el daño recibido en un 50% durante X segundos), “Piel de Hierro” (bono de defensa +30 por 10s). En números, podrían incrementar temporalmente la estadística de defensa del jugador o absorber una cantidad fija de daño. Sirven para aumentar la supervivencia en combates difíciles.

Habilidades de Movimiento/Evasión: Aumentan la velocidad o permiten esquivar ataques
martial-world.fandom.com
. Ejemplo: “Paso del Viento Sombrío” (aumenta la velocidad de ataque y probabilidad de esquivar en 20% por un corto período). Esto puede traducirse en el juego como un buff que otorga más turnos al jugador o disminuye la precisión de los enemigos, según cómo planteemos el combate.

Habilidades de Curación y Apoyo: Artes que restauran salud o curan estados negativos, o proporcionan buffs a stats. Ejemplo: “Curación Esotérica” (cura 50 HP al instante), “Mantra Vigorizante” (regenera 5% de HP por segundo durante 10s), “Aura de Batalla” (aumenta ataque de aliados en X). Estos efectos se reflejan directamente en números de vida o estadísticas. En un juego de un solo jugador, las habilidades de curación principalmente benefician al propio jugador; si se planea en un futuro tener compañeros o multiplayer, las de apoyo tendrían más relevancia de grupo.

Técnicas Auxiliares y Misceláneas: Aquí entran habilidades especiales que no encajan en combate directo pero mejoran las capacidades generales del personaje
martial-world.fandom.com
. Por ejemplo: técnicas de percepción (aumentan el “sentido divino” para detectar tesoros o enemigos cercanos), técnicas de sigilo (para misiones de infiltración), conjuración de bestias (invocar un compañero espiritual que ayude en combate). Estas habilidades añaden profundidad y alternativas tácticas. Su implementación puede ser más compleja (p.ej. un familiar que luche a tu lado), por lo que inicialmente podríamos presentarlas de forma limitada (ej: una habilidad de “Sentido Espiritual” que al activarse revela información oculta en misiones, aumentando las recompensas encontradas).

Alquimia y Forja (Crafting): Si bien no son “habilidades de combate”, en muchos mundos de cultivo el protagonista aprende refinamiento de píldoras o forja de armas. Podemos incorporarlo como sistemas de juego: recolectar materiales en misiones permite al jugador crear píldoras que otorgan XP extra o curaciones fuertes, o forjar talismanes y armas que mejoran sus atributos. Por ejemplo: la “Píldora de Fortalecimiento Corporal” podría dar +100 XP o aumentar temporalmente un stat. Estas actividades serían presentadas como misiones/mini-juegos; por ahora las mencionamos como posibilidad de expansión. En la base de esta aplicación, podríamos incluir una o dos recetas simples (ej: combinar 3 hierbas = 1 Píldora de XP +50) para sentar el esquema.

Gestión de Habilidades: El jugador desbloqueará nuevas habilidades al subir de reino o completar ciertos hitos (misiones especiales, entrenamiento con un maestro, etc.). Al inicio, tendrá unas pocas básicas (ej. un ataque simple, una defensa básica). Progresivamente añadiremos más en su “arsenal de técnicas”. En términos de implementación, definiremos un conjunto de habilidades en un array/objeto JSON con sus propiedades: nombre, descripción, tipo (ataque, defensa, etc.), valores numéricos (daño, curación, duración), y quizás requisito de reino (una habilidad poderosa solo usable a partir de Alma Naciente, por ejemplo). Esto permite listar automáticamente las habilidades disponibles para el jugador. También mostraremos en la UI botones o íconos para usarlas durante combates o misiones interactivas.

Al usar una habilidad en combate, veremos feedback numérico (p.ej. “Golpe del Dragón causa 120 de daño al enemigo”). De igual forma, si el enemigo ataca, reduciremos HP del jugador mostrando el número. Estos valores refuerzan la naturaleza RPG numérica del juego solicitada. Todas las habilidades estarán balanceadas inicialmente de forma sencilla, pero parametrizadas para poder ajustar daño/curación fácilmente.

Misiones y Tareas

La aventura del jugador estará impulsada por misiones de diversos tipos. Las misiones proporcionan narrativa y objetivos, además de ser la fuente principal de recompensas (XP, oro/espíritu, objetos, desbloqueo de habilidades). Para cumplir con “todo tipo de misiones, todo tipo de todo”, diseñaremos una variedad de misiones inspiradas en las historias de wuxia/xianxia y en mecánicas clásicas de RPG:

Misiones de Caza de Bestias Demoníacas: El jugador debe derrotar cierta criatura o grupo de enemigos. Ejemplo: “Elimina al Tigre Demonio que aterroriza la aldea”. Al completar, otorga XP y quizá materiales (piel, garras) utilizables para forja o venta. Estas misiones involucran combate directo.

Misiones de Recolección de Recursos: Buscar hierbas espirituales raras, minerales mágicos u objetos específicos. Ejemplo: “Recolecta 5 Flores de Loto de Nieve para el alquimista de la secta”. Aquí el énfasis está en explorar (podemos simular exploración con descripciones y elecciones del tipo “buscar en el bosque” o “explorar la cueva”). Puede haber eventos aleatorios mientras se busca (enemigos que aparecen, decisiones: ¿tomar una flor menos madura ahora o esperar a que florezca más?). Recompensa: XP y las hierbas mismas, que pueden usarse en alquimia.

Misiones de Escolta/Protección: Proteger a un personaje o caravana en su travesía. Ejemplo: “Escolta a la Sacerdotisa a través del Bosque Sombrío”. Durante el viaje, ocurren encuentros (ej. bandidos o bestias atacando), y posiblemente decisiones (“¿Tomar el camino corto pero peligroso, o el largo más seguro?”). Éxito otorga XP, mayor si la protegida sobrevive ilesa, por ejemplo.

Misiones de Entrenamiento/Torneo: Participar en un torneo marcial o entrenar con un maestro. Ejemplo: “Desafía a los discípulos de la Secta Vecina en un torneo amistoso”. Esto genera una serie de combates 1v1. Alternativamente, “Entrena en la Pagoda Marcial durante 3 días”, donde el jugador elige entrenar resistencia, fuerza o técnica (cada opción da distintos beneficios: +XP, o dominio de habilidad, etc.). Este tipo de misión enfatiza el crecimiento del personaje y puede desbloquear habilidades nuevas al completarse (por ejemplo, entrenar con un maestro legendario te enseña una técnica especial).

Misiones de Exploración y Misterio: Investigar ruinas antiguas, resolver un enigma, o explorar un área desconocida. Ejemplo: “Explora la Tumba del Sabio Antiguo”. Aquí incorporamos elementos de decisión múltiple: dentro de la tumba, se presentan opciones (“¿Abrir el cofre antiguo?” – podría ser trampa o tesoro; “¿Leer el pergamino viejo?” – podría darte XP de conocimiento o desencadenar una maldición/combatir un espectro). Este tipo de misión añade narrativa profunda y al jugador le recompensa la curiosidad (pero también riesgo).

Misiones de Secta (encargos recurrentes): Como miembro de una secta de cultivadores (podemos asumir el jugador pertenece a una), habrá tareas repetibles como “Misiones de secta” del tablón: cacerías menores, recopilar tributo, ayudar a aldeanos, etc. Estas misiones generadas aleatoriamente dan variedad infinita y permiten farmear XP de forma continua. Por ejemplo, una misión generada podría ser: “Patrullar el Valle Verde y eliminar cualquier bestia violenta (0/3 eliminadas)”. Son similares a caza, recolección, etc., pero renovables.

Eventos de Historia Principal: Además de las misiones genéricas, habrá ciertas misiones clave que impulsan la historia (por ejemplo, alcanzar Foundation Establishment podría desencadenar una misión especial de superar una prueba interna, o un enemigo recurrente aparece y hay que enfrentarlo). Estas misiones “saga” avanzan la trama y suelen ser más difíciles, pero obligatorias para progresar de un gran reino a otro. Por ahora, en nuestro diseño base mencionaremos esta posibilidad, aunque la implementación de una historia compleja puede quedar para expansiones. Podemos, sin embargo, incluir una misión principal introductoria que guíe al jugador por las mecánicas (un tutorial narrativo: “Tu viaje comienza cuando tu aldea es atacada, y decides cultivar para vengarla…”).

Estructura de Misiones: Internamente, cada misión tendrá atributos como: título, descripción, tipo, requisitos (nivel mínimo, objetos, decisiones previas), recompensas (XP, objetos, desbloqueos), y estado (no iniciada, en progreso, completada). Esto se representará en código posiblemente como objetos o una lista de misiones. En la interfaz, podremos mostrar un listado de misiones disponibles (por ejemplo, un menú de “Tablón de misiones” en una sección de la UI). Al seleccionar una misión, se muestra la descripción y un botón de “Iniciar misión”. Durante la misión, el juego puede presentar texto narrativo y opciones (si aplica), o directamente entrar en combates predefinidos. Al finalizar, mostrar un mensaje de éxito/fallo y otorgar las recompensas automáticamente, actualizando la experiencia y el inventario del jugador.

Muchas misiones integrarán decisiones múltiples en su desarrollo, haciendo que el jugador influya en el resultado. Por ejemplo, en la misión de la Tumba del Sabio: si decide leer el pergamino, podría evitar una trampa y obtener conocimiento (+XP extra), mientras que si ignora el pergamino va directo al final pero pierde ese bonus. Estas bifurcaciones se pueden manejar con simples condicionales en el flujo de la misión (ramificando el texto y los efectos según la elección).

Las misiones también pueden afectar la reputación del jugador o su alineamiento (justo/demoníaco), aunque esto sería adicional: se menciona porque “todo tipo de todo” podría implicar incluso sistemas de karma; podríamos marcarlo como posible expansión (por ejemplo, decisiones crueles vs compasivas alteran si el jugador accede a ciertas técnicas de cultivo demoniaco o justo). En la versión base, no implementaremos un sistema complejo de moral, pero dejaremos el código preparado para que misiones puedan tener consecuencias (p.ej., una bandera de “aldea salvada” que influya en misiones posteriores).

En resumen, habrá suficiente variedad de misiones para mantener al jugador entretenido: combate, exploración, recolección, etc., con recompensas significativas. Esto está en línea con guías de juegos de cultivo, que destacan la importancia de misiones y desafíos para obtener experiencia y recompensas
webnovel.com
webnovel.com
.

Sistema de Combate

Implementaremos un sistema de combate sencillo por turnos para resolver enfrentamientos en misiones de caza, torneos y eventos hostiles. El combate permitirá utilizar las habilidades con sus efectos numéricos (daño, curación) tal como se ha planificado. Aspectos clave del sistema de combate:

Estadísticas Básicas: El personaje jugador (y los enemigos) tendrán al menos Puntos de Golpe (HP) para la vida. Adicionalmente podemos tener Ataque, Defensa y Qi/Energía:

Ataque determina el daño base que inflige con ataques físicos básicos.

Defensa reduce el daño recibido (podemos usar una fórmula sencilla: daño neto = ataque enemigo - defensa del jugador, con un mínimo de, digamos, 1).

Energía/Qi (mana) se usa para habilidades; cada habilidad costaría cierta energía. Si preferimos simplificar, podemos omitir la barra de mana y permitir uso libre de habilidades con cooldown. Pero un recurso de energía añade estrategia (no spamear habilidades más poderosas sin medida).

Turnos: Supondremos combates 1 vs 1 (el jugador contra un enemigo a la vez). Alternativamente, podrían ser 1 vs varios secuenciales. Por simplicidad, hacemos turnos alternos: primero el jugador elige una acción (usar habilidad X o ataque básico), luego el enemigo ataca. Repetir hasta que uno quede sin HP. Este tipo de combate RPG clásico por turnos es fácil de implementar en JavaScript y suficiente para nuestra necesidad.

Uso de Habilidades: En cada turno del jugador, la interfaz mostrará las habilidades disponibles (botones para cada habilidad ofensiva/defensiva) y quizás un botón de “Ataque normal”. Al hacer click en una habilidad, se calculará su efecto: reducir HP del enemigo en X (si es ataque), o aumentar HP del jugador (si es curación), etc. Luego se muestra el resultado en texto, por ejemplo: “Usaste Golpe del Dragón, causando 120 de daño.” Si la habilidad tiene cooldown o costo de energía, se aplican (deshabilitar botón hasta que pase un tiempo, o restar energía). Tras la acción del jugador, se evalúa si el enemigo murió; si no, realiza su acción. Enemigos generalmente solo harán un ataque básico (podemos más adelante darle habilidades también, pero no es prioritario para la primera versión). Entonces restaremos la vida del jugador: “El Tigre Demonio te rasguña, te causa 30 de daño.” Mostramos la HP actual del jugador luego del golpe. El jugador puede también tener la opción de usar un ítem en su turno (ej: poción de curación) – esto lo podemos incluir si implementamos objetos consumibles.

Dificultad y Balance: Los atributos de enemigos crecerán con el nivel de la misión. Por ejemplo, un Lobo Espiritual (enemigo débil) puede tener 50 HP y 10 ataque, mientras un General Demoníaco en etapas avanzadas podría tener miles de HP y daño muy alto. El jugador, al subir de reino, incrementará sus atributos (salud, ataque, etc.) proporcionalmente, para poder enfrentar retos mayores. Podríamos establecer un esquema donde cada avance de reino multiplica los atributos base del personaje (por ejemplo, pasar a Fundación le duplica la salud, obtener Núcleo Dorado la triplica, etc.), reflejando esa fantasía de poder exponencial de los cultivadores
ultimate-scheming-system.fandom.com
. Así, reinos inferiores sencillamente no podrían vencer a superiores, lo cual es consistente con el lore. En gameplay, esto simplemente se traduce a números más grandes, lo cual es manejable.

Resultado del Combate: Si el jugador gana, la misión progresa o se completa, otorgando la recompensa (XP, etc.). Si el jugador pierde (HP llega a 0), podemos manejarlo de dos formas: 1) Derrota con opción de reintentar la misión (reseteando el enemigo y la HP del jugador, tal vez con una pequeña penalización como perder algunos XP u objetos), o 2) Muerte permanente (inaceptable normalmente para un juego continuo; tal vez no usar permadeath aquí, salvo que se quiera un modo hardcore). Probablemente permitamos reintentar, ya que la idea es que el jugador siga progresando. Quizá el castigo sea regresar al menú de la secta sin recompensa.

Interfaz de Combate: Podría presentarse en una sección distinta de la pantalla (por ejemplo, al iniciar combate, en un panel aparece la información del enemigo y botones de acción). Mostraremos: nombre y HP del enemigo, y los HP (y tal vez energía) del jugador. También un log de texto donde describimos cada acción (tipo narración de turnos). Esto ayuda a entender el efecto de las habilidades y da feedback.

En código, el combate puede implementarse con una simple loop/intervalo que espera la elección del jugador cada turno. Dado que es single-player, no hay sincronización complicada. Podemos controlar turnos con un estado (playerTurn = true/false). Las habilidades del jugador se modelarán con sus valores (daño, etc.) como ya se dijo; los enemigos podemos modelarlos como objetos con stats y quizás una función “ataque” que devuelve cuánto daño hacen.

Este sistema de combate satisfará el requisito de habilidades con efectos numéricos (daño, curación) de forma tangible. El jugador verá claramente esos números reduciendo barras de vida, lo que añade feedback visual y numérico importante en un RPG. Además, sienta las bases para ampliar con más profundidad (más stats como crítico, evasión; estados alterados; múltiples enemigos; etc., en futuras versiones).

Diseño de la Interfaz (HTML/CSS)

Para lograr una presentación “bonita, bien diseñada”, dedicaremos esfuerzo a la interfaz de usuario. Algunos elementos de la UI y consideraciones de diseño:

Disposición General: Usaremos una estructura de página sencilla: quizás un marco o container central con secciones para: Información del Personaje (reino actual, XP, HP, estadísticas), Listado de Habilidades (botones para usarlas), Misiones (selección y descripción), y un área de texto para narraciones/resultados. Podemos utilizar una distribución con paneles: por ejemplo, un panel lateral para info de personaje y botones de acciones generales, y un panel principal para contenido (misiones, combate, etc.). HTML5 y CSS3 serán suficientes; posiblemente flexbox o grid para organizar elementos de manera responsiva.

Estética Temática: Dado el tema oriental/fantasía, elegiremos estilos acordes: colores oscuros o neutros con detalles dorados o aguamarina (comunes en interfaces de cultivo), tipografías legibles pero con un toque asiático si es posible (por ejemplo, usar una fuente estilo caligráfica para títulos). Un fondo adecuado podría ser una imagen sutil de un paisaje de montañas con templos (similar a la que hemos incluido arriba) con opacidad baja para no distraer. Incluir imágenes decorativas: íconos para las habilidades (espada para ataque, escudo para defensa, corazón para curación, etc.), imágenes representativas en la descripción de reinos (por ejemplo, un pequeño icono de núcleo dorado cuando llegue a ese nivel). Se puede emplear bancos de íconos gratuitos o dibujos sencillos; para prototipo incluso emojis podrían valer (🔥 para fuego, 🛡️ para defensa, etc.). Sin embargo, procuraremos mantener consistencia estilística.

Elementos Interactivos: Botones y menús tendrán estilos personalizados: p.ej., botones con apariencia de pergamino o con bordes ornamentados, al pasar el mouse cambien de color (hover) para buena UX. Utilizaremos CSS para estas decoraciones. También podríamos implementar tooltips (descripciones emergentes) al pasar sobre habilidades, mostrando sus detalles numéricos. Esto mejora la usabilidad permitiendo que el jugador entienda cada habilidad sin saturar la pantalla con texto permanente.

Feedback Visual: Además de logs de texto para combates, podríamos agregar animaciones simples con CSS/JS: por ejemplo, cuando el jugador usa una habilidad, hacer parpadear el recuadro del enemigo en rojo (indicando daño), o una pequeña animación de sacudida. Igualmente para el jugador recibiendo daño. Estas sutilezas hacen el juego más dinámico. Con CSS podemos utilizar @keyframes para efectos de parpadeo, o simplemente añadir/remover clases que cambian el estilo momentáneamente. También, mostrar la barra de HP reduciéndose. Una barra de XP en la info de personaje debe actualizarse conforme se gana experiencia, quizás con una animación de ancho.

Distribución de Información: Debe ser clara. En la parte superior o lateral, mostrar “Reino actual: Refinación de Qi (Nivel 5/10), XP: 120/200”. Así el jugador sabe su progreso a siguiente nivel. Debajo, “HP: 300/300” (y “Energía: ...” si se usa). En una sección “Habilidades Disponibles”, listar botones de las técnicas que el jugador puede usar fuera de combate (por ejemplo, un botón “Meditar” que es una acción para ganar XP pasivamente, o “Usar Píldora”). Dentro de combate, esos botones cambian a las habilidades de combate utilizables. Esto implica que la lista de botones de habilidades puede ser dinámica: actualizarse según contexto (paz o combate). Alternativamente, siempre mostrar todas, pero desactivar las no pertinentes. Cualquiera de las dos está bien.

Imágenes en la UI: Podemos incluir imágenes de fondo representativas para cada gran reino, que se muestren cuando alcanzas dicho reino (por ejemplo, al llegar a Alma Naciente, cambiar el fondo o banner a una imagen de un cultivador meditativo). También imágenes para enemigos quizá (un pequeño retrato del monstruo actual en combate). Dado que el problema menciona "imágenes bonitas", planeamos utilizar al menos un par de imágenes de dominio público para mejorar la inmersión. Por ejemplo, la imagen de un templo en la niebla (como la que mostramos) podría ser el fondo principal. Otra imagen de un guerrero en pose podría adornar la pantalla de personaje. Estas imágenes estarían referenciadas con <img src="..."> en HTML o via CSS background-image. Nos aseguraremos de citar o atribuir las imágenes si es necesario, aunque en la implementación final para el juego, buscaríamos recursos libres de uso.

En general, la interfaz debe ser intuitiva: aunque habrá muchos sistemas (habilidades, misiones, stats), organizaremos de forma que un nuevo jugador pueda entender rápidamente. Podremos incluir un tutorial inicial en la narrativa que explique los elementos de la UI (por ejemplo, un primer combate guiado que indica “haz clic en Golpe Básico para atacar al enemigo”). En esta primera versión, bastará con que los elementos estén bien etiquetados y autoexplicativos mediante texto.

Arquitectura Técnica y Persistencia

A continuación, describimos cómo se implementará técnicamente la aplicación y cómo dejaremos todo listo para ampliaciones futuras:

Estructura de Archivos: Separaremos preocupaciones en tres archivos principales para orden y mantenimiento: index.html (markup y estructura estática), styles.css (estilos visuales), y script.js (lógica de juego). Esta modularidad facilita escalar la aplicación. Codex podrá generar estos archivos por separado según las instrucciones. La estructura del proyecto será algo como:

/cultivation-simulator/
  ├── index.html
  ├── styles.css
  └── script.js


Donde index.html incluirá referencias a los otros dos (un <link rel="stylesheet" href="styles.css"> en el <head> para CSS y un <script src="script.js"> antes de </body> para JS).

Almacenamiento Local: Usaremos LocalStorage del navegador para persistir el progreso del jugador
gamedevjs.com
gamedevjs.com
. Esto permite que, si el jugador cierra el juego y vuelve luego, no pierda su avance (reino alcanzado, XP, habilidades conseguidas, etc.). En concreto:

Al iniciar la aplicación, el código JS intentará cargar el estado guardado con localStorage.getItem('gameState'). Si existe, parsearemos el JSON para restaurar los datos del jugador (reino, xp, stats, inventario, etc.)
gamedevjs.com
. Si no existe (primera vez), inicializaremos con valores por defecto.

Cada vez que ocurra un cambio significativo (ganar XP, completar una misión, aprender habilidad, etc.), actualizaremos el objeto de estado y volvemos a guardarlo en localStorage con setItem (tras convertir a JSON)
gamedevjs.com
gamedevjs.com
. Podemos hacerlo de manera debounced (es decir, no en cada punto porcentual de XP ganado, pero sí al finalizar misiones, subidas de nivel, etc., para eficiencia).

El uso de LocalStorage es apropiado porque nuestro juego es single-player y los datos a guardar son relativamente pequeños (básicamente números y listas) – hay un límite de ~5MB, más que suficiente
gamedevjs.com
. No requerimos base de datos ni servidor para esta persistencia básica, lo cual mantiene el proyecto simple.

Backend (Escalabilidad): Dado que se mencionó “backend para escalar”, aclaramos: esta versión no necesita servidor; todo ocurre en la aplicación web local (lo que se conoce como 100% frontend). Esto significa que un juego single-player puede funcionar completamente en front-end
twinwingames.com
. Sin embargo, si en el futuro se desea convertir en multijugador (por ejemplo, comparar progreso con amigos, o un mundo compartido), o simplemente guardar progresos en la nube, se podría desarrollar un backend. Un backend permitiría funcionalidades como leaderboards, eventos en vivo, o simplemente resguardar datos de los jugadores de forma más segura que en el navegador. Por ahora, no implementaremos backend, pero nuestro código estará estructurado de forma que aislar lógicamente la capa de datos (estado del juego) de la de presentación. Esto facilitaría en un futuro migrar el almacenamiento de LocalStorage a llamadas a un API REST, por ejemplo, sin reescribir toda la lógica. Resumiendo: single-player titles can function without a backend, backend is only needed for multiplayer or advanced features
twinwingames.com
.

Escalabilidad y Legibilidad del Código: Al generar el código con Codex, nos aseguraremos de que esté bien comentado y estructurado, de modo que sea fácil de ampliar. Por ejemplo:

Definiremos clases o constructores para las entidades principales: PersonajeJugador, Enemigo, Misión, Habilidad. Esto nos permite crear nuevos enemigos o misiones simplemente instanciando objetos de esas clases con diferentes parámetros, en lugar de duplicar código.

Usaremos estructuras de datos (arrays, objetos) para listas de habilidades, misiones, etc., como mencionamos. Incluso podría haber un objeto global gameState que contenga todo el estado (jugador, listas de cosas) para guardar/cargar fácilmente.

Comentaremos cada sección de código: por ejemplo, arriba de la función que maneja el combate, un comentario // Esta función procesa un turno de combate. Esto ayudará a otros desarrolladores (o los mismos usuarios) a entender y modificar. Codex puede generar estos comentarios si se lo indicamos.

Mantendremos funciones pequeñas y específicas (principio de responsabilidad única). Ejemplo: una función gainExperience(amount) que se encargue de agregar XP al jugador y verificar si sube de nivel. Otra función startMission(missionId) que inicializa la misión seleccionada. Y así sucesivamente. Esto modulariza la lógica y hará más sencillo agregar nuevas misiones o recalibrar la ganancia de XP en un solo lugar.

Preparación para Ampliar: Dejaremos “ganchos” para añadir contenido: por ejemplo, quizás solo definiremos 3 misiones en la demo, pero documentaremos en el código dónde y cómo añadir más (p.ej., añadir nuevos objetos en el array missions con la misma estructura). Lo mismo con habilidades: Codex generará algunas de ejemplo, y podemos añadir más entradas siguiendo ese formato. Asimismo, estructurar el HTML con contenedores generales significa que agregar nuevos elementos de UI (como una sección de Inventario futuro) no rompa el diseño.

Pruebas Básicas: Aunque Codex generará el código, es útil que validemos mentalmente los flujos principales: iniciar juego (estado nuevo o cargado), seleccionar misión, combate, ganar/perder, subir nivel, guardar. Indicaremos a Codex que contemple esos flujos para minimizar bugs. Adicionalmente, tras obtener el código, se deberá probar en un navegador real para pulir detalles, pero el prompt buscará que Codex genere código lo más libre de errores posible. Incluir testeo básico en forma de logs (por ejemplo, console.log en puntos clave) puede ayudar durante desarrollo; podemos pedir a Codex que deje algunos logs comentados o activos para depuración, que luego se quitan en release.

Con todo lo anterior, estamos listos para crear el prompt final para Codex. Este incluirá instrucciones claras y organizadas basadas en este diseño. Aprovecharemos la información investigada (por ejemplo, los nombres de los reinos, estructura de datos, mecánicas) para alimentar a Codex con todos los detalles necesarios. El objetivo es que Codex genere un código fuente completo y funcional de la aplicación, que sirva como base sólida para futuras expansiones. A continuación, presentamos el Super Prompt en español, paso a paso, para que Codex construya la aplicación según lo especificado.

Instrucciones Finales para Codex (Super Prompt)

Rol: Eres Codex, un modelo de IA especializado en desarrollo web y juegos. Vas a generar el código de un simulador de progresión de cultivo inmortal según las siguientes indicaciones. Presta atención a los detalles de mecánica y diseño proporcionados.

Tareas:

Generar Estructura HTML (index.html): Crea un documento HTML5 básico con:

<head> con título apropiado (ej: “Cultivation Simulator”) y enlace al CSS (styles.css).

<body> estructurado con secciones div identificables para: información del jugador, lista de habilidades, panel de misiones, y área de combate/mensajes. Por ejemplo, un <div id="player-info"> para nivel, XP, HP; un <div id="missions"> donde listar misiones disponibles; un <div id="combat-log"> para textos narrativos de combate o misión; etc. Agrega también algunos elementos iniciales, como un botón “Meditar” o “Entrenar” para ganar XP, y un botón “Guardar” (opcional) si se desea forzar guardado manual además del autoguardado.

Incluye en el body la referencia al script JS (<script src="script.js"> al final).

Generar Estilos CSS (styles.css): Define estilos para lograr la estética descrita:

Estilos de layout: usa Flexbox o Grid para organizar, por ejemplo, el panel lateral vs panel principal. Asegúrate de que la interfaz sea responsive (por lo menos que en pantallas pequeñas los paneles se apilen verticalmente).

Colores y fuentes: fondo oscuro con texto claro, o un fondo con imagen suave. Estilos para <button> que correspondan al tema (podrías usar background-color semi-transparente, bordes redondeados, etc., para simular pergaminos modemos). Aplica un efecto hover a botones (p.ej., cambio de brillo o subrayado).

Estilos para las barras de HP/XP: posiblemente representadas con <div class="bar"> anidadas. Por ejemplo, un contenedor con clase .hp-bar de ancho fijo y un interior .hp-fill con ancho porcentual según HP%. Diseña estas barras con colores (HP en verde/rojo, XP en azul/dorado, por ejemplo) y texto encima indicando valores.

Tipografía: elige una fuente sans-serif legible para textos generales, y quizás una cursiva elegante para títulos. Puedes utilizar fuentes web seguras o enlazar una Google Font (si fuera el caso, incluir el link en <head>).

Clase utilitarias para efectos: por ejemplo .critical para texto de daño crítico (color rojo intenso), .heal para curación (verde).

Asegura que las imágenes de fondo o decorativas no obstruyan la legibilidad; utiliza CSS (e.g., background-size: cover; opacity: 0.2;).

Generar Lógica de Juego (script.js): Es la parte más extensa. Incluye:

Estructuras de Datos: Crea objetos/variables para almacenar el estado del jugador (nivel actual de reino, XP, HP, ataque, defensa, energía, etc.), las listas de habilidades y misiones. Por ejemplo:

let player = {
  realm: "Refinación del Qi", level: 1, maxLevel: 10,
  xp: 0, xpToNext: 100,
  hp: 100, maxHp: 100,
  attack: 10, defense: 5,
  energy: 50, maxEnergy: 50,
  skills: [/* array de habilidades disponibles (referencias a objetos skill) */],
  items: [] // inventario (si se usa)
};


Define también las habilidades en un array de objetos, con propiedades como name, type, damage, healing, cost, cooldown, description, requiredRealm etc. Inicia con ~5 habilidades de distintos tipos como ejemplo (pueden ser las mencionadas antes u otras creativas). Igual para misiones: un array missions con objetos {id, title, description, type, xpReward, itemReward, enemy: {...}, completed: false, ...}. Pon 2-3 misiones de ejemplo. Una misión de combate contra un enemigo sencillo, otra de recolección, etc., para demostrar variedad.

Inicialización: Al cargar la página, llama a una función loadGame() que intenta leer localStorage.gameState. Si existe, parsea y asigna los valores al jugador y otras estructuras (asegurando convertir back a objeto los arrays, etc.). Si no existe, inicia con valores por defecto (como el objeto player definido). Tras eso, llama a updateUI() para refrescar todos los elementos visuales (mostrar nombre de reino, XP, HP, etc. en la página).

Update UI: Implementa la función updateUI() que toma los datos actuales y los refleja en el HTML. Por ejemplo: document.getElementById("xp-bar").style.width = (player.xp/player.xpToNext*100)+'%'; document.getElementById("xp-text").innerText = player.xp + " / " + player.xpToNext; y similar para HP. También lista las misiones disponibles: recorre missions y para cada una no completada, crea un elemento (p.ej. <button> con el nombre de la misión y un eventListener al hacer click que llame a startMission(id)). Igualmente, generar la lista de habilidades disponibles: botones para cada player.skills. Si alguna habilidad está bloqueada (por requisito de realm), se puede mostrar atenuada o no mostrar hasta que corresponda.

Guardar Juego: Cada vez que ocurra un cambio importante, llama a una función saveGame() que hace localStorage.setItem('gameState', JSON.stringify({ player, missions /*...*/ })). Guarda todo el estado necesario. Para seguridad, esta función podría llamarse dentro de updateUI() o al finalizar misiones, etc. También podrías ligar window.onbeforeunload para guardar automáticamente al cerrar pestaña.

Manejo de Misiones: Escribe función startMission(missionId) que busca la misión por id en missions. Dependiendo del tipo de misión:

Si es de combate, prepara el sistema de combate: por ejemplo, copiar los datos del enemigo de la misión a una variable global currentEnemy. Mostrar en la UI la sección de combate (nombre enemigo, HP, etc.), ocultar o deshabilitar elementos de misiones durante el combate. Puede llamar a beginCombat() por ejemplo.

Si es de recolección o no combativa, podría simular directamente un resultado: por simplicidad, podríamos simplemente otorgar la recompensa tras un texto descriptivo. Pero mejor, podrías implementar un mini flujo: e.g., usar prompt() o generar botones de decisiones (“Buscar en colina” vs “en río”), y según elección decidir éxito. Pero esto puede ser complejo; para empezar, podemos randomizar un resultado (“Encontraste todas las hierbas!” o “Fracasaste esta vez.”) y luego dar XP. Deja comentarios indicando que aquí se podría expandir con interactividad. Finalmente marca la misión como completada.

Actualiza player.xp sumándole mission.xpReward y otros premios (por ej, player.items.push(mission.itemReward)). Luego llama a checkLevelUp() y a updateUI(). Muestra un mensaje en el log: “Misión X completada. Ganaste Y XP.”.

Sistema de Combate: Implementa funciones beginCombat() (setea turno inicial, etc.), playerAttack(skill) y enemyAttack().

playerAttack(skill): recibe la habilidad usada (puedes pasar el objeto habilidad o su índice). Calcula daño = skill.damage + algún cálculo con player.attack si se quiere. Resta ese daño de currentEnemy.hp. Escribe en combat-log un mensaje narrando la acción. Si el enemigo muere (hp <= 0), llama a endCombat(victory=true). Si no, entonces procede a llamar enemyAttack(). También manejar reducción de energía o cooldown: resta player.energy si skill.cost existe. Y desactiva temporalmente el botón si skill.cooldown > 0 (puedes simplemente implementar cooldown más tarde, pero deja preparado el campo).

enemyAttack(): Calcula daño enemigo = enemy.attack - player.defense (mínimo 1). Resta a player.hp. Actualiza UI de HP. Muestra mensaje (“El enemigo te ataca causando X daño”). Si player.hp <= 0, llama a endCombat(victory=false). Si sigue vivo, vuelve a habilitar las opciones del jugador (siguiente turno).

Podrías implementar turnos con un simple timeout para darle ritmo (por ejemplo, tras el ataque del jugador, esperar 0.5s y luego realizar el del enemigo). Esto no es obligatorio, pero mejora la experiencia en lugar de todo instantáneo.

Final de Combate (endCombat): Limpia el estado de combate. Oculta o reinicia la UI de combate. Si victory=true, otorga recompensa de enemigo: comúnmente XP, quizá dropeos. Podríamos integrarlo con la misión actual: por ejemplo, si estás en una misión de cazar 3 lobos, se puede decrementar un contador y si llega a 0, completar misión. En una misión singular, simplemente completar la misión. Entonces llamar a updateUI(). Si victory=false (derrota), quizás restablecer player.hp al max (simulando que fue rescatado o se recuperó tras un tiempo) y dar mensaje de fracaso. No quitaremos XP (a menos que queramos penalizar, pero podemos omitir penalización por simplicidad). Permitir reintentar la misión si se desea.

Level Up / Advance Realm (checkLevelUp): Cada vez que ganas XP, verifica si player.xp >= player.xpToNext. Mientras sea así (por si ganó mucha XP de una vez), resta player.xpToNext, incrementa player.level o si usamos directamente el nombre de reino, podríamos en lugar de level usar un índice de reino. Quizás más fácil: trackear un índice o listade reinos: realms = ["Refinación del Qi","Fundación",...]; player.realmIndex=0 etc. Al subir, realmIndex++ y actualizar player.realm = realms[realmIndex]. En cualquier caso, manejar: si subió de nivel pero aún dentro del mismo reino (ej. Nivel 2 de Qi Refining de 10), simplemente incrementa stats un poco (HP, ataque escalan un poco). Si llegó al nivel máximo de ese reino (por ejemplo 10/10), entonces rompe el límite y avanza de reino: actualizar player.realm al siguiente nombre, reset player.level o continuar contando, y aplicar un gran incremento de estadísticas (p.ej., +50% HP base, +50 ataque, etc., o valores predefinidos mayores). También se pueden desbloquear nuevas habilidades aquí: e.g., al alcanzar Foundation Establishment, agregar una nueva skill al player.skills array y notificarlo (“Has aprendido Técnica de Espada Espiritual”).
Tras ajustar todo, recalcula player.xpToNext para el nuevo nivel o reino (podemos tener una fórmula, o un tabla de valores). Finalmente, muestra un mensaje en pantalla de subida: si solo subió nivel: “¡Has subido al nivel 5 de Refinación de Qi!”; si pasó de reino: “¡Felicidades, avanzaste al reino Establecimiento de la Fundación!”. Esto es importante para la satisfacción del jugador.

Eventos de Botones Generales: Aparte de misiones y combate, implementa funcionalidad para cualquier botón fuera de esos contextos: por ejemplo, si hay un botón “Meditar” en la UI principal, haz que al clickar añada +X XP (pequeño) y actualice UI (como una acción de entrenamiento rápido). Esto sirve para que el jugador no se quede sin hacer nada si no quiere iniciar misión grande; siempre puede meditar para progresar lentamente. Igualmente, un botón “Guardar” manual puede simplemente llamar saveGame() y mostrar “Juego guardado”.

Comentarios y Limpieza: Asegúrate de que el código esté comentado en español para explicar las secciones clave, como se indicó. También, que no queden referencias no implementadas (por ejemplo, si mencionaste un function en comentarios, trata de implementarla o anótala como “por implementar”). Mantén consistencia en nomenclatura (usa camelCase en JS, ids CSS claros).

Verificación Final: Comprueba que al juntar los tres archivos el flujo básico funcione: Se carga la página, se muestra el estado inicial (nivel 1, etc.), el jugador puede ver misiones, iniciar una, combatir y ganar XP, guardar y cargar. Asegúrate de que las funciones de guardar/cargar no produzcan error si localStorage está vacío inicialmente (usar condicionales apropiados).

Siguiendo todos estos pasos, proporciona el código completo en tres bloques, uno para cada archivo, con las etiquetas apropiadas (HTML, CSS, JS). No incluyas explicaciones fuera de comentarios en código – solo los archivos listos para usar. ¡Gracias y adelante con la generación del código!
