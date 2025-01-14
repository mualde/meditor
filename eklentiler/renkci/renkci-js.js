function AddColorBtn() {
    const colorContainer = document.createElement('div');
    colorContainer.id = 'color-container';
    colorContainer.innerHTML = `
		<button id="colorBtn" title="Renk Ekle" onclick="openColorMenu();">
			<i class="fa-solid fa-palette"></i>
		</button>
		<div id="font-color-menu" style="display:none">
			<div class="color-picker-item">
				<i class="fa-solid fa-pen" title="Metin Rengi"></i>
				<input title="Metin Rengi" type="color" id="textColor" value="${rgbToHex(negColor(bodyBgColor))}" list style="width:70px">
				<button id="applyColors" onclick="applyFontColor(event)" title="Metin Rengini Değiştir" style="width:70px;margin-left:15px"> Uygula </button>
			</div>
			<div class="color-picker-item">
				<i class="fa-solid fa-paint-roller" title="Arka Plan Rengi"></i>
				<input title="Arka Plan Rengi" type="color" id="bgColor" value="${rgbToHex(bodyBgColor)}" list style="width:70px">
				<button id="applyColors" onclick="applyFontBgColor(event)" title="Arkaplan Rengini Değiştir" style="width:70px;margin-left:15px"> Uygula </button>
			</div>
		</div>
    `;

    if (toolbar) {toolbar.appendChild(colorContainer);}
};

editor.addEventListener('click', function(event){
    document.getElementById('textColor').value = rgbToHex(event.target.style.color) || rgbToHex(negColor(bodyBgColor));
    document.getElementById('bgColor').value = rgbToHex(event.target.style.backgroundColor) || rgbToHex(bodyBgColor);
});

function openColorMenu() {document.getElementById('font-color-menu').style.display = (document.getElementById('font-color-menu').style.display === 'none' || document.getElementById('font-color-menu').style.display === '') ? 'block' : 'none';};

function applyFontColor(event) {
    const textColor = document.getElementById("textColor").value;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        if (editor && editor.contains(commonAncestor)) {
            const selectedText = selection.toString();
            if (selectedText) {
                const selectedNode = range.startContainer;
                const parentElement = selectedNode.parentElement;
                const currentStyle = window.getComputedStyle(parentElement);
                if (range.startOffset > 0 || (!currentStyle.color && !currentStyle.backgroundColor)) {
                    const newSpan = document.createElement("span");
                    newSpan.style.color = textColor;
                    newSpan.textContent = selectedText;
                    range.deleteContents();
                    range.insertNode(newSpan);
                    moveCursorToEnd(newSpan);
                } else {
                    parentElement.style.color = textColor;
                    moveCursorToEnd(parentElement);
                }
            } else {
                let selectedElement = range.commonAncestorContainer;
                if (selectedElement.nodeType === Node.TEXT_NODE) {
                    selectedElement = selectedElement.parentElement;
                }
                selectedElement.style.color = textColor;
                moveCursorToEnd(selectedElement);
            }
        }
        document.getElementById('font-color-menu').style.display = 'none';
    }
}
function applyFontBgColor(event) {
    const bgColor = document.getElementById("bgColor").value;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        if (editor && editor.contains(commonAncestor)) {
            const selectedText = selection.toString();
            if (selectedText) {
                const selectedNode = range.startContainer;
                const parentElement = selectedNode.parentElement;
                const currentStyle = window.getComputedStyle(parentElement);
                if (range.startOffset > 0 || (!currentStyle.color && !currentStyle.backgroundColor)) {
                    const newSpan = document.createElement("span");
                    newSpan.style.backgroundColor = bgColor;
                    newSpan.textContent = selectedText;
                    range.deleteContents();
                    range.insertNode(newSpan);
                    moveCursorToEnd(newSpan);
                } else {
                    parentElement.style.backgroundColor = bgColor;
                    moveCursorToEnd(parentElement);
                }
            } else {
                let selectedElement = range.commonAncestorContainer;
                if (selectedElement.nodeType === Node.TEXT_NODE) {
                    selectedElement = selectedElement.parentElement;
                }
                selectedElement.style.backgroundColor = bgColor;
                moveCursorToEnd(selectedElement);
            }
        }
        document.getElementById('font-color-menu').style.display = 'none';
    }
}
