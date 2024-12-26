function AddImageBtn() {
    // Yeni image-container HTML yapısını oluşturuyoruz
    const imageContainer = document.createElement('div');
    imageContainer.id = 'medya-container';
    imageContainer.className = 'container';
    imageContainer.innerHTML = `
        <button id="resimBtn" title="Resim Ekle" onclick="openModal('resimModal')">
            <i class="fa-solid fa-image"></i>
        </button>        
		<button id="videoBtn" title="Video Ekle" onclick="openModal('videoModal')">
			<i class="fa-brands fa-youtube"></i>
        </button>
		<div id="resimModal" class="modal" style="display:none">
			<div id="modal-content" class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Resim Ekle</h5>
				</div>
				<div class="modal-body">
					<div class="form-group" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; position: relative;">
						<span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Resim Yükleme Bölümü </span>
						<br>
						<input type="url" id="imageUrl" placeholder="Resim URL'sini girin" style="width: 40%;"> veya 
						<input type="file" id="imageFile" accept="image/*" onchange="previewImage(event)" style="width: 40%;">
					</div>
					<div id="imagePreview" style="margin-top: 15px; display: none; text-align: center">
						<h4>Önizleme</h4>
						<img id="previewImg" src="" alt="Önizleme Resmi" style="max-height: 250px; max-width: 400px;">
					</div>
					<br>
					<div class="form-group" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; position: relative;">
						<span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Resim Detayları </span>
						<br>
						<i class="fa-solid fa-text-width"></i>
						<select id="imageAlign" style="width:80px" title="Hiza">
							<option value="left">Sol</option>
							<option value="center" selected>Orta</option>
							<option value="right">Sağ</option>
						</select>
						<i class="fa-solid fa-circle-info"></i><input type="text" id="imageTitle" placeholder="Alt Bilgisi" style="width: 120px" title="Alt Bilgi">
						<i class="fa-solid fa-arrows-left-right"></i><input type="number" id="imageWidth" value="250" min="1" max="1024" placeholder="pc" style="width:70px" title="Genişlik">
						<i class="fa-solid fa-arrows-up-down"></i><input type="number" id="imageHeight" value="" min="1" max="2048" placeholder="Auto" style="width:70px" title="Yükseklik">

					</div>

				</div>
				<div class="modal-footer">
						<button class="btn" onclick="insertImage()">Editöre Ekle</button>
						<button class="btn" onclick="resetImageForm()">İptal Et</button>
				</div>
			</div>
		</div>
		<div id="videoModal" class="modal" style="display:none">
			<div id="modal-content" class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Video URL Ekle</h5>
				</div>
				<div class="modal-body">
					<div class="form-group" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; position: relative;">
						<span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Video Yükleme Bölümü </span>
						<br>
						<input type="url" id="videoUrl" placeholder="Video URL'sini girin" style="width: 80%;">
					</div>
					<div id="videoPreview" style="margin-top: 15px; display: none; text-align: center">
						<h4>Önizleme</h4>
						<iframe id="previewIframe" src="" style="width: 100%; max-width: 560px; height: 315px; border: none;" allowfullscreen></iframe>
					</div>
					<br>
					<div class="form-group" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; position: relative;">
						<span style="position: absolute; top: -19px; left: 10px; padding:5px;background-color:#2e2e2e;color:white;border-radius:5px;font-size:10pt"> Video Detayları </span>
						<br>
						<i class="fa-solid fa-text-width"></i>
						<select id="videoAlign" style="width:80px" title="Hiza">
							<option value="left">Sol</option>
							<option value="center" selected>Orta</option>
							<option value="right">Sağ</option>
						</select>
						<i class="fa-solid fa-circle-info"></i><input type="text" id="videoTitle" placeholder="Video Başlığı" style="width: 120px" title="Başlık">
						<i class="fa-solid fa-arrows-left-right"></i><input type="number" id="videoWidth" value="560" min="1" max="1024" placeholder="Genişlik" style="width:70px" title="Genişlik">
						<i class="fa-solid fa-arrows-up-down"></i><input type="number" id="videoHeight" value="315" min="1" max="2048" placeholder="Yükseklik" style="width:70px" title="Yükseklik">
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn" onclick="previewVideo()">Önizleme Yap</button>
					<button class="btn" onclick="insertVideo()">Editöre Ekle</button>
					<button class="btn" onclick="resetVideoForm()">İptal Et</button>
				</div>
			</div>
		</div>
		<div id="resimDuzenle" class="sagtusmenu" style="display:none">
			<div id="dragHandle" class="drag-handle" style="width:100%;text-align:center">
				<i class="fas fa-arrows-alt"></i> Resim Ayarı Menüsü <i class="fas fa-arrows-alt"></i> 
			</div>
			<label for="editWidth">Genişlik (px):</label><input type="number" id="editWidth" placeholder="Auto" value="30" title="Genişlik">
			<div style="width:100%"></div>
			<label for="editHeight">Yükseklik (px):</label><input type="number" id="editHeight" placeholder="Auto" value="30" title="Yükseklik">
			<div style="width:100%"></div>
			<label for="editAlign">Hizalama:</label>
			<select id="editAlign" title="Hiza">
				<option value="left">Sol</option>
				<option value="center">Ortala</option>
				<option value="right">Sağ</option>
			</select>
			<div style="width:100%"></div>
			<label for="editAlt">Alt Bilgisi:</label>
			<input type="text" id="editTitle" placeholder="Title bilgisi girin" style="width:100px" title="Title Bilgi">
			<div class="modal-footer">
				<button onclick="updateImage()">Güncelle</button>
				<button onclick="this.parentNode.parentNode.style.display='none'">Kapat</button>
			</div>
		</div>
		<div id="videoDuzenle" class="sagtusmenu" style="display:none">
			<div id="dragHandle" class="drag-handle" style="width:100%;text-align:center">
				<i class="fas fa-arrows-alt"></i> Video Ayarı Menüsü <i class="fas fa-arrows-alt"></i> 
			</div>
			<label for="editVideoWidth">Genişlik (px):</label><input type="number" id="editVideoWidth" placeholder="Auto" value="560" title="Genişlik">
			<div style="width:100%"></div>
			<label for="editVideoHeight">Yükseklik (px):</label><input type="number" id="editVideoHeight" placeholder="Auto" value="315" title="Yükseklik">
			<div style="width:100%"></div>
			<label for="editVideoAlign">Hizalama:</label>
			<select id="editVideoAlign" title="Hiza">
				<option value="left">Sol</option>
				<option value="center" selected>Ortala</option>
				<option value="right">Sağ</option>
			</select>
			<div style="width:100%"></div>
			<label for="editVideoTitle">Başlığı:</label>
			<input type="text" id="editVideoTitle" placeholder="Başlık girin" style="width:100px" title="Video Başlığı">
			<div class="modal-footer">
				<button onclick="updateVideo()">Güncelle</button>
				<button onclick="this.parentNode.parentNode.style.display='none'">Kapat</button>
			</div>
		</div>

		
    `;

    // toolbar öğesini alıyoruz
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
        // table-container'ı toolbar içerisine ekliyoruz
        toolbar.appendChild(imageContainer);
    }
	var resimBtnCon = document.getElementById('medya-container');
	var resimBtn = document.getElementById('resimBtn');
	var resimDuzenle = document.getElementById('resimDuzenle');
	let offsetX = 0, offsetY = 0, isDragging = false;

	const dragHandles = document.querySelectorAll('.drag-handle'); // Tüm drag-handle öğelerini seç

	dragHandles.forEach(dragHandle => {
		dragHandle.addEventListener('mousedown', (e) => {
			e.preventDefault(); // Varsayılan seçim davranışını durdur
			isDragging = true;

			const menu = dragHandle.closest('.sagtusmenu'); // En yakın .sagtusmenu öğesini bul
			offsetX = e.clientX - menu.offsetLeft;
			offsetY = e.clientY - menu.offsetTop;
			menu.style.cursor = "move";

			// Sürüklemeyi başlatacak fonksiyonu tanımla
			const moveMenu = (e) => {
				if (isDragging) {
					menu.style.left = `${e.clientX - offsetX}px`;
					menu.style.top = `${e.clientY - offsetY}px`;
				}
			};

			// Sürükleme işlemi bittiğinde temizlik yap
			const stopDragging = () => {
				isDragging = false;
				menu.style.cursor = "default";
				document.removeEventListener('mousemove', moveMenu);
				document.removeEventListener('mouseup', stopDragging);
			};

			document.addEventListener('mousemove', moveMenu);
			document.addEventListener('mouseup', stopDragging);
		});
	});

};

