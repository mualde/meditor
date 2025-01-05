function AddkaydetBtn() {
    const kaydetContainer = document.createElement('div');
    kaydetContainer.id = 'kaydet-container';
    kaydetContainer.innerHTML = `
        <button id="kaydetBtn" title="Kaydet" onclick="savePost();" style="color:#18952D; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            <i class="fa-solid fa-save"></i>
        </button>        
		<button id="kaydetBtn" title="Yeni Ekle" onclick="location.href = 'editor.php?pid=new';">
            <i class="fa-solid fa-file-circle-plus"></i>
        </button>        
		<button id="kaydetBtn" title="Bu Sayfayı Sil" onclick="deletePost();">
            <i class="fa-solid fa-file-circle-minus"></i>
        </button>
    `;

    if (toolbar) {toolbar.appendChild(kaydetContainer);}
}
