var editor = document.getElementById('editor');
var toolbar = null;
var sourceContainer = null;
editor.contentEditable= true;

function includeCSS(cssFile) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    document.head.appendChild(link);
}
function includeJS(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = callback; // Dosya yüklendiğinde çalışacak işlev
    script.onerror = function () {
        console.error(`Dosya yüklenemedi: ${src}`);
    };
    document.body.appendChild(script); // Script'i body'nin sonuna ekliyoruz
}

document.addEventListener("DOMContentLoaded", function () {
    if (editor) {
		const toolbarDiv = document.createElement("div");
		toolbarDiv.style.display = "none";
		toolbarDiv.className = "toolbar"; 
		toolbarDiv.id = "toolbar";
		editor.insertAdjacentElement('beforebegin', toolbarDiv);
		toolbar = document.getElementById('toolbar');
    }
    if (toolbar) {
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/baslik/baslik-js.js', function () {AddHeaderBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/fontsize/fontsize-js.js', function () {AddSizeBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/fontfamily/fontfamily-js.js', function () {AddFamilyBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/renkci/renkci-js.js', function () {AddColorBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/table/table-js.js', function () {AddTableBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/medya/medya-js.js', function () {AddImageBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/link/link-js.js', function () {AddLinkBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/kaynak/kaynak-js.js', function () {AddKaynakBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/tamekran/tamekran-js.js', function () {AddfullscreenBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/kaydet/kaydet-js.js', function () {AddkaydetBtn();});
	includeJS('https://cdn.jsdelivr.net/gh/mualde/meditor/eklentiler/highlight/highlight-js.js', function () {AddVurgularBtn();});
    
	includeCSS('https://cdn.jsdelivr.net/gh/mualde/meditor/css/style.css');
	toolbar.addEventListener('mouseover', function(){
		if (document.getElementById('topLeftButton')) {document.getElementById('topLeftButton').remove();}
		if (document.getElementById('topRightButton')) {document.getElementById('topRightButton').remove();}
		if (document.getElementById('bottomLeftButton')) {document.getElementById('bottomLeftButton').remove();}
		if (document.getElementById('bottomRightButton')) {document.getElementById('bottomRightButton').remove();}	
	});
    }
	if(editor && toolbar){
		pEkle();editor.focus();setTimeout(function() {editor.firstElementChild.click();}, 1500); 
	}
});

function organizeButtons(timeout = 2500) {
    setTimeout(() => {
        const toolbar = document.getElementById('toolbar');
        if (toolbar) {
            const buttonContainerOrder = [
                'baslik-container','hiza-container','size-container','family-container','color-container',
				'medya-container','table-container','link-container','ilerigeri-container',
				'kaydet-container','tamekran-container','kaynak-container','highlight-container'
            ];
            const fragment = document.createDocumentFragment();
            buttonContainerOrder.forEach(buttonId => {
                const buttonContainer = document.getElementById(buttonId);
                if (buttonContainer) {
                    fragment.appendChild(buttonContainer); // İşlenen butonları fragment'e taşı
                }
            });
            toolbar.prepend(fragment);
			toolbar.style.display = 'flex';
        }
    }, timeout);
}

organizeButtons(500); 

var range = null;
var selection = null;
var selectedText = null;
var rect = null;
var xPosition = null;
var yPosition = null;
var currentWord = null;
var lineText = null;
var targetElement = null;

editor.addEventListener("click", function (event) {
	pEkle();
	iVeriTopla();
});

editor.addEventListener("keydown", function (event) {
    if (!event.ctrlKey) {
        iVeriTopla();
    }
});

function pEkle(){
		if (!editor.innerHTML.trim()) {
		const pElement = document.createElement('p');
		pElement.innerHTML = '&nbsp;';
		editor.appendChild(pElement);
		pElement.focus();
	}
}

let savedSelection = null;
function iVeriTopla(event) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        savedSelection = range.cloneRange();
        const selectedText = selection.toString();
        let targetElement = selectedText
            ? range.startContainer.parentElement
            : event.target;
        console.log("Selected Text:", selectedText);
        console.log("Target Element:", targetElement);
        const anchorNode = selection.anchorNode;
        if (anchorNode && anchorNode.textContent) {
            const anchorText = anchorNode.textContent;
            const anchorOffset = selection.anchorOffset;
            const currentWord = anchorText.split(/\s+/).find(word => {const start = anchorText.indexOf(word);const end = start + word.length;return start <= anchorOffset && end >= anchorOffset;}) || '';
            console.log("Current Word:", currentWord.trim());
        }
    } else {
        console.warn("No selection made.");
    }
}

function updateStyleProperty(element, property, value) {
    if (element && typeof property === 'string' && typeof value === 'string') {
        element.style[property] = value;
    }
}

function moveCursorToEnd(element) {
    const selection = window.getSelection();
    const range = document.createRange();
    if (element.lastChild) {
        let lastChild = element.lastChild;
        while (lastChild && lastChild.nodeType !== 3) {
            lastChild = lastChild.previousSibling;
        }
        if (lastChild) {
            const textContent = lastChild.textContent;
            const lastNonSpaceIndex = textContent.replace(/\s+$/, '').length;
            range.setStart(lastChild, lastNonSpaceIndex);
            range.collapse(true);
        }
    } else {
        range.setStart(element, 0);
        range.collapse(true);
    }
    selection.removeAllRanges();
    selection.addRange(range);
}

function moveCursorToStart(element) {
    const range = document.createRange();
    const selection = window.getSelection();

    // Elementin ilk içeriğine ulaşmak için textNode kullanmak daha güvenli
    const firstChild = element.firstChild;

    if (firstChild) {
        // Eğer ilk çocuk varsa, ilk karaktere imleci taşı
        range.setStart(firstChild, 0);  // İlk karakterin başına
        range.collapse(true);  // İmleci başlangıç pozisyonuna getir
    } else {
        // Eğer element boşsa, başlangıca taşır
        range.setStart(element, 0);
        range.collapse(true);
    }

    // Mevcut seçimleri temizle ve yeni range ekle
    selection.removeAllRanges();
    selection.addRange(range);
    //setTimeout(() => { ... }, 500);
}

// RGB'yi hex'e dönüştürme
function rgbToHex(rgb) {const result = rgb.match(/\d+/g).map(num => parseInt(num).toString(16).padStart(2, '0'));return `#${result.join('')}`;}
function hexToRgb(hex) {let r = parseInt(hex.slice(1, 3), 16);let g = parseInt(hex.slice(3, 5), 16);let b = parseInt(hex.slice(5, 7), 16);return `rgb(${r}, ${g}, ${b})`;}


function applyStyleToNextLine() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // Eğer seçim yoksa işleme devam etme
    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;
    const currentParagraph = startContainer.nodeType === Node.TEXT_NODE ? startContainer.parentNode : startContainer;

    if (currentParagraph.nodeName === "P") {
        const prevParagraph = currentParagraph.previousElementSibling;

        if (prevParagraph && prevParagraph.nodeName === "P") {
            const computedStyle = window.getComputedStyle(prevParagraph);

            currentParagraph.style.fontFamily = computedStyle.fontFamily;
            currentParagraph.style.fontSize = computedStyle.fontSize;
            currentParagraph.style.fontWeight = computedStyle.fontWeight;
            currentParagraph.style.lineHeight = computedStyle.lineHeight;
            currentParagraph.style.textAlign = computedStyle.textAlign;
            currentParagraph.style.color = computedStyle.color;
            currentParagraph.style.backgroundColor = computedStyle.backgroundColor; // Arka plan rengini de kopyala
        }
    }
}