let currentImage = null;



function updateImage() {
    const width = document.getElementById('editWidth').value;
    const height = document.getElementById('editHeight').value;
    const title = document.getElementById('editTitle').value;
    const align = document.getElementById('editAlign').value;
    if (currentImage) {
        currentImage.style.width = width ? `${width}px` : '250px';
        currentImage.style.height = height ? `${height}px` : '';
        currentImage.title = title ? title : 'Resim';
        currentImage.style.margin = align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0';
        currentImage.style.display = 'block';
    }

    // Kapatma
    resimDuzenle.style.display = 'none';
}


function previewImage(event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			document.getElementById('previewImg').src = e.target.result;
			document.getElementById('imagePreview').style.display = 'block';
		};
		reader.readAsDataURL(file);
	}
}

function insertImage() {
    const url = document.getElementById('imageUrl').value;
    const file = document.getElementById('imageFile').files[0];
    const width = document.getElementById('imageWidth').value;
    const height = document.getElementById('imageHeight').value || ' ';
    const title = document.getElementById('imageTitle').value;
    const align = document.getElementById('imageAlign').value;

    let img = new Image();

    // URL veya dosya seçimine göre kaynağı belirle
    if (url) {
        img.src = url;
        finalizeImage(img, width, height, align, title);
    } else if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
            finalizeImage(img, width, height, align, title);
        };
        reader.readAsDataURL(file);
    } else {
        console.log('URL veya dosya belirtmeniz gerekiyor.');
        return;
    }


    // Resmi oluşturup, özelliklerini ayarla ve imlecin bulunduğu öğeye ekle
    function finalizeImage(img, width, height, align, title) {
		let imgHTML = `<img src="${img.src}" title="${title}" style="width: ${width}px; height:${height}; margin:${align === "center" ? "0 auto" : align === "left" ? "0" : "0 0 0 auto"};">`;
		document.execCommand('insertHTML', false, imgHTML);
    }
    resetImageForm();
}


