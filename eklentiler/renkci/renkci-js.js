var fontColorMenu = null;
function AddColorBtn() {
    // Yeni color-container HTML yapısını oluşturuyoruz
    const colorContainer = document.createElement('div');
    colorContainer.id = 'color-container';
    colorContainer.innerHTML = `
		<button id="colorBtn" title="Renk Ekle" onclick="openColorMenu();">
			<i class="fa-solid fa-palette"></i>
		</button>
		<div id="font-color-menu" style="display:none">
			<!-- Metin rengi ikonu ve renk seçici -->
			<div class="color-picker-item">
				<i class="fa-solid fa-pen" title="Metin Rengi"></i>
				<input title="Metin Rengi" type="color" id="textColor" value="${negColor(bodyBgColor)}" list style="width:70px">
				<button id="applyColors" onclick="applyFontColor(event)" title="Metin Rengini Değiştir" style="width:70px;margin-left:15px"> Uygula </button>
			</div>
			
			<!-- Arka plan rengi ikonu ve renk seçici -->
			<div class="color-picker-item">
				<i class="fa-solid fa-paint-roller" title="Arka Plan Rengi"></i>
				<input title="Arka Plan Rengi" type="color" id="bgColor" value="${bodyBgColor}" list style="width:70px">
				<button id="applyColors" onclick="applyFontBgColor(event)" title="Arkaplan Rengini Değiştir" style="width:70px;margin-left:15px"> Uygula </button>
			</div>
		</div>
    `;

    if (toolbar) {toolbar.appendChild(colorContainer);}
	fontColorMenu = document.getElementById('font-color-menu');
};

editor.addEventListener('click', function(event){
    const computedStyle = window.getComputedStyle(event.target);
	const tColor = document.getElementById('textColor');
	const bgColor = document.getElementById('bgColor');
    const fontColor = computedStyle.color;
    let fontBgColor = computedStyle.backgroundColor;
    if (fontBgColor === 'rgba(0, 0, 0, 0)') {
        fontBgColor = 'rgb(255, 255, 255)';
    }
    tColor.value = rgbToHex(fontColor);
    bgColor.value = rgbToHex(fontBgColor);
});


function openColorMenu() {
    fontColorMenu.style.display = (fontColorMenu.style.display === 'none' || fontColorMenu.style.display === '') ? 'block' : 'none';
};

function applyFontColor(event) {
    const textColor = document.getElementById("textColor").value;
    const selection = window.getSelection();

    // Seçimin geçerli olduğundan emin ol
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        const editor = document.getElementById('editor');  // Editor öğesini tanımlıyoruz

        // Seçimin sadece "editor" içinde olmasını kontrol et
        if (editor && editor.contains(commonAncestor)) {
            const selectedText = selection.toString();
            
            if (selectedText) {
                const selectedNode = range.startContainer;
                const parentElement = selectedNode.parentElement;
                const currentStyle = window.getComputedStyle(parentElement);

                // Eğer metin seçildiyse, seçilen metni bir span ile sar ve stil uygula
                if (range.startOffset > 0 || (!currentStyle.color && !currentStyle.backgroundColor)) {
                    const newSpan = document.createElement("span");
                    newSpan.style.color = textColor;
                    newSpan.textContent = selectedText;
                    range.deleteContents();
                    range.insertNode(newSpan);
                    moveCursorToEnd(newSpan);  // İmleci yeni span sonuna taşı
                } else {
                    // Eğer mevcut öğede stil varsa, doğrudan uygulanır
                    parentElement.style.color = textColor;
                    moveCursorToEnd(parentElement);  // İmleci mevcut öğe sonuna taşı
                }
            } else {
                // Seçili metin yoksa, sadece genel stil uygulanır
                let selectedElement = range.commonAncestorContainer;
                if (selectedElement.nodeType === Node.TEXT_NODE) {
                    selectedElement = selectedElement.parentElement;
                }
                selectedElement.style.color = textColor;
                moveCursorToEnd(selectedElement);  // İmleci seçilen öğe sonuna taşı
            }
        }
        fontColorMenu.style.display = 'none';  // Renk menüsünü gizle
    }
}
function applyFontBgColor(event) {
    const bgColor = document.getElementById("bgColor").value;
    const selection = window.getSelection();

    // Seçimin geçerli olduğundan emin ol
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        const editor = document.getElementById('editor');  // Editor öğesini tanımlıyoruz

        // Seçimin sadece "editor" içinde olmasını kontrol et
        if (editor && editor.contains(commonAncestor)) {
            const selectedText = selection.toString();
            
            if (selectedText) {
                const selectedNode = range.startContainer;
                const parentElement = selectedNode.parentElement;
                const currentStyle = window.getComputedStyle(parentElement);

                // Eğer metin seçildiyse, seçilen metni bir span ile sar ve stil uygula
                if (range.startOffset > 0 || (!currentStyle.color && !currentStyle.backgroundColor)) {
                    const newSpan = document.createElement("span");
                    newSpan.style.backgroundColor = bgColor;
                    newSpan.textContent = selectedText;
                    range.deleteContents();
                    range.insertNode(newSpan);
                    moveCursorToEnd(newSpan);  // İmleci yeni span sonuna taşı
                } else {
                    // Eğer mevcut öğede stil varsa, doğrudan uygulanır
                    parentElement.style.backgroundColor = bgColor;
                    moveCursorToEnd(parentElement);  // İmleci mevcut öğe sonuna taşı
                }
            } else {
                // Seçili metin yoksa, sadece genel stil uygulanır
                let selectedElement = range.commonAncestorContainer;
                if (selectedElement.nodeType === Node.TEXT_NODE) {
                    selectedElement = selectedElement.parentElement;
                }
                selectedElement.style.backgroundColor = bgColor;
                moveCursorToEnd(selectedElement);  // İmleci seçilen öğe sonuna taşı
            }
        }
        fontColorMenu.style.display = 'none';  // Renk menüsünü gizle
    }
}
