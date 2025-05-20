var fontFamilyMenu = null;
function AddFamilyBtn() {
    // Yeni family-container HTML yapısını oluşturuyoruz
    const familyContainer = document.createElement('div');
    familyContainer.id = 'family-container';
    familyContainer.innerHTML = `
        <button id="font-family-btn" title="Yazı Tipi" onclick="openFontFamilyMenu();">
            <i class="fa-solid fa-font"></i>
            <span id="font-family-name" style="width:100px;border: 1px solid gray;white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">Arial</span>
        </button>
        <div id="font-family-menu" style="display:none">
            <ul>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Arial', sans-serif;">Arial</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Roboto', sans-serif;">Roboto</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Verdana', sans-serif;">Verdana</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Tahoma', sans-serif;">Tahoma</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Comic Sans MS', cursive;">Comic Sans MS</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Dancing Script', cursive;">Dancing Script</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Fredericka the Great', cursive;">Fredericka Great</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Impact', sans-serif;">Impact</li>
		<li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Pacifico', cursive;">Pacifico</li>
		<li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Lobster', cursive;">Lobster</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Oswald', sans-serif;">Oswald</li>
		<li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Ubuntu', sans-serif;">Ubuntu</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Courier New', monospace;">Courier New</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Georgia', serif;">Georgia</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Times New Roman', serif;">Times New Roman</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Droid Sans', sans-serif;">Droid Sans</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Playfair Display', serif;">Playfair Display</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Montserrat', sans-serif;">Montserrat</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Raleway', sans-serif;">Raleway</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Slabo 27px', serif;">Slabo 27px</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Bitter', serif;">Bitter</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Cinzel', serif;">Cinzel</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Quicksand', sans-serif;">Quicksand</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Anton', sans-serif;">Anton</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Zilla Slab', serif;">Zilla Slab</li>
                <li onclick="applyFontFamily(this.style.fontFamily)" style="font-family: 'Abril Fatface', serif;">Abril Fatface</li>
            </ul>
        </div>
    `;

    if (toolbar) {toolbar.appendChild(familyContainer);}
	fontFamilyMenu = document.getElementById('font-family-menu');
}

document.querySelectorAll('li').forEach(function(li) {
    li.addEventListener('mouseover', function(event) {
		var line = event.target;
        li.timeoutId = setTimeout(function(event) {
        }, 5000);
    });

    li.addEventListener('mouseleave', function() {
        clearTimeout(li.timeoutId);
        document.getElementById('font-family-menu').style.opacity = 1;
    });
});

editor.addEventListener('click', function(event){
    const fname = document.getElementById('font-family-name');
    const computedStyle = window.getComputedStyle(event.target);
    const fontFamilyName = computedStyle.fontFamily || '...';
    fname.style.fontFamily = fontFamilyName;
    fname.innerText = fontFamilyName.replace('"','');
    fname.title = fontFamilyName;
});

function openFontFamilyMenu() {
    fontFamilyMenu.style.display = (fontFamilyMenu.style.display === 'none' || fontFamilyMenu.style.display === '') ? 'block' : 'none';
};

function applyFontFamily(family) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;
    if (editor.contains(commonAncestor)) {   
        const selectedText = selection.toString(); // Seçilen metni al
        const fontFamilyNameElement = document.getElementById('font-family-name');
        fontFamilyNameElement.innerText = family.replace('"', '');
        fontFamilyNameElement.title = family;
        fontFamilyNameElement.style.fontFamily = family;
        fontFamilyMenu.style.display = 'none';
        if (selectedText) {
            const selectedNode = range.startContainer;
            const parentElement = selectedNode.parentElement;
            if (range.startOffset > 0 || (selectedNode.previousSibling && selectedNode.previousSibling.nodeType === Node.TEXT_NODE)) {
                const newSpan = document.createElement('span');
                newSpan.style.fontFamily = family;
                newSpan.innerText = selectedText;
                range.deleteContents();
                range.insertNode(newSpan);
                moveCursorToEnd(newSpan);
            } else {
                parentElement.style.fontFamily = family;
                moveCursorToEnd(parentElement);
            }
        } else {
            let selectedElement = commonAncestor;
            if (selectedElement.nodeType === Node.TEXT_NODE) {
                selectedElement = selectedElement.parentElement;
            }
            selectedElement.style.fontFamily = family;
            moveCursorToEnd(selectedElement);            
        }
    }
}