function resetImageForm() {
	document.getElementById('imageUrl').value = '';
	document.getElementById('imageFile').value = '';
	document.getElementById('previewImg').src = '';
	document.getElementById('imagePreview').style.display = 'none';
	document.getElementById('imageTitle').value = '';
	document.getElementById('imageWidth').value = 250;
	document.getElementById('imageHeight').value = '';
	document.getElementById('imageAlign').value = 'center';
	document.getElementById('resimModal').style.display = 'none';
	
}




editor.oncontextmenu = function (e) {
	const toolbarWidthPercentage = (parseFloat(window.getComputedStyle(toolbar).width) / window.innerWidth) * 100;
	const tolerance = 0.5; 
    if (e.ctrlKey && e.target.tagName === 'IFRAME') {
        e.preventDefault();
        currentVideo = e.target;
        document.getElementById('editVideoWidth').value = currentVideo.style.width.replace('px', '');
        document.getElementById('editVideoHeight').value = currentVideo.style.height.replace('px', '');
        document.getElementById('editVideoTitle').value = currentVideo.title || '';
		document.getElementById('editAlign').value = currentVideo.style.margin === '0px' ? 'left' : currentVideo.style.margin === '0px auto' ? 'center' : currentVideo.style.margin === '0px 0px 0px auto' ? 'right' : 'center';
		if (Math.abs(toolbarWidthPercentage - 100) < tolerance) {
			videoDuzenle.style.position = 'fixed';
			videoDuzenle.style.top = `${event.clientY}px`;  // Y koordinatını ayarla
			videoDuzenle.style.left = `${event.clientX}px`; // X koordinatını ayarla
		} else {
			videoDuzenle.style.position = 'absolute';
			videoDuzenle.style.top = `${event.clientY+window.scrollY}px`;  // Y koordinatını ayarla
			videoDuzenle.style.left = `${event.clientX+window.scrollX}px`; // X koordinatını ayarla
		}
		videoDuzenle.style.display = 'flex';
		
    }else if (e.ctrlKey && e.target.tagName === 'IMG') {
        e.preventDefault();
        currentImage = e.target;
        document.getElementById('editWidth').value = currentImage.offsetWidth || '';
        document.getElementById('editHeight').value = currentImage.offsetHeight || '';
        document.getElementById('editTitle').value = currentImage.title || '';
		document.getElementById('editAlign').value = currentImage.style.margin === '0px' ? 'left' : currentImage.style.margin === '0px auto' ? 'center' : currentImage.style.margin === '0px 0px 0px auto' ? 'right' : 'center';
		if (Math.abs(toolbarWidthPercentage - 100) < tolerance) {
			resimDuzenle.style.position = 'fixed';
			resimDuzenle.style.top = `${event.clientY}px`;  // Y koordinatını ayarla
			resimDuzenle.style.left = `${event.clientX}px`; // X koordinatını ayarla
		} else {
			resimDuzenle.style.position = 'absolute';
			resimDuzenle.style.top = `${event.clientY+window.scrollY}px`;  // Y koordinatını ayarla
			resimDuzenle.style.left = `${event.clientX+window.scrollX}px`; // X koordinatını ayarla
		}
		resimDuzenle.style.display = 'flex';
	}
};





function previewVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoPreview = document.getElementById('videoPreview');
    const previewIframe = document.getElementById('previewIframe');

    // YouTube video ID'sini URL'den ayıklayın
    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        previewIframe.src = `https://www.youtube.com/embed/${videoId}`;
        videoPreview.style.display = 'block';
    } else {
        alert('Geçerli URL girin.');
        previewIframe.src = '';
        videoPreview.style.display = 'none';
    }
}

function insertVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoAlign = document.getElementById('videoAlign').value;
    const videoTitle = document.getElementById('videoTitle').value;
    const videoWidth = document.getElementById('videoWidth').value;
    const videoHeight = document.getElementById('videoHeight').value;

    // YouTube URL'sini kontrol et
    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
	console.log('vid: '+videoIdMatch[1].includes('youtu'));
    if (videoIdMatch[1].includes('youtu')) {
        const videoId = videoIdMatch[2];
        let iframeHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" title="${videoTitle}" style="padding:10px; resize:both; overflow:auto; width: ${videoWidth}px; height:${videoHeight}px; margin:${videoAlign === "center" ? "0 auto" : videoAlign === "left" ? "0" : "0 0 0 auto"};"></iframe>`;
		currentElement.insertAdjacentHTML('beforeend', iframeHTML);
    }
    
    resetVideoForm();
}
		
		
		
		
		
function resetVideoForm() {
    document.getElementById('videoUrl').value = '';
    document.getElementById('videoAlign').value = 'center';
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoWidth').value = '560';
    document.getElementById('videoHeight').value = '315';
    document.getElementById('previewIframe').src = '';
    document.getElementById('videoPreview').style.display = 'none';
	closeModal();
}

function updateVideo() {
    const width = document.getElementById('editVideoWidth').value;
    const height = document.getElementById('editVideoHeight').value;
    const title = document.getElementById('editVideoTitle').value;
    const align = document.getElementById('editVideoAlign').value;

    if (currentVideo) {
        // Genişlik ve yükseklik ayarlama
        currentVideo.style.width = width ? `${width}px` : '250px';
        currentVideo.style.height = height ? `${height}px` : '';
        
        // Başlık ayarlama
        currentVideo.title = title ? title : 'Video';

        // Hizalama ayarlama
        if (align === 'left' || align === 'right') {
            currentVideo.style.float = align;
        } else {
            currentVideo.style.float = 'none'; // Ortalamak için
        }
        
        // Video hizalamayı merkezlemek
        currentVideo.style.display = align === 'center' ? 'block' : '';
        currentVideo.style.margin = align === 'center' ? '0 auto' : '0';
    }

    videoDuzenle.style.display = 'none';
}
