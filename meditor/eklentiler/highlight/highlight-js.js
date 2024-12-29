// Stil uygulama butonları oluşturma fonksiyonu
function AddVurgularBtn() {
	const buttons = [
		{ id: 'justify-left-btn', title: 'Sola Yasla', command: 'justifyLeft', icon: 'fa-align-left' },
		{ id: 'justify-center-btn', title: 'Ortala', command: 'justifyCenter', icon: 'fa-align-center' },
		{ id: 'justify-right-btn', title: 'Sağa Yasla', command: 'justifyRight', icon: 'fa-align-right' },
		{ id: 'justify-full-btn', title: 'İki Tarafa Yasla', command: 'justifyFull', icon: 'fa-align-justify' },
		{ id: 'bold-btn', title: 'Kalın', command: 'bold', icon: 'fa-bold' },
		{ id: 'italic-btn', title: 'İtalik', command: 'italic', icon: 'fa-italic' },
		{ id: 'underline-btn', title: 'Altı Çizili', command: 'underline', icon: 'fa-underline' },
		{ id: 'strike-btn', title: 'Üstü Çizili', command: 'strikeThrough', icon: 'fa-strikethrough' },
		{ id: 'subscript-btn', title: 'Alt Simge', command: 'subscript', icon: 'fa-subscript' },
		{ id: 'superscript-btn', title: 'Üst Simge', command: 'superscript', icon: 'fa-superscript' },
		{ id: 'indent-btn', title: 'İçe Girinti', command: 'indent', icon: 'fa-indent' },
		{ id: 'outdent-btn', title: 'Dışa Girinti', command: 'outdent', icon: 'fa-outdent' },
		{ id: 'bulleted-list-btn', title: 'Madde Listesi', command: 'insertUnorderedList', icon: 'fa-list-ul' },
		{ id: 'numbered-list-btn', title: 'Numaralı Liste', command: 'insertOrderedList', icon: 'fa-list-ol' },
		{ id: 'insertrorizontalrule-btn', title: 'Yatay Çizgi Ekle', command: 'insertHorizontalRule', icon: 'fa-minus' },
		{ id: 'removeformat-btn', title: 'Stilleri Kaldır', command: 'removeFormat', icon: 'fa-eraser' },
		{ id: 'cut-btn', title: 'Kes', command: 'cut', icon: 'fa-cut' },
		{ id: 'copy-btn', title: 'Kopyala', command: 'copy', icon: 'fa-copy' },
		{ id: 'paste-btn', title: 'Yapıştır', onclick: pasteText, icon: 'fa-paste' },
		{ id: 'undo-btn', title: 'Geri Al', command: 'undo', icon: 'fa-undo' },
		{ id: 'redo-btn', title: 'İleri Al', command: 'redo', icon: 'fa-redo' },
		{ id: 'selectall-btn', title: 'Tümünü Seç', command: 'selectAll', icon: 'fa-check-double' },
		{ id: 'delete-btn', title: 'Sil', command: 'delete', icon: 'fa-trash' }
		//{ id: 'find-btn', title: 'Bul', command: 'find', icon: 'fa-search' }
	];

    if (toolbar) {
        // Highlight kapsayıcısını oluştur
        const highlightContainer = document.createElement('div');
        highlightContainer.id = 'highlight-container';
		
		//element.setAttribute('onclick', 'calistir()');

		
        // Butonları highlight kapsayıcısına ekle
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.id = btn.id;
            button.title = btn.title;
            button.innerHTML = `<i class="fa-solid ${btn.icon}"></i>`;
            if (btn.onclick) {
                button.onclick = btn.onclick;
            } else {
                button.onclick = () => applyStyle(btn.command);
            }

            highlightContainer.appendChild(button);
        });

        // Highlight kapsayıcısını toolbar içine ekle
        toolbar.appendChild(highlightContainer);
    }
}

// Stil uygulama fonksiyonu
function applyStyle(command) {
	if(command === 'delete'){
		if(!confirm('Editörü Temizlemek istediğinizden Eminmisiniz')){
			return false;
		}
	};
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // Eğer seçim yoksa çık
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;
    const editor = document.getElementById('editor'); // Editör elementi
    if (editor.contains(commonAncestor)) {
        // Stil uygula (execCommand yerine, document.style işlemleriyle güncellenmiş)
        document.execCommand(command); // Bu eski bir yöntemdir, ama şimdilik kullanılıyor.
        editor.focus();
    } else {
        console.log("Seçim yalnızca düzenleme alanında olmalıdır.");
    }
}

async function pasteText() {
try {
        // Pano verisini oku
        const text = await navigator.clipboard.readText();
        if (!text) {
            alert("Panoda bir içerik bulunamadı.");
            return;
        }

        // Seçimi al ve imleç konumunu belirle
        const selection = window.getSelection();
        const range = selection.getRangeAt(0); // Geçerli imleç veya seçimi al

        // Pano verisini imleç konumuna ekle
        range.deleteContents(); // Seçili metni sil (eğer varsa)
        const textNode = document.createTextNode(text);
        range.insertNode(textNode); // Pano verisini ekle

        // İmleci eklenen metnin sonuna taşı
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);

    } catch (err) {
        console.error('Yapıştırma işlemi başarısız oldu:', err);
    }
}

































