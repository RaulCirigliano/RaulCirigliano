// ==========================================================================
// 1. CARRUSEL DE IMÁGENES Y MODAL DE HERRAMIENTAS
// ==========================================================================
let slideIndex = 1;

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("horno-slide");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) { 
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) { 
        dots[i].className = dots[i].className.replace(" active-dot", ""); 
    }
    
    slides[slideIndex-1].style.display = "block";
    if (dots.length > 0) {
        dots[slideIndex-1].className += " active-dot";
    }
}

// MULTI-SLIDER LOGIC
const slidersState = {};
function changeSlideId(n, sliderId) {
    if(!slidersState[sliderId]) slidersState[sliderId] = 1;
    showSlidesId(slidersState[sliderId] += n, sliderId);
}
function currentSlideId(n, sliderId) {
    slidersState[sliderId] = n;
    showSlidesId(n, sliderId);
}
function showSlidesId(n, sliderId) {
    let container = document.getElementById(sliderId);
    if (!container) return;
    let slides = container.getElementsByClassName("horno-slide");
    let dots = container.getElementsByClassName("dot");
    if (slides.length === 0) return;
    
    if (n > slides.length) {slidersState[sliderId] = 1}
    if (n < 1) {slidersState[sliderId] = slides.length}
    
    for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    for (let i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active-dot", ""); }
    
    slides[slidersState[sliderId]-1].style.display = "block";
    if (dots.length > 0) {
        dots[slidersState[sliderId]-1].className += " active-dot";
    }
}
// Init function for new sliders
function initSliders() {
    document.querySelectorAll('.slider-container[id]').forEach(container => {
        slidersState[container.id] = 1;
        showSlidesId(1, container.id);
    });
}
window.addEventListener('DOMContentLoaded', initSliders);

const getPlaceholder = (text) => {
    return `https://placehold.co/600x400/f9f5f0/8B5A2B?text=${encodeURIComponent('Herramienta\n(Sin foto)')}`;
};

const toolsData = [
    { name: "Torno alfarero", cat: "modelado", img: "imagenes/guia_hacer/torno_pedal.webp", shape: "Máquina con platina giratoria.", use: "Para centrar la pella, abrirla y levantar las paredes de piezas cilíndricas o cuencos." },
    { name: "Piedra o adoquín", cat: "modelado", img: "imagenes/guia_hacer/adoquin.webp", shape: "Bloque sólido y pesado.", use: "Se coloca bajo el pie para mantener las rodillas niveladas y lograr una buena postura en el torno." },
    { name: "Lamas", cat: "modelado", img: "imagenes/guia_hacer/lamas.webp", shape: "Placas metálicas finas y flexibles.", use: "Para pulir, tallar y hacer texturas sin marcar o arrugar la arcilla blanda." },
    { name: "Desbastadores", cat: "modelado", img: "imagenes/guia_hacer/desbastadores.webp", shape: "Mangos con puntas de metal o alambre.", use: "Para tallar y retirar el excedente de barro, útiles en escultura y retorneado." },
    { name: "Esteca de madera", cat: "modelado", img: "imagenes/guia_hacer/estecas.webp", shape: "Palillos de madera con distintas puntas.", use: "Para hacer presión y unir partes de una pieza de arcilla quebrada en estado seco." },
    { name: "Balanza de precisión", cat: "preparacion", img: "imagenes/guia_hacer/balanza.webp", shape: "Báscula electrónica digital.", use: "Esencial para pesar cantidades mínimas de óxidos, fundentes y pigmentos para formular esmaltes." },
    { name: "Mortero", cat: "preparacion", img: "imagenes/guia_hacer/mortero.webp", shape: "Cuenco rústico con un mazo.", use: "Para moler y homogeneizar en seco o húmedo las arcillas, óxidos y esmaltes, eliminando grumos." },
    { name: "Colador / Tamiz", cat: "preparacion", img: "imagenes/guia_hacer/tamiz.webp", shape: "Filtro con malla metálica de 60-80 hilos.", use: "Filtra engobes y esmaltes líquidos. Se usa frotando con un pincel duro para no romper la malla." },
    { name: "Crisol", cat: "preparacion", img: "imagenes/guia_hacer/crisol.webp", shape: "Recipiente refractario resistente al fuego.", use: "Para fundir esmalte a 900°C en el horno y luego fabricar cristales decorativos." },
    { name: "Pinceles suaves", cat: "decoracion", img: "imagenes/guia_hacer/pinceles.webp", shape: "Pincel de pelo fino natural.", use: "Para aplicar engobes, esmaltes y óxidos acuarelados sin rayar o marcar la pieza." },
    { name: "Soplete y Compresor", cat: "decoracion", img: "imagenes/guia_hacer/soplete.webp", shape: "Pistola de aire a presión.", use: "Aplica esmaltes líquidos en forma de bruma muy fina para lograr superficies parejas en técnicas bajo cubierta." },
    { name: "Esponja", cat: "decoracion", img: "imagenes/guia_hacer/esponja.webp", shape: "Bloque absorbente suave o de aluminio.", use: "Limpia el polvo antes de esmaltar, afina bordes y retira el hollín tras ahumar las piezas en Rakú." },
    { name: "Hornos Cerámicos", cat: "horneado", img: "imagenes/guia_hacer/hornos.webp", shape: "Recinto cerrado con aislación térmica.", use: "Alcanzan altas temperaturas para transformar la arcilla química y físicamente. Pueden ser eléctricos, a gas o leña." },
    { name: "Pinzas metálicas", cat: "horneado", img: "imagenes/guia_hacer/pinza_ceramica.webp", shape: "Tenazas largas de acero.", use: "Para sumergir piezas en esmalte y extraer piezas incandescentes al rojo vivo en la técnica Rakú." },
    { name: "Conos pirométricos", cat: "horneado", img: "imagenes/guia_hacer/conos_pirometricos.webp", shape: "Pirámides pequeñas de arcilla calibrada.", use: "Se doblan por el trabajo térmico (calor y tiempo) y certifican que el horno calienta parejo." }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar carrusel si existe
    if (document.getElementsByClassName("horno-slide").length > 0) {
        showSlides(slideIndex);
    }

    // 2. Inicializar herramientas si existe el grid
    const grid = document.getElementById('toolsGrid');
    if (grid) {
        const searchInput = document.getElementById('searchInput');
        const buttons = document.querySelectorAll('.category-btn');
        const modal = document.getElementById('toolModal');
        const closeModal = document.getElementById('closeModal');

        let currentFilter = 'todas';
        let currentSearch = '';

        function renderTools() {
            grid.innerHTML = '';
            const filtered = toolsData.filter(tool => {
                const matchesCat = currentFilter === 'todas' || tool.cat === currentFilter;
                const matchesText = tool.name.toLowerCase().includes(currentSearch) || tool.use.toLowerCase().includes(currentSearch);
                return matchesCat && matchesText;
            });
            if(filtered.length === 0) {
                grid.innerHTML = '<p style="color:#999;">No se encontraron resultados.</p>';
                return;
            }
            filtered.forEach(tool => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<img src="${tool.img}" alt="${tool.name}" onerror="this.onerror=null; this.src=getPlaceholder();"><h3>${tool.name}</h3><span class="tag">${formatCategory(tool.cat)}</span><p>${tool.use}</p>`;
                card.addEventListener('click', () => openToolModal(tool));
                grid.appendChild(card);
            });
        }

        function formatCategory(cat) {
            const labels = { modelado: "Modelado", preparacion: "Preparación", decoracion: "Decoración", horneado: "Horneado" };
            return labels[cat] || cat;
        }

        function openToolModal(tool) {
            document.getElementById('modalTitle').textContent = tool.name;
            document.getElementById('modalShape').textContent = tool.shape;
            document.getElementById('modalUse').textContent = tool.use;
            const modalImg = document.getElementById('modalImg');
            modalImg.onerror = function() { this.src = getPlaceholder(); };
            modalImg.src = tool.img;
            document.getElementById('modalImg').alt = tool.name;
            if(modal) modal.classList.add('active');
        }

        if (closeModal && modal) {
            closeModal.addEventListener('click', () => modal.classList.remove('active'));
            modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('active'); });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => { currentSearch = e.target.value.toLowerCase(); renderTools(); });
        }

        if (buttons) {
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.cat;
                    renderTools();
                });
            });
        }
        renderTools();
    }

    // 3. Inicializar guía de insumos
    if (document.getElementById('materialsGrid')) {
        renderizarMateriales();

        const grid = document.getElementById('materialsGrid');
        grid.addEventListener('click', function(event) {
            const card = event.target.closest('.card');
            if (!card) return;

            // No hacer nada si se hace clic en un enlace dentro de la tarjeta
            if (event.target.closest('a')) {
                return;
            }

            const isExpanded = card.classList.contains('expanded');

            // Colapsar todas las tarjetas expandidas
            grid.querySelectorAll('.card.expanded').forEach(c => {
                c.classList.remove('expanded');
            });

            // Si la tarjeta clickeada no estaba expandida, la expandimos
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    }

    // 4. Inicializar laboratorio de esmaltados
    if (document.getElementById('oxideGrid')) {
        renderOxides();
        navigate('home');
    }

    // 5. Modal de imágenes dinámico para guías (hacer zoom al hacer click)
    let imageModal = document.getElementById('image-modal');
    if (!imageModal) {
        imageModal = document.createElement('div');
        imageModal.className = 'image-modal';
        imageModal.id = 'image-modal';
        imageModal.innerHTML = `
            <div class="image-modal-content">
                <span class="image-modal-close" id="image-modal-close">&times;</span>
                <img id="image-modal-img" src="" alt="Imagen ampliada">
            </div>
        `;
        document.body.appendChild(imageModal);
    }

    const imageModalImg = document.getElementById('image-modal-img');
    const imageModalClose = document.getElementById('image-modal-close');
    
    if (imageModal && imageModalImg && imageModalClose) {
        // Selecciona las imágenes de la portada, el carrusel y otras secciones de la guía
        const zoomableImages = document.querySelectorAll('.portada img, .horno-slide img, .phase-card img, #section-home img');
        
        zoomableImages.forEach(img => {
            img.style.cursor = 'zoom-in'; // Cambia el cursor para indicar que es ampliable
            img.addEventListener('click', () => {
                imageModalImg.src = img.src;
                imageModalImg.alt = img.alt || 'Imagen ampliada';
                imageModal.classList.add('open');
            });
        });

        imageModalClose.addEventListener('click', () => imageModal.classList.remove('open'));
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) imageModal.classList.remove('open');
        });
    }
});

// ==========================================================================
// 2. LABORATORIO DE ESMALTADOS
// ==========================================================================
const navSections = ['home', 'engobes', 'oxidos', 'manual', 'horneado', 'tecnicas'];
        
function navigate(sectionId) {
    navSections.forEach(id => {
        const section = document.getElementById('section-' + id);
        const btn = document.getElementById('btn-' + id);
        if (section) section.classList.add('hidden');
        if (btn) btn.classList.remove('active');
    });
    
    const targetSection = document.getElementById('section-' + sectionId);
    const targetBtn = document.getElementById('btn-' + sectionId);
    
    if (targetSection) targetSection.classList.remove('hidden');
    if (targetBtn) targetBtn.classList.add('active');
    
    if(sectionId === 'horneado' && !window.myChart) {
        initChart();
    }
}

const oxidesData = [
    { id: 'Co', name: 'Cobalto', colorClass: 'bg-blue-800 text-white', colorName: 'Azul intenso', note: 'Muy potente. En exceso produce negros metálicos y satura fácilmente mezclas.' },
    { id: 'Cu', name: 'Cobre', colorClass: 'bg-teal-500 text-white', colorName: 'Verde / Turquesa', note: 'En reducción extrema (técnica Rakú) se torna rojo cobrizo brillante o metálico.' },
    { id: 'Fe', name: 'Hierro', colorClass: 'bg-red-800 text-white', colorName: 'Rojo / Marrón / Amarillento', note: 'Depende de la concentración y el esmalte base (plúmbico intensifica cálidos, alcalino vira). ' },
    { id: 'Mn', name: 'Manganeso', colorClass: 'bg-purple-900 text-white', colorName: 'Marrón / Violeta / Negro', note: 'A altas concentraciones en la fórmula proporciona efectos metálicos bellísimos.' },
    { id: 'Cr', name: 'Cromo', colorClass: 'bg-green-700 text-white', colorName: 'Verde fuerte', note: 'Muy refractario. Puede dar tonos rosas si hay presencia de estaño y ausencia total de zinc.' },
    { id: 'Ni', name: 'Níquel', colorClass: 'bg-stone-500 text-white', colorName: 'Grises / Verdes tristes', note: 'Generalmente se usa para matizar, apagar o romper la brillantez chillona de otros colores.' }
];

function renderOxides() {
    const grid = document.getElementById('oxideGrid');
    if (!grid) return;
    
    oxidesData.forEach(ox => {
        const btn = document.createElement('button');
        btn.className = `p-4 rounded-lg shadow-sm border-2 border-transparent hover:border-stone-800 transition transform hover:-translate-y-1 ${ox.colorClass} flex flex-col items-center justify-center h-32`;
        btn.onclick = () => showOxideDetail(ox);
        btn.innerHTML = `<span class="text-3xl font-black mb-1">${ox.id}</span><span class="text-sm font-semibold tracking-wider uppercase">${ox.name}</span>`;
        grid.appendChild(btn);
    });
}

function showOxideDetail(ox) {
    const detailView = document.getElementById('oxideDetail');
    if (!detailView) return;
    detailView.innerHTML = `
        <div class="w-full flex items-center mb-6">
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner ${ox.colorClass}">${ox.id}</div>
            <div class="ml-6 text-left">
                <h3 class="text-3xl font-extrabold text-stone-900">${ox.name}</h3>
                <p class="text-lg font-semibold mt-1" style="color: ${ox.colorClass.split(' ')[0].replace('bg-', '')}">${ox.colorName}</p>
            </div>
        </div>
        <div class="w-full bg-stone-50 p-6 rounded-lg border border-stone-200 text-left">
            <h4 class="text-sm font-bold text-stone-400 uppercase tracking-widest mb-2">Comportamiento Químico</h4>
            <p class="text-lg text-stone-700 leading-relaxed">${ox.note}</p>
        </div>
    `;
}

const chartConfig = {
    mono: {
        label: 'Monococción (Horas)',
        labels: ['0h', '2h', '4h', '6h', '8h', '10h', '12h (Meseta)'],
        data: [20, 150, 300, 600, 800, 1040, 1040],
        color: '#991b1b',
        bg: 'rgba(153, 27, 27, 0.1)',
        desc: '<h4 class="font-bold text-xl mb-2 text-red-900">Monococción: Curva Conservadora</h4><p>Curva extremadamente lenta, especialmente en la <strong>fase crítica (0°C - 600°C)</strong>. Esto es vital para permitir la salida de gases y agua química de la pieza cruda sin fracturarla. Requiere piezas de paredes de 5-8 mm. Finaliza con una meseta de vitrificación para nivelar el esmalte.</p>'
    },
    raku: {
        label: 'Rakú (Minutos)',
        labels: ['0m', '15m', '30m', '45m', '60m (900°C)', '65m (Agua)', '70m'],
        data: [20, 250, 500, 750, 900, 20, 20],
        color: '#d97706',
        bg: 'rgba(217, 119, 6, 0.1)',
        desc: '<h4 class="font-bold text-xl mb-2 text-amber-700">Rakú: Choque Térmico</h4><p>Ascenso violento y rápido. A los 900°C la pieza se extrae incandescente. La caída en picada de la gráfica representa el enfriamiento drástico al aire, reducción en aserrín y posterior inmersión en agua, fijando los metales y el craquelado.</p>'
    }
};

function initChart() {
    const canvas = document.getElementById('firingChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartConfig.mono.labels,
            datasets: [{
                label: chartConfig.mono.label,
                data: chartConfig.mono.data,
                borderColor: chartConfig.mono.color,
                backgroundColor: chartConfig.mono.bg,
                borderWidth: 4,
                pointBackgroundColor: '#fff',
                pointBorderColor: chartConfig.mono.color,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { font: { size: 14, family: "'Segoe UI', sans-serif" } } },
                tooltip: {
                    callbacks: {
                        label: function(context) { return context.parsed.y + ' °C'; }
                    },
                    titleFont: { size: 14 },
                    bodyFont: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1200,
                    title: { display: true, text: 'Temperatura (°C)', font: { weight: 'bold' } },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    title: { display: true, text: 'Tiempo', font: { weight: 'bold' } },
                    grid: { display: false }
                }
            }
        }
    });
    updateChartDOM('mono');
}

function updateChart(type) {
    if (!window.myChart) return;
    const cfg = chartConfig[type];
    window.myChart.data.labels = cfg.labels;
    window.myChart.data.datasets[0].label = cfg.label;
    window.myChart.data.datasets[0].data = cfg.data;
    window.myChart.data.datasets[0].borderColor = cfg.color;
    window.myChart.data.datasets[0].backgroundColor = cfg.bg;
    window.myChart.data.datasets[0].pointBorderColor = cfg.color;
    window.myChart.update();
    updateChartDOM(type);
}

function updateChartDOM(type) {
    const explanation = document.getElementById('curveExplanation');
    if (explanation) explanation.innerHTML = chartConfig[type].desc;
    
    const btnMono = document.getElementById('btn-mono');
    const btnRaku = document.getElementById('btn-raku');
    
    if(btnMono && btnRaku) {
        if(type === 'mono') {
            btnMono.classList.add('active');
            btnRaku.classList.remove('active');
        } else {
            btnRaku.classList.add('active');
            btnMono.classList.remove('active');
        }
    }
}

// ==========================================================================
// 3. GUÍA DE INSUMOS
// ==========================================================================
const imageMap = {
    "A.P.M. 112 (Arcilla Plástica Misionera)": "imagenes/imagenes_insumos_ceramica/arcilla_apm_112.webp",
    "acido bórico": "imagenes/imagenes_insumos_ceramica/acido_borico_1.webp",
    "ARCILLA TINCAR ZETA MOLIDA": "imagenes/imagenes_insumos_ceramica/arcilla_tincar_zeta_molida.webp",
    "borax anhidro": "imagenes/imagenes_insumos_ceramica/borax_1.webp",
    "CAOLÍN VERÓNICA": "imagenes/imagenes_insumos_ceramica/caolin_veronica.webp",
    "CARBONATO DE CALCIO": "imagenes/imagenes_insumos_ceramica/carbonato_calcio.webp",
    "CARBURO DE SILICIO (Malla 220)": "imagenes/imagenes_insumos_ceramica/carburo_de_silicio.webp",
    "CEMENTO": "imagenes/imagenes_insumos_ceramica/cemento.webp",
    "CHAMOTE MOLIDO (Varias Mallas)": "imagenes/imagenes_insumos_ceramica/chamote_molido.webp",
    "CMC": "imagenes/imagenes_insumos_ceramica/cmc_1.webp",
    "CUARZO M200": "imagenes/imagenes_insumos_ceramica/cuarzo_m_200.webp",
    "Feldepato Sódico (Albita)": "imagenes/imagenes_insumos_ceramica/feldepato_albita_bruto.webp",
    "FELDESPATO Potásico (piedra grande) M200": "imagenes/imagenes_insumos_ceramica/feldepato_potasico_grande.webp",
    "goma arabiga": "imagenes/imagenes_insumos_ceramica/goma_arabiga.webp",
    "harina de rutilo": "imagenes/imagenes_insumos_ceramica/harina_de_rutilo.webp",
    "ladrillo k 26": "imagenes/imagenes_insumos_ceramica/ladrillo_k_26.webp",
    "manta termica": "imagenes/imagenes_insumos_ceramica/manta_termica.webp",
    "PASTA LISA": "imagenes/imagenes_insumos_ceramica/pasta_lisa.webp",
    "PASTA RAKU / PASTA CHAMOTE": "imagenes/imagenes_insumos_ceramica/pasta_raku_1.webp",
    "PUMA MOLIDA": "imagenes/imagenes_insumos_ceramica/puma_molida.webp",
    "ROJA EN POLVO": "imagenes/imagenes_insumos_ceramica/pasta_roja_lisa.webp",
    "SILICATO DE SODIO": "imagenes/imagenes_insumos_ceramica/silicato_sodio.webp",
    "Talco chino": "imagenes/imagenes_insumos_ceramica/talco_chino.webp",
    "TALCO INDUSTRIAL": "imagenes/imagenes_insumos_ceramica/talco_industrial.webp",
    "TINCAR SUPER MOLIDA": "imagenes/imagenes_insumos_ceramica/tincar_super_molida.webp",
    "VERMICULITA EXPANDIDA": "imagenes/imagenes_insumos_ceramica/vermiculita_expandida.webp"
};

const fallbackImage = "./imagenes_insumos_ceramica/arcilla_tincar_zeta_molida.webp";

const materiales = [
    { id: 1, categoria: "Arcillas Plásticas", nombre: "A.P.M. 112 (Arcilla Plástica Misionera)", descripcion: "Altamente plástica y pegajosa. Posee un altísimo porcentaje de contracción, generando tensiones fuertes durante la pérdida de humedad.<br><br><b>🧱 Arcilla APM 112 Rosada Molida - Piedra Grande</b><br>Plasticidad, versatilidad y base para gres<br><br><b>¿Qué es?</b><br>Arcilla natural de origen argentino, extraída en Zapala (Neuquén), ampliamente utilizada en la formulación de pastas cerámicas.<br>🎨 Desarrolla tonos cálidos, rosados a marrones según temperatura y atmósfera<br>👉 Ideal como base para pastas de gres<br><br><b>🎨 ¿Para qué sirve?</b><br>Ideal para: 👉 Formulación de pastas de gres 👉 Modelado manual 👉 Torneado 👉 Producción cerámica en general<br><br><b>🎨 ¿Qué la hace especial?</b><br>👉 Alta plasticidad ✔️ Excelente para modelado y torneado ✔️ Muy buena trabajabilidad<br>👉 Composición equilibrada ✔️ Contenido moderado de hierro ✔️ Buena respuesta en cocción<br><br><b>💡 Características</b><br>🟤 Arcilla rosada 🧪 Alto contenido de sílice y alúmina ⚙️ Plasticidad aprox. 31% 🔥 Buen comportamiento en cocción", uso: "Añadir en pequeños porcentajes (5% a 15%) para 'levantar' o plastificar pastas que son excesivamente magras/cortas.<br><br><b>🧪 Recomendaciones de uso</b><br>👉 Puede usarse pura o combinada con otras arcillas<br>👉 Ideal mezclar con arcillas blancas si se busca aclarar tono<br><br><b>⚠️ Importante</b><br>👉 Al ser un material natural, puede presentar variaciones<br>👉 Puede generar “alma negra” si no se controla la cocción en ciertas formulaciones<br>👉 Ajustar según el equilibrio de la fórmula." },
    { id: 2, categoria: "Fundentes", nombre: "acido bórico", descripcion: "<b>¿Qué es?</b><br>Compuesto químico soluble en agua, utilizado como fundente en formulaciones cerámicas.<br>👉 Reduce la temperatura de fusión y mejora el comportamiento del esmalte durante la cocción.<br>👉 Ayuda a controlar el coeficiente de expansión, evitando grietas, tensiones y deformaciones.<br><br><b>💡 Características</b><br>🧪 Compuesto a base de óxido bórico<br>🤍 Color blanco<br>💧 Soluble en agua<br>🔥 Activo en formulaciones<br>📏 Malla aprox. 170", uso: "<b>🎨 ¿Para qué sirve?</b><br>Ideal para: 👉 Formulación de esmaltes 👉 Producción de fritas 👉 Ajuste de composiciones cerámicas.<br><br><b>🧪 Recomendaciones de uso</b><br>👉 Incorporar en proporciones controladas<br>👉 Ajustar según el resultado buscado<br>✔️ Más cantidad → mayor fusión<br>✔️ Menor cantidad → efecto más sutil<br><br><b>⚠️ Importante</b><br>👉 Producto técnico para formulación<br>👉 Pequeñas variaciones generan cambios significativos" },
    { id: 3, categoria: "Arcillas Plásticas", nombre: "ARCILLA TINCAR ZETA MOLIDA", descripcion: "<b>🧱 Arcilla Tincar Zeta Molida - Piedra Grande</b><br>Plasticidad, versatilidad y rendimiento en pastas<br><br><b>¿Qué es?</b><br>Arcilla plástica semi refractaria utilizada en cerámica para la formulación de pastas en distintos rangos de temperatura.<br>🎨 Desarrolla tonos claros a crema<br>👉 Apta para baja, media y alta temperatura (gres)<br><br><b>🎨 ¿Para qué sirve?</b><br>Ideal para: 👉 Formulación de pastas cerámicas 👉 Torneado 👉 Modelado 👉 Producción cerámica<br><br><b>🎨 ¿Qué la hace especial?</b><br>👉 Plasticidad equilibrada ✔️ Muy buena trabajabilidad ✔️ Mais control que arcillas extremadamente plásticas<br>👉 Bajo contenido de hierro ✔️ Colores más claros en cocción<br>👉 Composición estable ✔️ Buena respuesta en mezclas<br><br><b>💡 Características</b><br>🟤 Polvo claro 🧪 Plasticidad aprox. 36,8% 🔥 Semi refractaria ⚙️ Buena estabilidad en formulación", uso: "<b>🧪 Recomendaciones de uso</b><br>👉 Ideal para usar sola o en mezclas<br>👉 Aporta estabilidad a la pasta<br>✔️ Buen equilibrio entre plasticidad y contracción<br>✔️ Mejora el comportamiento general<br><br><b>🧱 Diferencias entre Tincar Super y Zeta</b><br>⚖️ <b>Resumen:</b> Super = más plástica, más fácil, más “blanda” | Z = más estable, más firme, más técnica" },
    { id: 4, categoria: "Formadores de Vidrio", nombre: "borax anhidro", descripcion: "Producto obtenido por deshidratación del bórax mediante fusión.<br>👉 Material duro y vítreo que no se rehidrata en condiciones normales de almacenamiento.<br>👉 Actúa como fundente y formador de vidrio, mejorando el comportamiento en esmaltes y fritas.<br>🧪 Alto poder fundente<br>🔥 Formador de vidrio<br>⚙️ Libera boro de forma controlada en solución<br>📏 Polvo malla aprox. 140<br>👉 Mejora la eficiencia de fusión y el control del B₂O₃", uso: "Formulación de esmaltes<br>👉 Producción de fritas cerámicas<br>👉 Desarrollo de composiciones vítreas<br>👉 Incorporar en proporciones controladas<br>👉 Ajustar según formulación<br>✔️ Mejora la fusión<br>✔️ Optimiza el comportamiento del esmalte" },
    { id: 5, categoria: "Refractarios (Caolines)", nombre: "CAOLÍN VERÓNICA", descripcion: "Arcilla primaria. Estructura pura de alúmina y sílice, blancura extrema y resistencia a altísimas temperaturas sin fundir. Muy baja plasticidad ('corta').<br>El Caolín Verónica es un silicato de alúmina hidratado puro de alta calidad. A diferencia de las arcillas comunes, no ha sido transportado por la naturaleza, por lo que conserva una estructura cristalina pura pero muy poco plástica (es 'corto' o quebradizo al tacto húmedo).<br><b>Color de quema:</b> Desarrolla tonos claros y estables, con una leve tendencia cálida o amarillenta.<br><b>Alta refractariedad:</b> Contiene un alto porcentaje de alúmina, lo que eleva drásticamente el punto de maduración térmica de la mezcla.", uso: "Base indispensable para formular porcelanas, pastas de gres prístinas y engobes super blancos.<br><br><b>Función en el taller:</b> Actúa como el armazón de la pasta en altas temperaturas. Evita que las piezas se deformen. En los esmaltes, aporta la alúmina necesaria para regular la viscosidad e impedir que el vidrio chorree." },
    { id: 6, categoria: "Fundentes", nombre: "CARBONATO DE CALCIO", descripcion: "A alta temperatura es un fundente activo; a baja temperatura actúa como refractario. Libera dióxido de carbono (CO2) entre 800°C-900°C.", uso: "Opacar o matear esmaltes de baja temperatura. Fundente en esmaltes de gres. <br><b>[Revisor]:</b> Cuidado con cocciones rápidas, genera cráteres.<br><br><b>🧪 Recomendaciones de uso</b><br>👉 Usar en proporciones controladas<br>✔️ Mejora formulación y permite ajustar acabado." },
    { id: 7, categoria: "Complementos y Aditivos", nombre: "CARBURO DE SILICIO (Malla 220)", descripcion: "Material extremadamente abrasivo y refractario. En ciertos esmaltes, actúa como agente reductor local liberando gases.<br><br><b>🧪 Carburo de Silicio #220</b><br>Resistencia extrema y efectos reactivos<br><b>¿Qué es?</b> Material (SiC) de alta resistencia. Se emplea en refractarios (placas, soportes) y en esmaltes como agente reactivo, generando burbujas y efectos visuales.", uso: "Formulación de esmaltes 'cráter' o volcánicos (reacciona generando burbujas). También usado como placa refractaria o abrasivo.<br><br><b>🧪 Recomendaciones de uso</b><br>👉 Usar en pequeñas proporciones en esmaltes.<br>✔️ Más cantidad → más burbujeo.<br>✔️ Menor cantidad → efecto más sutil.<br><b>⚠️ Importante:</b> Puede generar defectos si no se controla." },
    { id: 8, categoria: "Aislantes e Infraestructura", nombre: "CEMENTO", descripcion: "Aglomerante hidráulico. <b>[Revisor Crítico]:</b> Se degrada calcificándose y perdiendo integridad estructural al superar temperaturas moderadas.", uso: "Construcción de bases escultóricas en frío, contrapesos o moldes rígidos. <b>NO</b> apto para partes interiores del horno expuestas a la llama." },
    { id: 9, categoria: "Modificadores Estructurales", nombre: "CHAMOTE MOLIDO (Varias Mallas)", descripcion: "Arcilla que ya ha sido horneada y triturada. Abre la estructura de la pasta viva permitiendo el escape uniforme de la humedad. No se contrae.<br><br><b>🧱 ¿Qué hace el chamote?</b><br>👉 Es un desengrasante.<br>👉 Reduce la contracción (menos grietas).<br>👉 Mejora el secado y la resistencia en crudo.<br>👉 Aumenta la estabilidad (menos deformaciones).<br>👉 Genera textura.", uso: "Aportar 'diente' y soporte estructural a obras escultóricas grandes. Fundamental para resistir el choque térmico (Raku, fuego directo)." },
    { id: 10, categoria: "Otros", nombre: "CMC", descripcion: "Adhesión, viscosidad y control en esmaltes.<br><b>¿Qué es?</b> Aditivo orgánico (Carboximetilcelulosa) usado en esmaltes y engobes como aglutinante, espesante y regulador del agua.<br>👉 Mejora la adherencia del esmalte en crudo.<br>👉 Aumenta la viscosidad para una aplicación uniforme.<br>👉 Retiene agua, retrasando el secado (ideal para pincel).", uso: "<b>🎨 ¿Para qué sirve?</b><br>👉 Aglutinante en esmaltes y engobes.<br>👉 Espesante (control de viscosidad).<br>👉 Regulador de agua y dispersante.<br><br><b>💡 Qué mejora</b><br>👉 Mejor adherencia del esmalte.<br>👉 Aplicación más uniforme y menor decantación." },
    { id: 11, categoria: "Formadores de Vidrio", nombre: "CUARZO M200", descripcion: "Sílice pura (SiO2) triturada. Experimenta un cambio súbito de volumen a los 573°C (Inversión del Cuarzo) que puede causar 'dunting' si se enfría rápido.<br>El cuarzo M200 es sílice pura molida a una granulometría extremadamente fina (inferior a 74 micrones), con aspecto de talco blanco.", uso: "Base absoluta del vidrio en esmaltes. En pastas, ajusta la expansión térmica para evitar que los esmaltes se craquelen. Su finura permite mayor rapidez y homogeneidad química en el horno." },
    { id: 12, categoria: "Otros", nombre: "Feldepato Sódico (Albita)", descripcion: "<b>🧱 Feldespato Sódico (Albita) #200</b><br>Fusión activa y mayor poder fundente.<br><b>¿Qué es?</b> Materia prima cerámica (aluminosilicato sódico), utilizada como fundente en esmaltes y vidrios.<br>🎨 En cocción genera fusión más rápida y activa.<br>👉 Muy utilizado en esmaltes brillantes.", uso: "<b>🎨 ¿Para qué sirve?</b><br>👉 Reducir temperatura de fusión y aumentar brillo del esmalte.<br><b>⚠️ Importante:</b> Es más fluido que el potásico, por lo que puede escurrir." },
    { id: 13, categoria: "Fundentes", nombre: "FELDESPATO Potásico (piedra grande) M200", descripcion: "Aporta metales alcalinos (sodio o potasio) para interactuar con la sílice, y alúmina que otorga viscosidad para evitar el escurrimiento.<br><br><b>🧱 Feldespato Potásico #200</b><br>Fusión progresiva y amplio rango de vitrificación.<br><b>¿Qué es?</b> Fundente principal en esmaltes y pastas.<br>🎨 En cocción genera una fusión más controlada y estable.", uso: "Fundente clásico y principal para pastas y esmaltes de alta temperatura (gres y porcelana).<br>👉 Lograr esmaltes más controlados y con mayor rango de vitrificación.<br><b>⚠️ Importante:</b> Menos activo que el sódico, requiere mayor temperatura." },
    { id: 14, categoria: "Adherencia", nombre: "goma arabiga", descripcion: "<b>¿Qué es?</b> Aditivo natural utilizado en esmaltes y engobes para mejorar la adherencia sobre la pieza cerámica.<br>👉 Favorece la fijación del material en crudo.<br>👉 Actúa de forma similar al CMC, mejorando la aplicación y el control de la mezcla.", uso: "<b>🎨 ¿Para qué sirve?</b><br>👉 Aglutinante en esmaltes y engobes.<br>👉 Aplicación de pigmentos y decoraciones.<br>👉 Trabajo sobre vidrio.<br><br><b>🧪 Recomendaciones de uso</b><br>👉 Usar en proporciones controladas (aprox. 65% agua / 35% goma).<br><b>⚠️ Importante:</b> En exceso puede aumentar demasiado la viscosidad." },
    { id: 15, categoria: "Adherencia", nombre: "harina de rutilo", descripcion: "<b>🧪 Harina de Rutilo #200</b><br>Modificación de color, profundidad y efecto natural.<br><b>¿Qué es?</b> Óxido de titanio (rutilo) en molienda fina. A diferencia de la arena de rutilo, no genera puntos visibles, sino que actúa de forma integrada sobre el esmalte, modificando su tono y comportamiento.", uso: "<b>🎨 ¿Para qué sirve?</b><br>👉 Modificar el color del esmalte (tonos cálidos).<br>👉 Aportar leve opacidad.<br>👉 Favorecer efectos visuales complejos.<br><br><b>🧪 Preparación y uso</b><br>👉 Usar en proporciones bajas (1% a 5%).<br><b>⚠️ Importante:</b> No es un jaspeador como la arena de rutilo. Su efecto es uniforme." },
    { id: 16, categoria: "Hornos", nombre: "ladrillo k 26", descripcion: "Ladrillo refractario aislante.", uso: "Paredes de hornos, aislación." },
    { id: 17, categoria: "Hornos", nombre: "manta termica", descripcion: "Fibra cerámica para aislación de alta temperatura.", uso: "Aislación de paredes y tapas de hornos. Resiste fuego directo." },
    { id: 18, categoria: "Pastas Comerciales Preparadas", nombre: "PASTA LISA", descripcion: "Fórmula comercial refinada carente de partículas abrasivas (chamote). Mayor índice de contracción.", uso: "Trabajos de precisión en torno alfarero o modelado de pequeño formato con alto detalle." },
    { id: 19, categoria: "Pastas Comerciales Preparadas", nombre: "PASTA RAKU / PASTA CHAMOTE", descripcion: "Fórmulas preparadas en fábrica ricas en material refractario y chamote para soportar grandes tensiones físicas.", uso: "Escultura, modelado a mano alzada y técnicas de cocción primitiva o reducción agresiva (Raku)." },
    { id: 20, categoria: "Fundentes especiales", nombre: "PUMA MOLIDA", descripcion: "Piedra pómez triturada. Esencialmente un vidrio volcánico natural compuesto de silicato de alúmina con metales alcalinos. En el mercado local, la <b>Arcilla Puma</b> es una <i>ball clay</i> patagónica de altísima plasticidad. Quema en color blanco a blanco cremoso.", uso: "Fundente complejo para lograr esmaltes texturados. En escultura, se incorpora a la pasta para aligerar el peso. Como <i>ball clay</i>, se usa para dar liga y resistencia mecánica en crudo a la pasta." },
    { id: 21, categoria: "Arcillas Plásticas", nombre: "ROJA EN POLVO", descripcion: "Arcilla rica en óxido de hierro (Fe2O3), el cual actúa como un fundente enérgico haciendo que madure a menor temperatura.<br><br><b>🧱 Pasta Roja Lisa</b><br>Pasta cerámica roja lista para usar, ideal para modelado manual y torno, con un tono cálido que aporta identidad a cada pieza.", uso: "Formulación de engobes decorativos intensos, terracotas o pastas de baja temperatura con aspecto rústico.<br><br><b>🔥 Cocción:</b> 1020°C a 1060°C.<br><b>🚀 ¿Por qué elegirla?</b><br>🟤 Color cálido y natural<br>🎨 Ideal para estética artesanal<br>🌀 Versátil: modelado + torno" },
    { id: 22, categoria: "Complementos y Aditivos", nombre: "SILICATO DE SODIO", descripcion: "Químico altamente alcalino. Modifica radicalmente las cargas eléctricas de las partículas de arcilla dispersándolas en agua con muy poco líquido.<br><br><b>🧪 ¿Qué hace como defloculante?</b><br>Reduce la cantidad de agua necesaria en barbotinas, mejorando la fluidez sin perder cuerpo.", uso: "Defloculante primario para barbotina de colada. Aplicado superficialmente y secado con soplete, genera texturas de 'piel de elefante'.<br><br><b>⚙️ ¿Cómo se usa?</b><br>✔️ Dosificación recomendada: 0,3% sobre el peso seco.<br><b>⚠️ Importante:</b> Un exceso puede desestabilizar la barbotina." },
    { id: 23, categoria: "Fundentes especiales", nombre: "Talco chino", descripcion: "Silicato de magnesio. Fundente secundario y modificador de pastas y esmaltes.", uso: "<b>🎨 ¿Para qué sirve?</b><br>👉 Formulación de pastas cerámicas.<br>👉 Fundente secundario en esmaltes.<br>👉 Ajuste de propiedades térmicas (resistencia al choque térmico)." },
    { id: 24, categoria: "Fundentes especiales", nombre: "TALCO INDUSTRIAL", descripcion: "Silicato de magnesio. Su cualidad principal es la reducción drástica de la expansión térmica de las piezas horneadas.", uso: "Ingrediente estrella en pastas cerámicas para resistir choque térmico violento (flameware) y para prevenir el craquelado de esmaltes." },
    { id: 25, categoria: "Arcillas Plásticas", nombre: "TINCAR SUPER MOLIDA", descripcion: "Arcilla secundaria, color claro, muy plástica. La versión 'Super' ha pasado por levigación/molienda fina, retirando impurezas orgánicas y hierro.<br><br><b>🧱 Arcilla Tincar Super Molida - Piedra Grande</b><br>Arcilla plástica semi refractaria muy versátil.<br>🎨 Desarrolla tonos claros a crema.<br>🧪 Alta plasticidad (≈39,5%).", uso: "Esqueleto principal para formulación de loza y gres. Engobes finos o pastas de torno que requieran textura sedosa.<br><br><b>🧱 Uso real en taller</b><br>👉 <b>Tincar Super:</b> para trabajar cómodo (torno, modelado, pastas blandas).<br>👉 <b>Tincar Z:</b> para controlar la pasta (producción, piezas grandes, mezclas técnicas)." },
    { id: 26, categoria: "Aislantes e Infraestructura", nombre: "VERMICULITA EXPANDIDA", descripcion: "Mineral micáceo super-calentado que se expande en forma de acordeón. Extremadamente ligero y altamente refractario/aislante.", uso: "Aislante térmico en el relleno de paredes de hornos cerámicos.<br><b>[Sin verificar su resistencia límite para atmósferas continuas de alta temperatura cerámicas].</b>" }
];

function getIconForCategory(cat) {
    if (!cat) return '📦';
    cat = cat.toLowerCase();
    if(cat.includes('arcilla') || cat.includes('pasta')) return '🏺';
    if(cat.includes('esmalte') || cat.includes('engobe')) return '🎨';
    if(cat.includes('pigmento') || cat.includes('óxido') || cat.includes('oxido')) return '🖌️';
    if(cat.includes('herramienta') || cat.includes('equipo')) return '🛠️';
    if(cat.includes('refractario') || cat.includes('horno')) return '🧱';
    if(cat.includes('fundente')) return '🔥';
    return '📦';
}

function renderizarMateriales() {
    const grid = document.getElementById('materialsGrid');
    grid.innerHTML = '';
    
    materiales.forEach((mat) => {
        const icon = getIconForCategory(mat.categoria);
        const imgSrc = imageMap[mat.nombre] || fallbackImage;

        const cardHTML = `
            <div class="card" data-nombre="${mat.nombre.toLowerCase()}" data-categoria="${mat.categoria.toLowerCase()}">
                <div class="card-img-wrapper">
                    <img src="${imgSrc}" alt="Imagen de ${mat.nombre}" class="card-img" loading="lazy" onerror="this.src='${fallbackImage}'">
                </div>
                <div class="card-content">
                    <div class="category-wrapper">
                        <span class="category-icon" title="Categoría: ${mat.categoria}">${icon}</span>
                        <span class="category">${mat.categoria.replace(/^\d+\.\s*/, '')}</span>
                    </div>
                    <h2 class="card-title">${mat.nombre}</h2>
                    
                    <div class="section-label">📋 Descripción & Propiedades</div>
                    <p class="description">${mat.descripcion}</p>
                    
                    <div class="uso-box">
                        <div class="section-label">🎯 Uso Recomendado</div>
                        <p>${mat.uso}</p>
                    </div>

                            <div class="back-to-index">
                                <a href="#page-top">▲ Volver al índice</a>
                            </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function filterByCategory(keyword) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = keyword;
    filterCards();
}

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const normalizedInput = normalizeText(input);
    const cards = document.querySelectorAll('.card');
    let hasVisibleCards = false;

    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre');
        const categoria = card.getAttribute('data-categoria');
        const desc = card.querySelector('.description').innerHTML.toLowerCase();
        const uso = card.querySelector('.uso-box p').innerHTML.toLowerCase();
        const cardText = `${nombre} ${categoria} ${desc} ${uso}`;
        const normalizedCardText = normalizeText(cardText);

        if (normalizedCardText.includes(normalizedInput)) {
            card.style.display = 'flex';
            hasVisibleCards = true;
        } else {
            card.style.display = 'none';
        }
    });
    document.getElementById('noResults').style.display = hasVisibleCards ? 'none' : 'block';
}

function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    if(content && icon) {
        if(content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.style.transform = 'rotate(45deg)';
        } else {
            content.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        }
    }
}