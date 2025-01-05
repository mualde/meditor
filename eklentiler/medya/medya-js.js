function AddImageBtn() {
    const imageContainer = document.createElement('div');
    imageContainer.id = 'medya-container';
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
						<i class="fa-solid fa-arrows-left-right"></i><input type="number" id="imageWidth" value="250" min="1" max="1024" placeholder="pc" style="width:70px" title="Genişlik">
						<i class="fa-solid fa-arrows-up-down"></i><input type="number" id="imageHeight" value="" min="1" max="2048" placeholder="Auto" style="width:70px" title="Yükseklik">
						<br>
						<i class="fa-solid fa-circle-info"></i><input type="text" id="imageTitle" placeholder="Alt Bilgisi" style="width: 76%" title="Alt Bilgi">
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="insertImage()">Resim Ekle</button>
					<button onclick="resetImageForm()">İptal Et</button>
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
						<i class="fa-solid fa-arrows-left-right"></i><input type="number" id="videoWidth" value="560" min="1" max="1024" placeholder="Genişlik" style="width:70px" title="Genişlik">
						<i class="fa-solid fa-arrows-up-down"></i><input type="number" id="videoHeight" value="315" min="1" max="2048" placeholder="Yükseklik" style="width:70px" title="Yükseklik">
						<br>
						<i class="fa-solid fa-circle-info"></i><input type="text" id="videoTitle" placeholder="Video Başlığı" style="width: 76%" title="Başlık">

					</div>
				</div>
				<div class="modal-footer">
					<button onclick="previewVideo()">Önizleme Yap</button>
					<button onclick="insertVideo()">Video Ekle</button>
					<button onclick="resetVideoForm()">İptal Et</button>
				</div>
			</div>
		</div>
		<div id="resimDuzenle" class="sagtusmenu" style="display:none">
			<div id="dragHandle" class="drag-handle" style="width:100%;text-align:center">
				<i class="fas fa-arrows-alt"></i> Resim Ayarı Menüsü <i class="fas fa-arrows-alt"></i> 
			</div>
			<label for="editWidth">Genişlik: </label><input type="number" id="editWidth" placeholder="Auto" value="30" title="Genişlik">
			<select id="editWidthType" title="widthtype" style="width:50px" onchange="if (this.value === '%') {if(this.previousElementSibling.value > 100){this.previousElementSibling.value = '100';}; this.previousElementSibling.max ='100'}else{this.previousElementSibling.max = null}">
				<option value="px"selected>Px</option>
				<option value="%" >%</option>
			</select>
			<div style="width:100%"></div>
			<label for="editHeight">Yükseklik (px):</label><input type="number" id="editHeight" placeholder="Auto" value="30" title="Yükseklik">
			<select id="editHeightType" title="widthtype" style="width:50px" onchange="if (this.value === '%') {if(this.previousElementSibling.value > 100){this.previousElementSibling.value = '100';}; this.previousElementSibling.max ='100'}else{this.previousElementSibling.max = null}">
				<option value="px"selected>Px</option>
				<option value="%" >%</option>
			</select>
			<div style="width:100%"></div>
			<label for="editAlign">Hizalama:</label>
			<select id="editAlign" title="Hiza" style="width:80px">
				<option value="left">Sol</option>
				<option value="center">Ortala</option>
				<option value="right">Sağ</option>
			</select>
			<div style="width:100%"></div>
			<label for="editAlt">Alt Bilgisi:</label>
			<input type="text" id="editTitle" placeholder="Title bilgisi girin" style="width:100px" title="Title Bilgi">
			<div class="modal-footer">
				<button onclick="updateImage()">Güncelle</button>
				<button onclick="deleteImage()">Kaldır</button>
				<button onclick="this.parentNode.parentNode.style.display='none'">Kapat</button>
			</div>
		</div>
		<div id="videoDuzenle" class="sagtusmenu" style="display:none">
			<div id="dragHandle" class="drag-handle" style="width:100%;text-align:center">
				<i class="fas fa-arrows-alt"></i> Video Ayarı Menüsü <i class="fas fa-arrows-alt"></i> 
			</div>
			<label for="editVideoWidth">Genişlik: </label><input type="number" id="editVideoWidth" placeholder="Auto" value="560" title="Genişlik">
			<select id="editVideoWidthType" title="widthtype" style="width:50px" onchange="if (this.value === '%') {if(this.previousElementSibling.value > 100){this.previousElementSibling.value = '100';}; this.previousElementSibling.max ='100'}else{this.previousElementSibling.max = null}">
				<option value="px"selected>Px</option>
				<option value="%" >%</option>
			</select>
			<div style="width:100%"></div>
			<label for="editVideoHeight">Yükseklik: </label><input type="number" id="editVideoHeight" placeholder="Auto" value="315" title="Yükseklik">
			<select id="editVideoHeightType" title="heighttype" style="width:50px"onchange="if (this.value === '%') {if(this.previousElementSibling.value > 100){this.previousElementSibling.value = '100';}; this.previousElementSibling.max ='100'}else{this.previousElementSibling.max = null}">
				<option value="px"selected>Px</option>
				<option value="%" >%</option>
			</select>
			<div style="width:100%"></div>
			<label for="editVideoAlign">Hizalama:</label>
			<select id="editVideoAlign" title="Hiza" style="width:80px">
				<option value="left">Sol</option>
				<option value="center" selected>Ortala</option>
				<option value="right">Sağ</option>
			</select>
			<div style="width:100%"></div>
			<label for="editVideoTitle">Başlığı:</label>
			<input type="text" id="editVideoTitle" placeholder="Başlık girin" style="width:100px" title="Video Başlığı">
			<div class="modal-footer">
				<button onclick="updateVideo()">Güncelle</button>
				<button onclick="deleteVideo()">Kaldır</button>
				<button onclick="this.parentNode.parentNode.style.display='none'">Kapat</button>
			</div>
		</div>
    `;
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
        toolbar.appendChild(imageContainer);
		toolbar.addEventListener('mouseover', function(){
			if (document.getElementById('topRightButtonImage')) {document.getElementById('topRightButtonImage').remove();}
			if (document.getElementById('bottomLeftButtonImage')) {document.getElementById('bottomLeftButtonImage').remove();}
			if (document.getElementById('topLeftButtonImage')) {document.getElementById('topLeftButtonImage').remove();}
			if (document.getElementById('bottomRightButtonImage')) {document.getElementById('bottomRightButtonImage').remove();}
			
			if (document.getElementById('topRightButtonVideo')) {document.getElementById('topRightButtonVideo').remove();}
			if (document.getElementById('bottomLeftButtonVideo')) {document.getElementById('bottomLeftButtonVideo').remove();}
			if (document.getElementById('topLeftButtonVideo')) {document.getElementById('topLeftButtonVideo').remove();}
			if (document.getElementById('bottomRightButtonVideo')) {document.getElementById('bottomRightButtonVideo').remove();}	
		});
    }
	var resimBtnCon = document.getElementById('medya-container');
	var resimBtn = document.getElementById('resimBtn');
	var resimDuzenle = document.getElementById('resimDuzenle');
	let offsetX = 0, offsetY = 0, isDragging = false;
	const dragHandles = document.querySelectorAll('.drag-handle');

	dragHandles.forEach(dragHandle => {
		dragHandle.addEventListener('mousedown', (e) => {
			e.preventDefault();
			isDragging = true;
			const menu = dragHandle.closest('.sagtusmenu');
			offsetX = e.clientX - menu.offsetLeft;
			offsetY = e.clientY - menu.offsetTop;
			menu.style.cursor = "move";
			const moveMenu = (e) => {
				if (isDragging) {
					menu.style.left = `${e.clientX - offsetX}px`;
					menu.style.top = `${e.clientY - offsetY}px`;
				}
			};

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

function deleteImage(){
	if(currentImage){
		currentImage.parentNode.remove();
	}
	resimDuzenle.style.display = 'none';
}

function deleteVideo(){
	if(currentVideo){
		currentVideo.remove();
	}
	videoDuzenle.style.display = 'none';
}

function updateImage() {
    const width = document.getElementById('editWidth').value;
    const widthtype = document.getElementById('editWidthType').value;
    const height = document.getElementById('editHeight').value;
    const heighttype = document.getElementById('editHeightType').value;
    const title = document.getElementById('editTitle').value;
    const align = document.getElementById('editAlign').value;
    if (currentImage) {
        currentImage.parentNode.style.width = width ? `${width}${widthtype}` : '250px';
        currentImage.parentNode.style.height = height ? `${height}${heighttype}` : '';
        currentImage.title = title ? title : 'Resim';
        currentImage.parentNode.style.margin = align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0';
        currentImage.style.display = 'block';
    }
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
	
	function finalizeImage(img, width, height, align, title) {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('resim-in-editor');
        imageDiv.contentEditable = 'false';
        imageDiv.style.width = `${width}px`;
        imageDiv.style.height = `${height}px`;
        imageDiv.style.margin = align === "center" ? "0 auto" : align === "left" ? "0" : "0 0 0 auto";
        const image = document.createElement('img');
        image.src = img.src;
        image.title = title;
        image.style.width = '100%';
        image.style.height = '100%';
        imageDiv.appendChild(image);
        savedSelection.insertNode(imageDiv);
        butonServisImage(imageDiv);
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
	if (e.ctrlKey && e.target.classList.contains('video-in-editor')) {
		e.preventDefault(); // Diğer olayların engellenmesi
		const rightClickEvent = new MouseEvent('contextmenu', {
			bubbles: true,
			cancelable: true,
			view: window,
			button: 2,
			ctrlKey: true
		});
		e.target.querySelector('iframe').dispatchEvent(rightClickEvent);
	}

    if (e.ctrlKey && e.target.tagName === 'IFRAME') {
        e.preventDefault();
        currentVideo = e.target;
        document.getElementById('editVideoWidth').value = currentVideo.parentNode.style.width.replace('px', '').replace('%', '');
        document.getElementById('editVideoWidthType').value = currentVideo.parentNode.style.width.match(/[a-zA-Z%]+/)[0], document.getElementById('editVideoWidthType').dispatchEvent(new Event('change'));
        document.getElementById('editVideoHeight').value = currentVideo.parentNode.style.height.replace('px', '').replace('%', '');
		document.getElementById('editVideoHeightType').value = currentVideo.parentNode.style.height.match(/[a-zA-Z%]+/)[0], document.getElementById('editVideoHeightType').dispatchEvent(new Event('change'));
        document.getElementById('editVideoTitle').value = currentVideo.title || '';
		document.getElementById('editAlign').value = currentVideo.parentNode.style.margin === '0px' ? 'left' : currentVideo.parentNode.style.margin === '0px auto' ? 'center' : currentVideo.parentNode.style.margin === '0px 0px 0px auto' ? 'right' : 'center';
		if (Math.abs(toolbarWidthPercentage - 100) < tolerance) {
			videoDuzenle.style.position = 'fixed';
			videoDuzenle.style.top = `${event.clientY || window.innerHeight / 2}px`;  // Y koordinatını ayarla
			videoDuzenle.style.left = `${event.clientX || window.innerWidth / 2.6}px`; // X koordinatını ayarla
		} else {
			videoDuzenle.style.position = 'absolute';
			videoDuzenle.style.top = `${event.clientY+window.scrollY || window.innerHeight / 2}px`;  // Y koordinatını ayarla
			videoDuzenle.style.left = `${event.clientX+window.scrollX || window.innerWidth / 2.6}px`; // X koordinatını ayarla
		}
		videoDuzenle.style.display = 'flex';
		
    }else if (e.ctrlKey && e.target.tagName === 'IMG') {
        e.preventDefault();
        currentImage = e.target;
        document.getElementById('editWidth').value = currentImage.offsetWidth || '';
		document.getElementById('editWidthType').value = currentImage.parentNode.style.width.match(/[a-zA-Z%]+/)[0], document.getElementById('editWidthType').dispatchEvent(new Event('change'));
        document.getElementById('editHeight').value = currentImage.parentNode.offsetHeight || '';
		if(currentImage.parentNode.style.height){
		    document.getElementById('editHeightType').value = currentImage.parentNode.style.height.match(/[a-zA-Z%]+/)[0], document.getElementById('editHeightType').dispatchEvent(new Event('change'));
        }        document.getElementById('editTitle').value = currentImage.title || '';
		document.getElementById('editAlign').value = currentImage.parentNode.style.margin === '0px' ? 'left' : currentImage.parentNode.style.margin === '0px auto' ? 'center' : currentImage.parentNode.style.margin === '0px 0px 0px auto' ? 'right' : 'center';
		if (Math.abs(toolbarWidthPercentage - 100) < tolerance) {
			resimDuzenle.style.position = 'fixed';
			resimDuzenle.style.top = `${event.clientY || window.innerHeight / 2}px`;  // Y koordinatını ayarla
			resimDuzenle.style.left = `${event.clientX || window.innerWidth / 2.6}px`; // X koordinatını ayarla
		} else {
			resimDuzenle.style.position = 'absolute';
			resimDuzenle.style.top = `${event.clientY+window.scrollY || window.innerHeight / 2}px`;  // Y koordinatını ayarla
			resimDuzenle.style.left = `${event.clientX+window.scrollX || window.innerWidth / 2.6}px`; // X koordinatını ayarla
		}
		resimDuzenle.style.display = 'flex';
	}
};

function previewVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoPreview = document.getElementById('videoPreview');
    const previewIframe = document.getElementById('previewIframe');
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
    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    if (videoIdMatch && videoIdMatch[2]) {
        const videoId = videoIdMatch[2];
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video-in-editor');
        videoDiv.contentEditable = 'false';
        videoDiv.style.width = `${videoWidth}px`;
        videoDiv.style.height = `${videoHeight}px`;
        videoDiv.style.margin = videoAlign === "center" ? "0 auto" : videoAlign === "left" ? "0" : "0 0 0 auto";
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.title = `${videoTitle}`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        videoDiv.appendChild(iframe);
        savedSelection.insertNode(videoDiv);
        butonServisVideo(videoDiv);
		resetVideoForm();
    } else {
        console.log('Geçersiz YouTube video URL’si');
    }	
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
    const widthtype = document.getElementById('editVideoWidthType').value;
    const height = document.getElementById('editVideoHeight').value;
    const heighttype = document.getElementById('editVideoHeightType').value;
    const title = document.getElementById('editVideoTitle').value;
    const align = document.getElementById('editVideoAlign').value;
    if (currentVideo) {
        currentVideo.parentNode.style.width = width ? `${width}${widthtype}` : '250px';
        currentVideo.parentNode.style.height = height ? `${height}${heighttype}` : '';
        currentVideo.title = title ? title : 'Video';
        if (align === 'left' || align === 'right') {
            currentVideo.parentNode.style.float = align;
        } else {
            currentVideo.parentNode.style.float = 'none';
        }
        currentVideo.style.display = align === 'center' ? 'block' : '';
        currentVideo.parentNode.style.margin = align === 'center' ? '0 auto' : '0';
    }
    videoDuzenle.style.display = 'none';
}

const videosDivs = document.getElementsByClassName('video-in-editor');
Array.from(videosDivs).forEach(VideoDiv => {
    butonServisVideo(VideoDiv);
});

function butonServisVideo(VideoDiv) {
	VideoDiv.addEventListener('click', function(event) {
        const topLeftButtonVideo = document.createElement('button');
        topLeftButtonVideo.id = 'topLeftButtonVideo';
        topLeftButtonVideo.innerHTML = '⏎';
        topLeftButtonVideo.classList.add('btnSrvsBtn');
        topLeftButtonVideo.title = 'Üste Bir Satır Ekle';
        topLeftButtonVideo.style.top = '15px';
        topLeftButtonVideo.style.left = '5px';
        topLeftButtonVideo.addEventListener('click', function(event) {
            const newParagraph = document.createElement('p');
			newParagraph.innerHTML = '&nbsp;';
			VideoDiv.parentNode.insertBefore(newParagraph, VideoDiv);
			moveCursorToEnd(newParagraph);
			event.stopPropagation();
        });
		
		const topRightButtonVideo = document.createElement('button');
        topRightButtonVideo.id = 'topRightButtonVideo';
        topRightButtonVideo.innerHTML = '✖';
        topRightButtonVideo.classList.add('btnSrvsBtn');
        topRightButtonVideo.title = 'Videoyu Sil';
        topRightButtonVideo.style.top = '15px';
        topRightButtonVideo.style.right = '5px';
        topRightButtonVideo.addEventListener('click', function(event) {
            VideoDiv.remove();
        });
		
		const bottomRightButtonVideo = document.createElement('button');
        bottomRightButtonVideo.id = 'bottomRightButtonVideo';
		bottomRightButtonVideo.classList.add('btnSrvsBtn');
        bottomRightButtonVideo.innerHTML = '⏎';
        bottomRightButtonVideo.title = 'Alta Bir Satır Ekle';
        bottomRightButtonVideo.style.bottom = '15px';
        bottomRightButtonVideo.style.right = '5px';
        bottomRightButtonVideo.addEventListener('click', function(event) {
            const newParagraph = document.createElement('p');
			newParagraph.innerHTML = '&nbsp;';
			VideoDiv.parentNode.insertBefore(newParagraph, VideoDiv.nextSibling);
			moveCursorToEnd(newParagraph);
			event.stopPropagation();
        });
		
		const bottomLeftButtonVideo = document.createElement('button');
        bottomLeftButtonVideo.id = 'bottomLeftButtonVideo';
        bottomLeftButtonVideo.innerHTML = '<i class="fas fa-cog fa-spin spinning-icon"></i>';
        bottomLeftButtonVideo.classList.add('btnSrvsBtn');
        bottomLeftButtonVideo.title = 'Ayarları Aç';
        bottomLeftButtonVideo.style.bottom = '15px';
        bottomLeftButtonVideo.style.left = '5px';
        bottomLeftButtonVideo.addEventListener('click', function(event) {
            event.stopPropagation(); 
            const rightClickEvent = new MouseEvent('contextmenu', {
                bubbles: true,
                cancelable: true,
                view: window,
                button: 2,
                ctrlKey: true
            });
            VideoDiv.querySelector('iframe').dispatchEvent(rightClickEvent);
        });

		if (!VideoDiv.querySelector('#topLeftButtonVideo')) {VideoDiv.appendChild(topLeftButtonVideo);}
		if (!VideoDiv.querySelector('#topRightButtonVideo')) {VideoDiv.appendChild(topRightButtonVideo);}
		if (!VideoDiv.querySelector('#bottomLeftButtonVideo')) {VideoDiv.appendChild(bottomLeftButtonVideo);}
		if (!VideoDiv.querySelector('#bottomRightButtonVideo')) {VideoDiv.appendChild(bottomRightButtonVideo);}
		
		document.addEventListener('click', function handleClickOutside(event) {
			if (!VideoDiv.contains(event.target)) {
				topLeftButtonVideo.remove();
				topRightButtonVideo.remove();
				bottomLeftButtonVideo.remove();
				bottomRightButtonVideo.remove();
			}
		});
	});
}

const imagesDivs = document.getElementsByClassName('resim-in-editor');
Array.from(imagesDivs).forEach(imageDiv => {
	butonServisImage(imageDiv);
});

function butonServisImage(imageDiv){
	imageDiv.addEventListener('click', function(event) {
		const bottomRightButtonImage = document.createElement('button');
		bottomRightButtonImage.id = 'bottomRightButtonImage';
		bottomRightButtonImage.innerHTML = '⏎';
		bottomRightButtonImage.classList.add('btnSrvsBtn');
		bottomRightButtonImage.title = 'Altına Satır Ekle';
		bottomRightButtonImage.style.bottom = '5px';
		bottomRightButtonImage.style.right = '5px';
		bottomRightButtonImage.addEventListener('click', function(event) {
			const newParagraph = document.createElement('p');
			newParagraph.innerHTML = '&nbsp;';
			imageDiv.parentNode.insertBefore(newParagraph, imageDiv.nextSibling);
			moveCursorToEnd(newParagraph);
			event.stopPropagation();
		});

		const topLeftButtonImage = document.createElement('button');
		topLeftButtonImage.id = 'topLeftButtonImage';
		topLeftButtonImage.innerHTML = '⏎';
		topLeftButtonImage.classList.add('btnSrvsBtn');
		topLeftButtonImage.title = 'Üstüne Satır Ekle';
		topLeftButtonImage.style.top = '5px';
		topLeftButtonImage.style.left = '5px';
		topLeftButtonImage.addEventListener('click', function(event) {
			const newParagraph = document.createElement('p');
			newParagraph.innerHTML = '&nbsp;';
			imageDiv.parentNode.insertBefore(newParagraph, imageDiv);
			moveCursorToEnd(newParagraph);
			event.stopPropagation();
		});

		const topRightButtonImage = document.createElement('button');
		topRightButtonImage.id = 'topRightButtonImage';
		topRightButtonImage.innerHTML = '✖';
		topRightButtonImage.classList.add('btnSrvsBtn');
		topRightButtonImage.title = 'Resmi Sil';
		topRightButtonImage.style.top = '5px';
		topRightButtonImage.style.right = '5px';
		topRightButtonImage.addEventListener('click', function(event) {
			imageDiv.remove();
		});

		const bottomLeftButtonImage = document.createElement('button');
		bottomLeftButtonImage.id = 'bottomLeftButtonImage';
		bottomLeftButtonImage.innerHTML = '<i class="fas fa-cog fa-spin spinning-icon"></i>';
		bottomLeftButtonImage.classList.add('btnSrvsBtn');
		bottomLeftButtonImage.title = 'Ayarları Aç';
		bottomLeftButtonImage.style.bottom = '5px';
		bottomLeftButtonImage.style.left = '5px';
		bottomLeftButtonImage.addEventListener('click', function(event) {
			const rightClickEvent = new MouseEvent('contextmenu', {
				bubbles: true,
				cancelable: true,
				view: window,
				button: 2,
				ctrlKey: true
			});
			imageDiv.querySelector('img').dispatchEvent(rightClickEvent);
		});

		if (!imageDiv.querySelector('#topRightButtonImage')) {imageDiv.appendChild(topRightButtonImage);}
		if (!imageDiv.querySelector('#bottomLeftButtonImage')) {imageDiv.appendChild(bottomLeftButtonImage);}
		if (!imageDiv.querySelector('#topLeftButtonImage')) {imageDiv.appendChild(topLeftButtonImage);}
		if (!imageDiv.querySelector('#bottomRightButtonImage')) {imageDiv.appendChild(bottomRightButtonImage);}
		
		document.addEventListener('click', function handleClickOutside(event) {
			if (!imageDiv.contains(event.target)) {
				topRightButtonImage.remove();
				bottomLeftButtonImage.remove();
				topLeftButtonImage.remove();
				bottomRightButtonImage.remove();
			}
		});
	});
}
