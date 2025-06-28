function AddLinkBtn() {
  const linkContainer = document.createElement('div');
  linkContainer.id = 'link-container';
  linkContainer.innerHTML = `
    <button id="linkBtn" title="Link Ekle" onclick="openLinkModal()">
        <i class="fa-solid fa-link"></i>
    </button>
    <div id="linkModal" class="me-modal" style="display:none">
      <div class="me-modal-content">
        <div class="me-modal-header">
          <h5 class="me-modal-title">Bağlantı Ekle</h5>
        </div>
        <div class="me-modal-body">
          <div class="mb-3" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
            <span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Link Özellikleri </span>
            <input type="text" id="linkText" placeholder="Köprü" style="width: 100%; user-select: none;">
            <input type="text" id="linkURL" placeholder="https://mualde.com" style="width:100%; user-select: none;">
            <select id="linkTarget" style="width:120px; user-select: none;">
              <option value="_blank">Yeni Sayfa</option>
              <option value="_self">Aynı Sayfa</option>
            </select>
          </div>
        </div>
        <div class="me-modal-footer">
          <button onclick="InsertLink();">Uygula</button>
          <button onclick="closeModal();">İptal Et</button>
        </div>
      </div>
    </div>
    <div id="editLinkModal" class="me-modal" style="display:none">
      <div class="me-modal-content">
        <div class="me-modal-header">
          <h5 class="me-modal-title">Bağlantıyı Güncelle</h5>
        </div>
        <div class="me-modal-body">
          <div class="mb-3" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
          <span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Link Özellikleri </span>
            <input type="text" id="editLinkText" placeholder="Köprü" style="width:100%; user-select: none;">
            <input type="text" id="editLinkURL" placeholder="https://mualde.com" style="width:100%; user-select: none;">
            <select id="editLinkTarget" style="width:120px; user-select: none;">
              <option value="_blank">Yeni Sayfada Açılsın</option>
              <option value="_self">Aynı Sayfada Açılsın</option>
            </select>
          </div>
        </div>
        <div class="me-modal-footer">
          <button onclick="UpdateLink();">Güncelle</button>
          <button onclick="kaldirLink();">Linki Kaldır</button>
          <button onclick="closeModal()">İptal</button>
        </div>
      </div>
    </div>
  </div>`;

  if (toolbar) {toolbar.appendChild(linkContainer);}
	var linkBtnCon = document.getElementById('link-container');
	var linkBtn = document.getElementById('linkBtn');
};

function openLinkModal(event) {
	const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  if (range) {
    const selectedText = range.toString();
    const wordRange = getWordAtRange(range);
    const oge = range.startContainer.parentNode;
    if (oge.tagName === "A") {openEditModal(oge);return;}

    if (selectedText) {
      document.getElementById("linkText").value = selectedText;
    } else if (wordRange) {
      document.getElementById("linkText").value = wordRange.toString();
    } else {
      document.getElementById("linkText").value = "Köprü";
    }
  }
  document.getElementById("linkModal").style.display = "flex";
}

function InsertLink(){
  const linkText = document.getElementById("linkText").value || "Köprü";
  const linkURL = document.getElementById("linkURL").value || "https://mualde.com";
  const linkTarget = document.getElementById("linkTarget").value;
  const range = savedSelection;
  const anchorTag = document.createElement("a");
  anchorTag.href = linkURL;
  anchorTag.target = linkTarget;
  anchorTag.textContent = linkText;

  if (range) {
    const selectedText = range.toString();
    const wordRange = getWordAtRange(range);

    if (selectedText) {
      range.deleteContents();
      range.insertNode(anchorTag);
    } else if (wordRange) {
      const wordText = wordRange.toString();
      wordRange.deleteContents();
      wordRange.insertNode(anchorTag);
    } else {
      range.insertNode(anchorTag);
    }
    window.getSelection().removeAllRanges();
  }
  closeModal();
  resetModal();
};

function resetModal(){
  document.getElementById("linkText").value = '';
  document.getElementById("linkURL").value = '';
  document.getElementById("linkTarget").value = '_blank';
  document.getElementById("editLinkText").value = '';
  document.getElementById("editLinkURL").value = '';
  document.getElementById("editLinkTarget").value = '_blank';
}

function getWordAtRange(range) {
  const node = range.startContainer;
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    const offset = range.startOffset;
    const before = text.slice(0, offset).split(/\s+/).pop();
    const after = text.slice(offset).split(/\s+/)[0];
    const wordStart = offset - (before ? before.length : 0);
    const wordEnd = offset + (after ? after.length : 0);
    if (wordStart >= 0 && wordEnd <= text.length) {
      const wordRange = document.createRange();
      wordRange.setStart(node, wordStart);
      wordRange.setEnd(node, wordEnd);
      return wordRange;
    }
  }
  return null;
}

let currentEditingLink = null;
function openEditModal(linkElement) {
    currentEditingLink = linkElement;
    document.getElementById("editLinkText").value = linkElement.textContent;
    document.getElementById("editLinkURL").value = linkElement.href;
    document.getElementById("editLinkTarget").value = linkElement.target;
    document.getElementById("editLinkModal").style.display = "flex";
}

editor.addEventListener("contextmenu", (event) => {
    if (event.ctrlKey) {
        const target = event.target;
        if (target.tagName === "A") {
            event.preventDefault();
            openEditModal(target);
        }
    }
});

function closeEditModal() {
    currentEditingLink = null;
    document.getElementById("editLinkModal").style.display = "none";
}

function UpdateLink(){
    if (currentEditingLink) {
        const newText = document.getElementById("editLinkText").value || "Köprü";
        const newURL = document.getElementById("editLinkURL").value || "https://mualde.com";
        const newTarget = document.getElementById("editLinkTarget").value;
        currentEditingLink.textContent = newText;
        currentEditingLink.href = newURL;
        currentEditingLink.target = newTarget;
        closeEditModal();
        resetModal();
    }
};

function removeLink(linkElement) {
    if (linkElement) {
        if (linkElement.textContent !== "Köprü") {
            const textNode = document.createTextNode(linkElement.textContent);
            linkElement.parentNode.replaceChild(textNode, linkElement);
        } else {
            linkElement.remove();
        }
    }
}

function kaldirLink() {
    if (currentEditingLink) {
        removeLink(currentEditingLink);
        closeEditModal();
        resetModal();

    }
};
