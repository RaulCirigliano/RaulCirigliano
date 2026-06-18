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

    // 3. Inicializar laboratorio de esmaltados
    if (document.getElementById('oxideGrid')) {
        renderOxides();
        navigate('home');
    }

    // 4. Modal de imágenes dinámico para guías (hacer zoom al hacer click)
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