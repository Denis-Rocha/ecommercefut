document.addEventListener('DOMContentLoaded', () => {
    // Dados de todos os produtos do site
    const PRODUCTS = [
        { id: '1', name: 'Camiseta Corinthians 25/26', price: 229.90, oldPrice: 279.90, category: 'brasileirao', featured: true, image: 'images/corinthianshome.png' },
        { id: '2', name: 'Camiseta Real Madrid 25/26 Home', price: 229.90, oldPrice: 279.90, category: 'la-liga', featured: true, image: 'images/realhome.png' },
        { id: '3', name: 'Camiseta Corinthians 25/26 Away', price: 229.90, oldPrice: 279.90, category: 'brasileirao', featured: true, image: 'images/corinthiansaway.png' },
        { id: '4', name: 'Camiseta Flamengo 25/26 Home', price: 179.90, oldPrice: 329.90, category: 'brasileirao', featured: false, image: 'images/flamengohome.png' },
        { id: '5', name: 'Camiseta Palmeiras 25/26 Home', price: 179.90, oldPrice: 329.90, category: 'brasileirao', featured: false, image: 'images/palmeirashome.png' },
        { id: '6', name: 'Camiseta Palmeiras 25/26 Away', price: 179.90, oldPrice: 329.90, category: 'brasileirao', featured: false, image: 'images/palmeirasaway.png' },
        { id: '7', name: 'Camiseta Cruzeiro 25/26 Home', price: 179.90, oldPrice: 329.90, category: 'brasileirao', featured: false, image: 'images/cruzeirohome.png' },
        // A partir daqui, você pode adicionar mais camisetas com os respectivos caminhos
        { id: '8', name: 'Camiseta Barcelona 25/26 Home', price: 229.90, oldPrice: 279.90, category: 'la-liga', featured: false, image: 'https://via.placeholder.com/300x300.png?text=Barcelona+25/26+Home' },
        { id: '9', name: 'Camiseta Manchester United 25/26', price: 229.90, oldPrice: 279.90, category: 'premier-league', featured: false, image: 'https://via.placeholder.com/300x300.png?text=Man+United+25/26' },
        { id: '10', name: 'Camiseta Juventus 25/26 Away', price: 229.90, oldPrice: 279.90, category: 'serie-a-italia', featured: false, image: 'https://via.placeholder.com/300x300.png?text=Juventus+25/26' },
        { id: '11', name: 'Camiseta Bayern de Munique 25/26', price: 229.90, oldPrice: 279.90, category: 'bundesliga', featured: false, image: 'https://via.placeholder.com/300x300.png?text=Bayern+25/26' },
        { id: '12', name: 'Camiseta PSG 25/26 Home', price: 229.90, oldPrice: 279.90, category: 'ligue-1', featured: false, image: 'https://via.placeholder.com/300x300.png?text=PSG+25/26' },
    ];

    // Seletores de elementos
    const pages = document.querySelectorAll('.page-content');
    const pageGrids = {
        'home': document.getElementById('home-page-grid'),
        'brasileirao': document.getElementById('brasileirao-page-grid'),
        'la-liga': document.getElementById('la-liga-page-grid'),
        'premier-league': document.getElementById('premier-league-page-grid'),
        'serie-a-italia': document.getElementById('serie-a-italia-page-grid'),
        'bundesliga': document.getElementById('bundesliga-page-grid'),
        'ligue-1': document.getElementById('ligue-1-page-grid'),
        'search': document.getElementById('search-page-grid')
    };
    const navLinks = document.querySelectorAll('.main-menu ul li a');
    const productDetailPage = document.getElementById('product-detail');
    const mainProductImage = document.getElementById('main-product-image');
    const productThumbnails = document.querySelectorAll('.thumbnail');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Carrinho
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const addToCartButton = document.querySelector('.add-to-cart-button');

    // Pop-up
    const popupOverlay = document.getElementById('popup-overlay');
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    const closePopupButton = document.getElementById('close-popup');

    // Barra de Pesquisa
    const searchInput = document.getElementById('search-input');
    const searchPageTitle = document.getElementById('search-page-title');

    // Botões de tamanho
    const sizeButtons = document.querySelectorAll('.product-options .sizes button');
    let selectedSize = null;
    let currentProduct = null;

    // Carrinho
    let cart = [];

    // Função para renderizar os produtos em uma grid
    function renderProducts(productsToRender, gridId) {
        const grid = pageGrids[gridId];
        grid.innerHTML = '';
        if (productsToRender.length === 0) {
            grid.innerHTML = '<p>Nenhum produto encontrado nesta categoria.</p>';
            return;
        }
        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.dataset.productId = product.id;
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                    <div class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                    <button class="buy-button">Ver produto</button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Adiciona evento de clique a cada novo cartão de produto
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = card.dataset.productId;
                const product = PRODUCTS.find(p => p.id === productId);
                if (product) {
                    currentProduct = product;
                    document.getElementById('product-name').textContent = product.name;
                    document.getElementById('product-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
                    document.getElementById('product-old-price').textContent = `R$ ${product.oldPrice.toFixed(2).replace('.', ',')}`;
                    document.getElementById('product-installments').textContent = `R$ ${(product.price / 12).toFixed(2).replace('.', ',')}`;
                    mainProductImage.src = product.image;
                    
                    sizeButtons.forEach(btn => btn.classList.remove('selected'));
                    selectedSize = null;

                    showPage('product-detail');
                }
            });
        });
    }

    // Função para mostrar o pop-up
    function showPopup(message, type = 'success') {
        popupMessage.textContent = message;
        
        popup.classList.remove('popup-success', 'popup-error');

        if (type === 'success') {
            popupTitle.textContent = 'Sucesso!';
            popup.classList.add('popup-success');
        } else if (type === 'error') {
            popupTitle.textContent = 'Atenção!';
            popup.classList.add('popup-error');
        }

        popupOverlay.style.display = 'flex';
        void popup.offsetWidth;
        popupOverlay.classList.add('visible');
        
        setTimeout(() => {
            hidePopup();
        }, 3000);
    }

    // Função para esconder o pop-up
    function hidePopup() {
        popupOverlay.classList.remove('visible');
        setTimeout(() => {
            popupOverlay.style.display = 'none';
        }, 300);
    }

    // Função para mostrar a página correta
    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = 'none';
        });
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.style.display = 'block';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Função para atualizar a visualização do carrinho
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
            cartTotalPrice.textContent = 'R$ 0,00';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span class="item-size">Tamanho: ${item.size}</span>
                    <span class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Função para adicionar um item ao carrinho
    function addItemToCart(item) {
        if (!selectedSize) {
            showPopup('Por favor, selecione um tamanho antes de adicionar ao carrinho.', 'error');
            return;
        }

        const itemToAdd = {
            id: Math.random().toString(36).substr(2, 9),
            name: item.name,
            price: item.price,
            image: item.image,
            size: selectedSize
        };

        cart.push(itemToAdd);
        updateCartDisplay();
        showPopup(`"${itemToAdd.name}" (Tamanho ${itemToAdd.size}) foi adicionado ao carrinho!`, 'success');
    }

    // Função para remover um item do carrinho
    function removeItemFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartDisplay();
    }

    // --- Eventos ---

    // Navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            
            if (category === 'home') {
                const featuredProducts = PRODUCTS.filter(p => p.featured);
                renderProducts(featuredProducts, 'home');
                showPage('home-page');
            } else {
                const categoryProducts = PRODUCTS.filter(p => p.category === category);
                const pageId = `${category}-page`;
                renderProducts(categoryProducts, category);
                showPage(pageId);
            }
        });
    });

    // Barra de Pesquisa
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 0) {
            const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm));
            searchPageTitle.textContent = `Resultados da Busca por "${e.target.value}"`;
            renderProducts(filteredProducts, 'search');
            showPage('search-page');
        } else {
            const featuredProducts = PRODUCTS.filter(p => p.featured);
            renderProducts(featuredProducts, 'home');
            showPage('home-page');
        }
    });

    // Adiciona o produto ao carrinho
    addToCartButton.addEventListener('click', () => {
        if (currentProduct) {
            addItemToCart(currentProduct);
        }
    });

    // Lógica para selecionar o tamanho
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedSize = button.getAttribute('data-size');
        });
    });

    // Acordeões
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                document.querySelectorAll('.accordion-content').forEach(item => {
                    if (item !== content) {
                        item.style.display = 'none';
                    }
                });
                content.style.display = "block";
            }
        });
    });
        
    // Trocar imagem principal
    productThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainProductImage.src = thumbnail.src;
        });
    });

    // Abrir e fechar o carrinho
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        updateCartDisplay();
    });

    closeCartButton.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // Remover item do carrinho
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemId = e.target.getAttribute('data-id');
            removeItemFromCart(itemId);
        }
    });

    // Fechar pop-up com o botão
    closePopupButton.addEventListener('click', () => {
        hidePopup();
    });

    // Inicia o site mostrando a página inicial
    const featuredProducts = PRODUCTS.filter(p => p.featured);
    renderProducts(featuredProducts, 'home');
    showPage('home-page');
});