function openModal(modalid) {
	var modal = document.getElementById(modalid);
	if (modal.style.display === 'none' || modal.style.display === '') {modal.style.display = 'flex';} // Modalı göster}		
}
function closeModalDelay() {
    const modals = document.querySelectorAll('.modal');  // Modal sınıfına sahip öğeyi seçiyoruz
	setTimeout(function() {
		modals.forEach(element => {element.style.display = 'none';});
	}, 5); 
}
function closeModal() {
    const modals = document.querySelectorAll('.modal');  // Modal sınıfına sahip öğeyi seçiyoruz
	modals.forEach(element => {
		element.style.display = 'none';  // Her bir öğenin display özelliğini 'none' yapıyoruz
	});
}
function  cancelModal() {
    const modals = document.querySelectorAll('.modal');  // Modal sınıfına sahip öğeyi seçiyoruz
	modals.forEach(element => {
		element.style.display = 'none';  // Her bir öğenin display özelliğini 'none' yapıyoruz
	});  
}

function temizle() {
	document.querySelectorAll('.hedefyer').forEach(span => {
		const parent = span.parentNode;
		parent.replaceChild(document.createTextNode(span.textContent), span);
	});
}

let lastCursorPosition = null; 

function saveCursorPosition() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const allText = getFlatText(editor);
        const caretOffset = getCaretOffset(range);
        lastCursorPosition = allText.slice(0, caretOffset.nodeIndex).length + caretOffset.offsetInNode;
    }
}

// Editör içeriğini düz bir metin olarak döndürür
function getFlatText(node) {
    let text = "";
    node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
            text += child.textContent;
        } else {
            text += getFlatText(child); // Rekürsif olarak tüm çocukları dolaş
        }
    });
    return text;
}

