document.addEventListener('DOMContentLoaded', () => {
    const artworksGrid = document.getElementById("artworksGrid");
    const galleryItems = document.querySelectorAll('.gallery-item');
    const toggleBtn = document.getElementById("toggleArtworksBtn");
    const filterButtons = document.querySelectorAll('.filter-btn');

    function updateGalleryView() {
        const isLimited = artworksGrid.classList.contains('limited');
        const activeBtn = document.querySelector('.filter-btn.active');
        const filterValue = activeBtn ? activeBtn.getAttribute('data-filter').trim().toLowerCase() : 'all';

        galleryItems.forEach((item, index) => {
            const itemCategory = (item.getAttribute('data-category') || '').trim().toLowerCase();
            const matchesFilter = (filterValue === 'all' || itemCategory === filterValue);

            if (matchesFilter) {
                // Se la griglia è limitata e siamo sul filtro "all", mostra solo le prime 4
                if (isLimited && filterValue === 'all' && index >= 4) {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                } else {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                }
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }

    // 1. Esegui subito al caricamento
    updateGalleryView();

    // 2. Gestione dei filtri
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateGalleryView();
        });
    });

    // 3. Gestione pulsante "Mostra tutte / Comprimi"
    if (toggleBtn && artworksGrid) {
        toggleBtn.addEventListener("click", () => {
            artworksGrid.classList.toggle("limited");
            
            if (artworksGrid.classList.contains("limited")) {
                toggleBtn.textContent = "Mostra tutte le opere";
            } else {
                toggleBtn.textContent = "Comprimi";
            }
            updateGalleryView();
        });
    }
});

// ==========================================
// FUNZIONALITÀ LIGHTBOX 
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta = document.getElementById('lightbox-meta');
const lightboxDesc = document.getElementById('lightbox-description');

function openLightbox(element) {
    const imgSource = element.querySelector('img').src;
    const title = element.querySelector('.item-overlay h3').innerText;
    const meta = element.querySelector('.item-overlay p').innerText;
    const description = element.querySelector('.hidden-details').innerHTML;

    lightboxImg.src = imgSource;
    lightboxTitle.innerText = title;
    lightboxMeta.innerText = meta;
    lightboxDesc.innerHTML = description;

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});