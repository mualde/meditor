var fontSizeMenu = null;
function AddSizeBtn() {
    const sizeContainer = document.createElement('div');
    sizeContainer.id = 'size-container';
    sizeContainer.innerHTML = `
        <button title="Yazı Tipi Boyutu">
            <i class="fa-solid fa-text-height" onclick="openFontSizeMenu()"></i>
            <input id="font-size-minus" type="button" title="Yazı Tipi Boyutunu Küçült" value="-" onclick="applyFontSize(parseInt(this.nextElementSibling.value)-2+'pt');">
            <input id="font-size-manuel" type="text" style="width:70px;text-align:center;" onclick="this.value='';" onmousedown="secimiKoru();" onblur="this.value=currentSize+'pt'" onchange="updateFontSize(this.value.replace(/[^0-9]/g, ''));">
            <input id="font-size-plus" type="button" title="Yazı Tipi Boyutunu Büyüt" value="+" onclick="applyFontSize(parseInt(this.previousElementSibling.value)+2+'pt');">
        </button>
        <div id="font-size-menu" style="display:none">
            <ul>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:12pt;">12pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:18pt;">18pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:21pt;">21pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:27pt;">27pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:33pt;">33pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:39pt;">39pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:45pt;">45pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:50pt;">50pt</li>
				<li onclick="applyFontSize(this.style.fontSize)" style="font-size:60pt;">60pt</li>
            </ul>
        </div>
    `;
    if (toolbar) {toolbar.appendChild(sizeContainer);}
	fontSizeMenu = document.getElementById('font-size-menu');
}

let currentSize = 12;

function secimiKoru() {
    const selection = window.getSelection(); // Kullanıcının yaptığı metin seçimini al
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0); // Seçilen aralığı al
        const selectedText = selection.toString(); // Seçilen metni al ve boşlukları temizle
        const words = selectedText.trim().split(/\s+/); // Boşluklara göre ayır

        if (words.length === 1) { // Yalnızca bir kelime seçiliyse
            const parentNode = range.commonAncestorContainer;

            // Eğer zaten bir span içindeyse kontrol et
            if (parentNode.nodeType === Node.TEXT_NODE && parentNode.parentElement.tagName === 'SPAN') {
                parentNode.parentElement.classList.add('secilenkelime');
            } else {
                // Yeni bir span ekle
                const span = document.createElement('span');
                span.classList.add('secilenkelime');
                span.textContent = selectedText; // Seçilen kelimenin sonuna boşluk ekle
                range.deleteContents(); // Seçili metni sil
                range.insertNode(span); // Yeni span'i ekle
            }
        }
    }
    editor.addEventListener('click', function removeHighlight(event) {
        const sk = editor.querySelector('.secilenkelime');
        if(sk){
            sk.classList.remove('secilenkelime');
        }
    });
}

editor.addEventListener('click', function(event){
    event.target.parentElement.classList.remove('secilenkelime');

	const fsize = document.getElementById('font-size-manuel');
    const computedStyle = window.getComputedStyle(event.target);
	const fontSizePx = parseFloat(computedStyle.fontSize);
	const fontSizePt = Math.floor(fontSizePx / 1.3333);
    fsize.value = fontSizePt + 'pt';
    currentSize = fontSizePt;
});

function updateFontSize(size) {
    const sk = editor.querySelector('.secilenkelime');
    sk.style.fontSize = `${size}px`;
    sk.classList.remove('secilenkelime');
    moveCursorToEnd(sk);
    currentSize = parseInt(size);
    document.getElementById('font-size-manuel').value = size + 'pt';
}

function changeFontSize(increment, manualSize = null) {
    if (manualSize) {currentSize = manualSize;} else {currentSize += increment;}
    if (currentSize < 6) currentSize = 6;
    if (currentSize > 200) currentSize = 200;
    document.getElementById('font-size-manuel').value = currentSize + 'pt';
    applyFontSize(currentSize + 'pt');
}
editor.addEventListener('wheel', function (e) {
    if (!e.ctrlKey) return;
    if (e.deltaY < 0) {changeFontSize(2);} else if (e.deltaY > 0) {changeFontSize(-2);}
	e.preventDefault(); 
});

function openFontSizeMenu() {
    fontSizeMenu.style.display = (fontSizeMenu.style.display === 'none' || fontSizeMenu.style.display === '') ? 'block' : 'none';
};

function applyFontSize(size) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    // Seçimin sadece "editor" içinde olmasını kontrol et
    if (editor.contains(commonAncestor)) {
        const selectedText = selection.toString(); // Seçilen metni al
        const fontSizeElement = document.getElementById('font-size-manuel');
        fontSizeElement.value = size;  // Font boyutunu manuel input'a yerleştir
        fontSizeMenu.style.display = 'none';

        const currentSize = parseInt(fontSizeElement.value.replace('pt', ''));

        if (selectedText) {
            // Seçilen metni span içine alarak font boyutunu değiştir
            const selectedNode = range.startContainer;
            const parentElement = selectedNode.parentElement;

            // Seçilen kelimeden önce başka kelimeler varsa
            if (range.startOffset > 0 || (selectedNode.previousSibling && selectedNode.previousSibling.nodeType === Node.TEXT_NODE)) {
                // Seçilen metni bir span içine al
                const newSpan = document.createElement('span');
                newSpan.style.fontSize = `${size}`;
                newSpan.innerText = selectedText;
                range.deleteContents();
                range.insertNode(newSpan);
                moveCursorToEnd(newSpan);
            } else {
                // Seçilen metin varsa, sadece parent element'in font boyutunu değiştir
                parentElement.style.fontSize = `${size}`;
                moveCursorToEnd(parentElement);
            }
        } else {
            // Eğer metin seçilmemişse, içerik elemanının font boyutunu değiştir
            let selectedElement = commonAncestor;
            if (selectedElement.nodeType === Node.TEXT_NODE) {
                selectedElement = selectedElement.parentElement;
            }
            selectedElement.style.fontSize = `${size}`;
            moveCursorToEnd(selectedElement);            
        }
    }
}
