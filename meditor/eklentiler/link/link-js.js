function AddLinkBtn() {
    // Yeni link-container HTML yapısını oluşturuyoruz
    const linkContainer = document.createElement('div');
    linkContainer.id = 'link-container';
    linkContainer.innerHTML = `
        <button id="linkBtn" title="Link Ekle" onclick="openLinkModal()">
            <i class="fa-solid fa-link"></i>
        </button>
		<div id="linkModal" class="modal" style="display:none">
		  <div class="modal-content">
			<div class="modal-header">
			  <h5 class="modal-title">Bağlantı Ekle</h5>
			</div>
			<div class="modal-body">
			  <div class="mb-3" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
                <span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Link Özellikleri </span>
        <input type="text" id="linkText" placeholder="Köprü" style="width: 100%; user-select: none;">
				<select id="linkTarget" style="width:120px; user-select: none;">
				  <option value="_blank">Yeni Sayfa</option>
				  <option value="_self">Aynı Sayfa</option>
				</select>
			  <div class="mb-3">
				<input type="text" id="linkURL" placeholder="https://mualde.com" style="width:100%; user-select: none;">
			  </div>
			</div>
			<div class="modal-footer">
				<button onclick="InsertLink();">Uygula</button>
				<button onclick="closeModal();">İptal Et</button>
			</div>
		  </div>
		 </div>
		</div>
		
        <div id="editLinkModal" class="modal" style="display:none">
		  <div class="modal-content">
			<div class="modal-header">
			  <h5 class="modal-title">Bağlantıyı Güncelle</h5>
			</div>
			<div class="modal-body">
			  <div class="mb-3" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
                <span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Link Özellikleri </span>
				<input type="text" id="editLinkText" placeholder="Köprü" style="width:100%; user-select: none;">
				<select id="editLinkTarget" style="width:120px; user-select: none;">
				  <option value="_blank">Yeni Sayfada Açılsın</option>
				  <option value="_self">Aynı Sayfada Açılsın</option>
				</select>
			  <div class="mb-3">
				<input type="text" id="editLinkURL" placeholder="https://mualde.com" style="width:100%; user-select: none;">
			  </div>
			</div>
			<div class="modal-footer">
				<button onclick="UpdateLink();">Güncelle</button>
				<button onclick="kaldirLink();">Linki Kaldır</button>
				<button onclick="closeModal()">İptal</button>
			</div>
		  </div>
		 </div>
		</div>	
		
    `;

    if (toolbar) {
        toolbar.appendChild(linkContainer);}
	var linkBtnCon = document.getElementById('link-container');
	var linkBtn = document.getElementById('linkBtn');
};

// Link ekleme modalını açmadan önce Link Metni inputunu doldur
function openLinkModal() {
    const range = selection.getRangeAt(0); // Seçilen alan
  if (range) {
    const selectedText = range.toString();
    const wordRange = getWordAtRange(range);

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

// Uygula butonuna basıldığında işlemleri gerçekleştir
function InsertLink(){
  const linkText = document.getElementById("linkText").value || "Köprü";
  const linkURL = document.getElementById("linkURL").value || "https://mualde.com";
  const linkTarget = document.getElementById("linkTarget").value;
const range = savedSelection; // Seçilen alan
  const anchorTag = document.createElement("a");
  anchorTag.href = linkURL;
  anchorTag.target = linkTarget;
  anchorTag.textContent = linkText;

  if (range) {
    const selectedText = range.toString();
    const wordRange = getWordAtRange(range);

    if (selectedText) {
      // Seçili metni linkle değiştir
      range.deleteContents();
      range.insertNode(anchorTag);
    } else if (wordRange) {
      // İmleçteki kelimeyi linkle değiştir
      const wordText = wordRange.toString();
      wordRange.deleteContents();
      wordRange.insertNode(anchorTag);
    } else {
      // Hiçbir şey seçilmediyse link ekle
      range.insertNode(anchorTag);
    }

    // Seçimi temizle
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

// Kelimeyi bulmak için yardımcı fonksiyon
function getWordAtRange(range) {
  const node = range.startContainer;

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    const offset = range.startOffset;

    // Önceki ve sonraki kelime sınırlarını bul
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


let currentEditingLink = null; // Düzenlenen linkin referansı

// Düzenleme modalını açan fonksiyon
function openEditModal(linkElement) {
    currentEditingLink = linkElement; // Düzenlenecek linki kaydet
    document.getElementById("editLinkText").value = linkElement.textContent;
    document.getElementById("editLinkURL").value = linkElement.href;
    document.getElementById("editLinkTarget").value = linkElement.target;

    document.getElementById("editLinkModal").style.display = "flex";
}

// Editör alanına tıklama olayını dinle
document.getElementById("editor").addEventListener("contextmenu", (event) => {
    if (event.ctrlKey) {
        const target = event.target;

        // Sağ tıklanan eleman bir link mi?
        if (target.tagName === "A") {
            event.preventDefault(); // Varsayılan sağ tıklama menüsünü engelle
            openEditModal(target);
        }
    }
});

// Düzenleme modalını kapat
function closeEditModal() {
    currentEditingLink = null;
    document.getElementById("editLinkModal").style.display = "none";
}

// Düzenlemeyi kaydet
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

// Linki kaldırma fonksiyonu
function removeLink(linkElement) {
    if (linkElement) {
        if (linkElement.textContent !== "Köprü") {
            const textNode = document.createTextNode(linkElement.textContent); // Linkin metnini al
            linkElement.parentNode.replaceChild(textNode, linkElement); // Linki kaldır ve metni bırak
        } else {
            linkElement.remove(); // Linkin kendisini kaldır
        }
    }
}

// "Linki Kaldır" butonuna tıklanınca linki sil
function kaldirLink() {
    if (currentEditingLink) {
        removeLink(currentEditingLink); // Linki sil
        closeEditModal();
        resetModal();

    }
};
