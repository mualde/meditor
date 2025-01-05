function AddKaynakBtn() {
    const kaynakContainer = document.createElement('div');
    kaynakContainer.id = 'kaynak-container';
    kaynakContainer.innerHTML = `
        <button id="kaynakBtn" title="Kaynağı Göster" onclick="toggleSourceCode();">
            <i class="fa-solid fa-code"></i>
        </button>
    `;
    if (toolbar) {toolbar.appendChild(kaynakContainer);}
	if (!document.getElementById("sourceCode")) {
		sourceCode = document.createElement('textarea');
		sourceCode.id = 'sourceCode';
		sourceCode.style.display = 'none';
		sourceCode.classList.add('sourceCode');
		sourceCode.classList.add('entry-body');
		sourceCode.classList.add('content-area');
		sourceCode.placeholder="Kaynak Kodu <//>";
		editor.parentNode.insertBefore(sourceCode, editor.nextSibling);
		sourceCode = document.getElementById("sourceCode");
	}
};

function getSelectionFromEditor() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
        const selectedText = selection.toString();
        const range = selection.getRangeAt(0);
        const editor = document.getElementById("editor");
        const editorHTML = editor.innerHTML;
        const startPos = editorHTML.indexOf(selectedText);
        const endPos = startPos + selectedText.length;
        return { editorHTML, selectedText, startPos, endPos };
    } else {
        return null;
    }
}
function getTextPositionInHTML(editorHTML, selectedText) {
    const range = document.createRange();
    const div = document.createElement('div');
    div.innerHTML = editorHTML;
    const textNode = div.textContent.indexOf(selectedText);
    if (textNode !== -1) {
        range.setStart(div.firstChild, textNode);
        range.setEnd(div.firstChild, textNode + selectedText.length);
        return range;
    }
    return null;
}
function applySelectionToSourceCode(startPos, endPos) {
    const sourceCode = document.getElementById('sourceCode');
    if (sourceCode) {
        sourceCode.setSelectionRange(startPos, endPos);
        sourceCode.focus();
    }
}
function toggleSourceCode() {
    if (!editor || !sourceCode) {
        console.error('Editor veya sourceCode öğesi bulunamadı!');
        return;
    }
    if (sourceCode.style.display === 'none' || sourceCode.style.display === '') {
        sourceCode.style.display = 'block';
        sourceCode.value = editor.innerHTML;
		const selectionData = getSelectionFromEditor();
		if (selectionData) {
			const { editorHTML, selectedText, startPos, endPos } = selectionData;
			sourceCode.setSelectionRange(startPos, endPos);
			sourceCode.focus();
		}
        sourceCode.style.width = editor.offsetWidth + 'px';
        sourceCode.style.height = editor.offsetHeight + 'px';
        editor.style.display = "none";
    } else {

        editor.innerHTML = sourceCode.value;
        sourceCode.style.display = 'none';
        editor.style.display = "block";
    }
}

function createTagNameBox() {
    let tagNameBox = document.getElementById('tagnamebox');
    if (!tagNameBox) {
        tagNameBox = document.createElement('span');
        tagNameBox.id = 'tagnamebox';
		document.getElementById("kaynakBtn").appendChild(tagNameBox);
    }
    return tagNameBox;
}

