var headerMenu = null;
function AddHeaderBtn() {
    // Yeni baslik-container HTML yapısını oluşturuyoruz
    const headerContainer = document.createElement('div');
    headerContainer.id = 'baslik-container';
    headerContainer.innerHTML = `
        <button id="headerBtn" title="Başlık Ekle" onclick="openHeaderMenu();">
            <i class="fa-solid fa-heading"></i>
        </button>
        <div id="header-menu" style="display:none">
            <ul>
			    <li><span class="paragraph" onclick="applyParagraph()">Paragraf Uygula</span></li>
                <li><span class="header1" onclick="applyHeader('h1')">H1 Uygula</span></li>
                <li><span class="header2" onclick="applyHeader('h2')">H2 Uygula</span></li>
                <li><span class="header3" onclick="applyHeader('h3')">H3 Uygula</span></li>
                <li><span class="header4" onclick="applyHeader('h4')">H4 Uygula</span></li>
                <li><span class="header1" onclick="newHeader()">Yeni Ekle</span></li>
            </ul>
        </div>
    `;

    // toolbar öğesini alıyoruz ve baslik-container'ı ekliyoruz
    if (toolbar) {toolbar.appendChild(headerContainer);}
	headerMenu = document.getElementById('header-menu');
}

function openHeaderMenu() {
	
    headerMenu.style.display = (headerMenu.style.display === 'none' || headerMenu.style.display === '') ? 'block' : 'none';
   
}
function applyParagraph() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const newElement = document.createElement('p');  // Yeni paragraf öğesi oluştur

    // Seçilen metni yeni paragraf içine yerleştir
    const selectedText = selection.toString().trim();
    newElement.innerText = selectedText || 'Yeni Satır';

    // Seçilen metni yerinden sil ve yeni paragrafı yerleştir
    range.deleteContents();
    range.insertNode(newElement);
	headerMenu.style.display = 'none';  // Menü gizle
}
function newHeader() {
    const newElement = document.createElement('h1');
    newElement.innerText = 'Yeni Başlık';
	targetElement.insertBefore(newElement, targetElement.firstChild);
    headerMenu.style.display = 'none';
}

function applyHeader(headerType) {
    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const commonAncestor = range ? range.commonAncestorContainer : null;

    // Seçimin sadece "editor" içinde olmasını kontrol et
    if (commonAncestor && editor.contains(commonAncestor)) {
        headerMenu.style.display = 'none';  // Menü gizle
        const selectedText = selection.toString().trim();  // Seçilen metni al ve boşlukları temizle

        if (selectedText && range) {
            let selectedNode = range.startContainer;

            // Eğer seçilen metin bir başlık içindeyse
            if (selectedNode.nodeType === 3 && selectedNode.parentNode.nodeName.startsWith('H')) {
                // Mevcut başlık elemanını bul
                let existingHeader = selectedNode.parentNode;
                existingHeader.textContent = selectedText;  // Mevcut başlığın metnini değiştir

                // Başlık elemanının tipini değiştirebilmek için yeni başlık oluştur
                let newHeader = document.createElement(headerType);
                newHeader.textContent = selectedText;  // Mevcut başlık metnini yeni başlığa aktar

                // Eski başlık yerine yeni başlığı ekle
                existingHeader.replaceWith(newHeader);
                moveCursorToEnd(newHeader);  // Yeni başlık üzerine imleci taşı
            } else {
                // Seçilen metin başlık değilse, yeni başlık oluştur
                let newHeader = document.createElement(headerType);
                newHeader.textContent = selectedText;  // Başlık metnini ekle
                range.deleteContents();  // Seçilen metni sil
                range.insertNode(newHeader);  // Yeni başlık ekle
                moveCursorToEnd(newHeader);  // Yeni başlık üzerine imleci taşı
            }
        }
    }
}