// İmleç pozisyonunu düğümler arasında bulur
function getCaretOffset(range) {
    const caretNode = range.startContainer;
    let nodeIndex = 0;
    const traverseNodes = (node) => {
        if (node === caretNode) return true;
        if (node.nodeType === Node.TEXT_NODE) {
            nodeIndex += node.textContent.length;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (const child of node.childNodes) {
                if (traverseNodes(child)) return true;
            }
        }
        return false;
    };
    traverseNodes(editor);
    return { nodeIndex, offsetInNode: range.startOffset };
}

const elmsDivs = document.getElementsByClassName('elm-in-editor');
Array.from(elmsDivs).forEach(elmDiv => {
	butonServis(elmDiv);
});

function butonServis(elmDiv){
	elmDiv.addEventListener('click', function(event) {
		const bottomRightButton = document.createElement('button');
		bottomRightButton.id = 'bottomRightButton';
		bottomRightButton.innerHTML = '⏎';
		bottomRightButton.classList.add('btnSrvsBtn');
		bottomRightButton.title = 'Altına Satır Ekle';
		bottomRightButton.style.bottom = '5px';
		bottomRightButton.style.right = '5px';
		bottomRightButton.addEventListener('click', function(event) {
			const newParagraph = document.createElement('p');
			newParagraph.innerHTML = '&nbsp;';
			elmDiv.parentNode.insertBefore(newParagraph, elmDiv.nextSibling);
			moveCursorToEnd(newParagraph);
            newParagraph.click();
			event.stopPropagation();
		});

		const topLeftButton = document.createElement('button');
		topLeftButton.id = 'topLeftButton';
		topLeftButton.innerHTML = '⏎';
		topLeftButton.classList.add('btnSrvsBtn');
		topLeftButton.title = 'Üstüne Satır Ekle';
		topLeftButton.style.top = '5px';
		topLeftButton.style.left = '5px';
		topLeftButton.addEventListener('click', function(event) {
			const newParagraph = document.createElement('p');
			newParagraph.innerHTML = '&nbsp;';
			elmDiv.parentNode.insertBefore(newParagraph, elmDiv);
			moveCursorToEnd(newParagraph);
            newParagraph.click();
			event.stopPropagation();
		});

		const topRightButton = document.createElement('button');
		topRightButton.id = 'topRightButton';
		topRightButton.innerHTML = '✖';
		topRightButton.classList.add('btnSrvsBtn');
		topRightButton.title = 'Öğeyi Sil';
		topRightButton.style.top = '5px';
		topRightButton.style.right = '5px';
		topRightButton.addEventListener('click', function(event) {
			elmDiv.remove();
		});

		const bottomLeftButton = document.createElement('button');
		bottomLeftButton.id = 'bottomLeftButton';
		bottomLeftButton.innerHTML = '<i class="fas fa-cog fa-spin spinning-icon"></i>';
		bottomLeftButton.classList.add('btnSrvsBtn');
		bottomLeftButton.title = 'Ayarları Aç';
		bottomLeftButton.style.bottom = '5px';
		bottomLeftButton.style.left = '5px';
		bottomLeftButton.addEventListener('click', function(event) {
			const rightClickEvent = new MouseEvent('contextmenu', {
				bubbles: true,
				cancelable: true,
				view: window,
				button: 2,
				ctrlKey: true
			});
            const divElm = elmDiv.firstElementChild;
            if (divElm.tagName === 'TABLE') {
                const selectedCell = elmDiv.querySelector('td.selectedcell');
                const targetCell = selectedCell || elmDiv.querySelector('td');
                targetCell.dispatchEvent(rightClickEvent);
            } else {
                const elements = elmDiv.querySelectorAll('img, iframe');
                elements.forEach(element => {
                    element.dispatchEvent(rightClickEvent);
                });
            }
		});

		if (!elmDiv.querySelector('#topRightButton')) {elmDiv.appendChild(topRightButton);}
		if (!elmDiv.querySelector('#bottomLeftButton')) {elmDiv.appendChild(bottomLeftButton);}
		if (!elmDiv.querySelector('#topLeftButton')) {elmDiv.appendChild(topLeftButton);}
		if (!elmDiv.querySelector('#bottomRightButton')) {elmDiv.appendChild(bottomRightButton);}
		
		document.addEventListener('click', function handleClickOutside(event) {
			if (!elmDiv.contains(event.target)) {
				topRightButton.remove();
				bottomLeftButton.remove();
				topLeftButton.remove();
				bottomRightButton.remove();
				document.removeEventListener('click', handleClickOutside);
			}
		});
	});
}
