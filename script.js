document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. GESTIONE DEL FILTRO DELLA GALLERIA
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Rimuovi classe attiva da tutti i bottoni
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Aggiungi classe attiva al bottone corrente
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = ''; 
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });


    // ==========================================
    // 2. GESTIONE PULSANTE "Vedi tutte / Comprimi"
    // ==========================================
    const toggleBtn = document.getElementById("toggleArtworksBtn");
    const artworksGrid = document.getElementById("artworksGrid");

    if (toggleBtn && artworksGrid) {
        toggleBtn.addEventListener("click", () => {
            artworksGrid.classList.toggle("limited");
            
            if (artworksGrid.classList.contains("limited")) {
                toggleBtn.textContent = "Vedi tutte";
            } else {
                toggleBtn.textContent = "Comprimi";
            }
        });
    }
});


// ==========================================
// 3. FUNZIONALITÀ LIGHTBOX 
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
    document.body.style.overflow = 'hidden'; // Blocca lo scroll di sotto
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Ripristina lo scroll
}

// Chiudi la modale con il tasto ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});