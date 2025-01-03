var editor = document.getElementById('editor');
var toolbar = null;
var sourceContainer = null;

editor.contentEditable= true;

// DOM yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", function () {
    if (editor) {
		const toolbarDiv = document.createElement("div"); // Yeni bir div oluştur
		toolbarDiv.style.display = "none";
		toolbarDiv.className = "toolbar"; 
		toolbarDiv.id = "toolbar";
		editor.insertAdjacentElement('beforebegin', toolbarDiv);
		toolbar = document.getElementById('toolbar');
		pEkle();
		editor.focus();setTimeout(function() {editor.firstElementChild.click();}, 500); 

    }
    if (toolbar) {	
		includeJS('eklentiler/baslik/baslik-js.js', function () {AddHeaderBtn();});
		includeJS('eklentiler/fontsize/fontsize-js.js', function () {AddSizeBtn();});
		includeJS('eklentiler/fontfamily/fontfamily-js.js', function () {AddFamilyBtn();});
		includeJS('eklentiler/renkci/renkci-js.js', function () {AddColorBtn();});
		includeJS('eklentiler/table/table-js.js', function () {AddTableBtn();});
		includeJS('eklentiler/medya/medya-js.js', function () {AddImageBtn();});
		includeJS('eklentiler/link/link-js.js', function () {AddLinkBtn();});
		includeJS('eklentiler/kaynak/kaynak-js.js', function () {AddKaynakBtn();});
		includeJS('eklentiler/tamekran/tamekran-js.js', function () {AddfullscreenBtn();});
		includeJS('eklentiler/kaydet/kaydet-js.js', function () {AddkaydetBtn();});
		includeJS('eklentiler/highlight/highlight-js.js', function () {AddVurgularBtn();});
    }
});


