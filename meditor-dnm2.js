var editor = document.getElementById('editor');
var toolbar = null;
var sourceContainer = null;
var baseUrl = "https://cdn.jsdelivr.net/gh/mualde/"; // https://cdn.jsdelivr.net/gh/mualde/
var bodyBgColor = '#FFFFFF';

function includeCSS(cssFile) {const link = document.createElement('link');link.rel = 'stylesheet';link.href = baseUrl+cssFile;document.head.appendChild(link);}
function includeJS(src, callback) {const script = document.createElement('script');script.src = baseUrl+src;script.type = 'text/javascript';script.onload = callback;document.body.appendChild(script);}

document.addEventListener("DOMContentLoaded", function () {
    if (editor) {
      editor.style.color = negColor(bodyBgColor);
      editor.contentEditable = true;
		  const toolbarDiv = document.createElement("div");
		  toolbarDiv.style.display = "none";
		  toolbarDiv.className = "toolbar"; 
		  toolbarDiv.id = "toolbar";
		  editor.insertAdjacentElement('beforebegin', toolbarDiv);
		  toolbar = document.getElementById('toolbar');
    }
    if (toolbar) {
		includeJS('meditor/eklentiler/baslik/baslik-js.js', function () {AddHeaderBtn();});
		includeJS('meditor/eklentiler/fontsize/fontsize-js.js', function () {AddSizeBtn();});
		includeJS('meditor/eklentiler/fontfamily/fontfamily-js.js', function () {AddFamilyBtn();});
		includeJS('meditor/eklentiler/renkci/renkci-js.js', function () {AddColorBtn();});
		includeJS('meditor/eklentiler/table/table-js.js', function () {AddTableBtn();});
		includeJS('meditor/eklentiler/medya/medya-js.js', function () {AddImageBtn();});
		includeJS('meditor/eklentiler/link/link-js.js', function () {AddLinkBtn();});
		includeJS('meditor/eklentiler/kaynak/kaynak-js.js', function () {AddKaynakBtn();});
		includeJS('meditor/eklentiler/tamekran/tamekran-js.js', function () {AddfullscreenBtn();});
		includeJS('meditor/eklentiler/kaydet/kaydet-js.js', function () {AddkaydetBtn();});
		includeJS('meditor/eklentiler/highlight/highlight-js.js', function () {AddVurgularBtn();});
		includeCSS('meditor/css/style.css');
		toolbar.addEventListener('mouseover', function(){
			if (document.getElementById('topLeftButton')) {document.getElementById('topLeftButton').remove();}
			if (document.getElementById('topRightButton')) {document.getElementById('topRightButton').remove();}
			if (document.getElementById('bottomLeftButton')) {document.getElementById('bottomLeftButton').remove();}
			if (document.getElementById('bottomRightButton')) {document.getElementById('bottomRightButton').remove();}
			document.querySelector('#editor').querySelectorAll('[contenteditable="true"]').forEach(function(element) {element.removeAttribute('contenteditable');});
		});
    }
	if(editor && toolbar){
    editor.addEventListener("click", function (event) {if (!editor.innerHTML.trim()) {editor.innerHTML = '<p>&nbsp;</p>'};iVeriTopla(event);});
    editor.addEventListener("keydown", function (event) {if (!event.ctrlKey) {iVeriTopla(event);}});
    editor.focus();editor.click();
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
                    fragment.appendChild(buttonContainer);
                }
            });
            toolbar.prepend(fragment);
			toolbar.style.display = 'flex';
        }
    }, timeout);
};
organizeButtons(1500); 

var range = null;
var selection = null;
var selectedText = null;
var currentWord = null;
var targetElement = null;
var savedSelection = null;

function iVeriTopla(event) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        savedSelection = range.cloneRange();
        const selectedText = selection.toString();
        let targetElement = selectedText ? range.startContainer.parentElement : event.target;
        const anchorNode = selection.anchorNode;
        if (anchorNode && anchorNode.textContent) {
            const anchorText = anchorNode.textContent;
            const anchorOffset = selection.anchorOffset;
            const currentWord = anchorText.split(/\s+/).find(word => {const start = anchorText.indexOf(word);const end = start + word.length;return start <= anchorOffset && end >= anchorOffset;}) || '';
        }
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
    const firstChild = element.firstChild;
    if (firstChild) {
        range.setStart(firstChild, 0);
        range.collapse(true);
    } else {
        range.setStart(element, 0);
        range.collapse(true);
    }
    selection.removeAllRanges();
    selection.addRange(range);
}


function negColor(color) {
    let hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);    
	let rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (hexMatch) {let r = 255 - parseInt(hexMatch[1], 16);let g = 255 - parseInt(hexMatch[2], 16);let b = 255 - parseInt(hexMatch[3], 16);return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;}
    if (rgbMatch) {let r = 255 - parseInt(rgbMatch[1]);let g = 255 - parseInt(rgbMatch[2]);let b = 255 - parseInt(rgbMatch[3]);return `rgb(${r}, ${g}, ${b})`;}
    throw new Error("Geçersiz renk formatı! #hex veya rgb kullanılmalıdır.");
}

function rgbaToRgb(rgba) {if(rgba){
	rgba = rgba.replace(/^rgba\((\d+),\s*(\d+),\s*(\d+),.*\)$/, "rgb($1, $2, $3)");return rgba;
}}
function rgbToHex(rgb) {if(rgb){
	const tempElement = document.createElement('div');tempElement.style.color = rgb;document.body.appendChild(tempElement);const computedColor = window.getComputedStyle(tempElement).color;document.body.removeChild(tempElement);rgb = rgbaToRgb(computedColor);
	const result = rgb.match(/\d+/g).map(num => parseInt(num).toString(16).padStart(2, '0'));return `#${result.join('')}`;
}}
function hexToRgb(hex) {if(hex){
	const tempElement = document.createElement('div');tempElement.style.color = hex;document.body.appendChild(tempElement);const computedColor = window.getComputedStyle(tempElement).color;document.body.removeChild(tempElement);hex = computedColor;
	return rgbaToRgb(hex);
}}

function openModal(modalid) {var modal = document.getElementById(modalid);if (modal.style.display === 'none' || modal.style.display === '') {modal.style.display = 'flex';}}
function closeModalDelay() {const modals = document.querySelectorAll('.modal');setTimeout(function() {modals.forEach(element => {element.style.display = 'none';});}, 5);}
function closeModal() {const modals = document.querySelectorAll('.modal');modals.forEach(element => {element.style.display = 'none';});}
function cancelModal() {const modals = document.querySelectorAll('.modal');modals.forEach(element => {element.style.display = 'none';});}

const elmsDivs = document.getElementsByClassName('elm-in-editor');
Array.from(elmsDivs).forEach(elmDiv => {butonServis(elmDiv);});

function butonServis(elmDiv){
	elmDiv.addEventListener('mousemove', function(event) {
		elmDiv.firstChild.setAttribute('contenteditable', 'true');
	});
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