function organizeButtons(timeout = 1500) {
    setTimeout(() => {
        const toolbar = document.getElementById('toolbar');
        if (toolbar) {
            // Değişiklik yapılacak butonların ID'lerini belirtiyoruz
            const buttonContainerOrder = [
                'tamekran-container','baslik-container','hiza-container','size-container','family-container','color-container',
				'medya-container','table-container','link-container','ilerigeri-container',
				'kaynak-container','kaydet-container','highlight-container'
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
var currentElement = null;
var rect = null;
var xPosition = null;
var yPosition = null;
var currentWord = null;
var lineText = null;
var targetElement = null;
//var x = null;var y = null;editor.addEventListener('mousemove', (event) => {x = event.clientX;y = event.clientY;console.log(`Fare Pozisyonu: X: ${x}, Y: ${y}`);});


// Click olayını dinle
editor.addEventListener("click", function (event) {
	pEkle();
	iVeriTopla();
	
});

editor.addEventListener("keydown", function (event) {
    if (!event.ctrlKey) {  // Ctrl tuşu basılmadıysa
        iVeriTopla();  // İşlemi yap
    }
});

editor.addEventListener('input', function () {
	//applyStyleToNextLine();
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
function iVeriTopla(){
	
	
	saveCursorPosition();

	// Seçili metni al
    selection = window.getSelection();
    selectedText = selection.toString(); // Seçili metin
	
	if(selectedText){
		targetElement = selection.getRangeAt(0).startContainer.parentElement;
	}else{
		targetElement = event.target;
	}

	// Hedefteki font-family ve font-size'yi atama
	const fname = document.getElementById('font-family-name');
	const fsize = document.getElementById('font-size-manuel');
	const tColor = document.getElementById('textColor');
	const bgColor = document.getElementById('bgColor');
	const target = event.target; // Tıklanan element
	const tagName = target.tagName;
	
	if (target !== this) {
		// window.getComputedStyle sadece bir kez çağırılacak
		const computedStyle = window.getComputedStyle(target);

		// Font-family ve font-size değerlerini al
		const fontFamilyName = computedStyle.fontFamily || '...'; // Font-family istenen değeri al
		const fontSizePx = parseFloat(computedStyle.fontSize); // Font-size'ı px olarak al
		const fontSizePt = Math.floor(fontSizePx / 1.3333); // pt'ye dönüştürme işlemi
		const fontColor = computedStyle.color;

		// Background color kontrolü ve dönüşüm
		let fontBgColor = computedStyle.backgroundColor;
		if (fontBgColor === 'rgba(0, 0, 0, 0)') {
			// Eğer arka plan transparan ise varsayılan beyaz (#ffffff) rengini atayalım
			fontBgColor = 'rgb(255, 255, 255)';
		}

		// Hedef elementlere atama
		fname.style.fontFamily = fontFamilyName;
		fname.innerText = fontFamilyName.replace('"','');
		fname.title = fontFamilyName;
		fsize.value = fontSizePt + 'pt';
		currentSize = fontSizePt;
		tColor.value = rgbToHex(fontColor);
		bgColor.value = rgbToHex(fontBgColor);

		//console.log('Elementin adı: ' + tagName);console.log('Font Family: ' + fontFamilyName);console.log('Font Size (pt): ' + fontSizePt);console.log('Font Color (hex): ' + rgbToHex(fontColor));console.log('Background Color (hex): ' + rgbToHex(fontBgColor));
	}

	if (selection.rangeCount > 0) {
		const range = selection.getRangeAt(0); // Seçili alanı al
		const rangeSatir = range;  // rangeSatir'ı sadece bir kere tanımlıyoruz
		
		currentWord = window.getSelection() && window.getSelection().anchorNode && window.getSelection().anchorNode.textContent.split(/\s+/).find(word => window.getSelection().anchorNode.textContent.indexOf(word) <= window.getSelection().anchorOffset && window.getSelection().anchorNode.textContent.indexOf(word) + word.length >= window.getSelection().anchorOffset) || '';
		currentWord = currentWord.trim();
		//console.log("İmlecin bulunduğu kelime:", currentWord);
		
		savedSelection = selection.getRangeAt(0).cloneRange();
		//console.log("Seçim kaydedildi:", savedSelection.toString());
		
	}
	createTagNameBox(editor).textContent = `<${tagName}>`;
	currentElement = event.target;

}

includeCSS('css/style.css');

function includeCSS(cssFile) {
    const link = document.createElement('link');
	var baseURL = "https://cdn.jsdelivr.net/gh/Mualde/meditor/";
    link.rel = 'stylesheet';
    link.href = baseURL + cssFile;
    document.head.appendChild(link);
}

function includeJS(file, callback) {
    var baseURL = "https://cdn.jsdelivr.net/gh/Mualde/meditor/";
    var script = document.createElement('script');
    script.src = baseURL + file;
    script.type = 'text/javascript';
    script.onload = callback;
    script.onerror = function () {
        console.error("Dosya yüklenemedi: " + script.src);
    };
    document.head.appendChild(script);
}


function updateStyleProperty(element, property, value) {
    if (element && typeof property === 'string' && typeof value === 'string') {
        element.style[property] = value;
    }
}

function moveCursorToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();

    // Elementin son içeriğine ulaşmak için textNode kullanmak daha güvenli
    const lastChild = element.lastChild;

    if (lastChild) {
        // Eğer son çocuk varsa, son boşluktan önceki karaktere imleci taşı
        const textContent = lastChild.textContent;
        const lastNonSpaceIndex = textContent.trimEnd().length; // Boşlukları dikkate almadan son karakteri bul

        range.setStart(lastChild, lastNonSpaceIndex); // Son boşluktan önceki karakterin sonrasına
        range.collapse(true);  // İmleci son pozisyona getir
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
	// Tüm hedefyer spanlarını kaldır
	document.querySelectorAll('.hedefyer').forEach(span => {
		const parent = span.parentNode;
		parent.replaceChild(document.createTextNode(span.textContent), span);
	});
}













    let lastCursorPosition = null; // Toplam karakterler arasında imleç pozisyonunu saklamak için


    // Cursor pozisyonunu kaydetme işlevi
    function saveCursorPosition() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            // Tüm karakterleri düz bir metin olarak al
            const allText = getFlatText(editor);

            // İmlecin bulunduğu düğümdeki göreli pozisyonu al
            const caretOffset = getCaretOffset(range);

            // İmlecin editördeki toplam pozisyonunu hesapla
            lastCursorPosition = allText.slice(0, caretOffset.nodeIndex).length + caretOffset.offsetInNode;
			//console.log('Editördeki Toplam Pozisyon:', lastCursorPosition);
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

        // İmlecin bulunduğu düğüme kadar olan tüm metin uzunluğunu hesapla
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

    // Test için son pozisyonu ve karakteri konsola yazdırabilirsiniz
    //setInterval(() => { }, 3000);
        
    