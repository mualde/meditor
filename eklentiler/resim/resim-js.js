function AddImageBtn() {
    // Yeni image-container HTML yapısını oluşturuyoruz
    const imageContainer = document.createElement('div');
    imageContainer.id = 'resim-container';
    imageContainer.innerHTML = `
        <button id="resimBtn" title="Resim Ekle" onclick="openModal('resimModal')">
            <i class="fa-solid fa-image"></i>
        </button>
		<div id="resimModal" class="me-modal">
			<div id="me-modal-content" class="me-modal-content">
				<div class="me-modal-header">
					<h5 class="me-modal-title">Resim Ekle</h5>
					<button type="button" class="closeButton" onclick="closeModal();">&times;</button>
				</div>
				<div class="me-modal-body">
					<div class="form-group">
						<input type="url" id="imageUrl" placeholder="Resim URL'sini girin" style="width: 40%;"> veya 
						<input type="file" id="imageFile" accept="image/*" onchange="previewImage(event)" style="width: 40%;">
					</div>
					<div id="imagePreview" style="margin-top: 15px; display: none; text-align: center">
						<h4>Önizleme</h4>
						<img id="previewImg" src="" alt="Önizleme Resmi" style="max-height: 250px; max-width: 400px;">
					</div>
					<div class="form-group">
						Hiza:<select id="imageAlign">
							<option value="left">Sol</option>
							<option value="center" selected>Orta</option>
							<option value="right">Sağ</option>
						</select>
						Alt:<input type="text" id="imageAlt" placeholder="Alt Bilgisi" style="width: 100px">
						G:<input type="number" id="imageWidth" value="250" min="1" max="1024" placeholder="Genişlik">
						Y:<input type="number" id="imageHeight" value="" min="1" max="2048" placeholder="Yükseklik">

					</div>

				</div>
				<div class="me-modal-footer">
					<div class="form-actions">
						<button onclick="insertImage()">Editöre Ekle</button>
						<button class="cancelButton" onclick="resetImageForm()">İptal Et</button>
					</div>
				</div>
			</div>
		</div>
		<div id="resimDuzenle" class="context-menu">
			<label for="editWidth">Genişlik (px):</label>
			<input type="number" id="editWidth" placeholder="Genişlik" value="30">
			<label for="editHeight">Yükseklik (px):</label>
			<input type="number" id="editHeight" placeholder="Yükseklik" value="30">
			<label for="editAlign">Hizalama:</label>
			<select id="editAlign">
				<option value="left">Sol</option>
				<option value="center">Ortala</option>
				<option value="right">Sağ</option>
			</select>
			<br>
			<label for="editAlt">Alt Bilgisi:</label>
			<input type="text" id="editAlt" placeholder="Alt bilgisi girin" style="width:100px">
			<div class="form-actions">
				<button onclick="updateImage()">Güncelle</button>
				<button onclick="closeEditResimMenu()">Kapat</button>
			</div>
		</div>
		
    `;

    // toolbar öğesini alıyoruz
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
        // table-container'ı toolbar içerisine ekliyoruz
        toolbar.appendChild(imageContainer);
    }
	var resimBtnCon = document.getElementById('resim-container');
	var resimBtn = document.getElementById('resimBtn');
	var resimDuzenle = document.getElementById('resimDuzenle');
};

let currentImage = null;

editor.oncontextmenu  = function(e) {
if (e.ctrlKey && e.target.tagName === 'IMG') {
		e.preventDefault();
		currentImage = e.target;
		resimDuzenle.style.top = `${e.pageY}px`;
		resimDuzenle.style.left = `${e.pageX}px`;
		resimDuzenle.style.display = 'block';

		document.getElementById('editWidth').value = currentImage.style.width.replace('px', '');
		document.getElementById('editHeight').value = currentImage.style.height.replace('px', '');
		document.getElementById('editAlign').value = currentImage.style.float || 'center';

		if (currentImage.style.float === 'none') {
			document.getElementById('editAlign').value = 'center';
		}
		document.getElementById('editAlt').value = currentImage.alt;
	}
};


function updateImage() {
	const width = document.getElementById('editWidth').value;
	const height = document.getElementById('editHeight').value;
	const alt = document.getElementById('editAlt').value;
	const align = document.getElementById('editAlign').value;

	if (currentImage) {
		currentImage.style.width = width ? `${width}px` : '250px';
		currentImage.style.height = height ? `${height}px` : '';
		currentImage.alt = alt ? alt : 'Resim';
		currentImage.style.float = align === 'left' || align === 'right' ? align: 'none';
		
		currentImage.style.display = align === 'center' ? 'block' : '';
		currentImage.style.margin = align === 'center' ? '0 auto' : '0';
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
	const height = document.getElementById('imageHeight').value;
	const alt = document.getElementById('imageAlt').value;
	const align = document.getElementById('imageAlign').value;

	let img = new Image();

	if (url) {
		img.src = url;
	} else if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			img.src = e.target.result;
			finalizeImage(img, width, height, align, alt);
		};
		reader.readAsDataURL(file);
		finalizeImage(img, width, height, align, alt);
		resetImageForm()
		return;
	}

	finalizeImage(img, width, height, align, alt);
	resetImageForm();
}

// Resmi oluşturup, imlecin bulunduğu pozisyona ekleyen fonksiyon
function finalizeImage(img, width, height, align, alt) {
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    img.alt = alt ? `${alt}` : 'Resim';
    img.style.float = align === 'left' || align === 'right' ? align : 'center';
    img.style.display = align === 'center' ? 'block' : '';
    img.style.margin = align === 'center' ? '0 auto' : '0';

    // currentElement üzerine resmi ekle
    if (currentElement) {
        currentElement.appendChild(img);  // Imlecin bulunduğu öğeye resmi ekle
    } else {
        console.log('Imleç bir öğe üzerinde değil!');
    }
}

function resetImageForm() {
	document.getElementById('imageUrl').value = '';
	document.getElementById('imageFile').value = '';
	document.getElementById('previewImg').src = '';
	document.getElementById('imagePreview').style.display = 'none';
	document.getElementById('imageAlt').value = '';
	document.getElementById('imageWidth').value = 250;
	document.getElementById('imageHeight').value = '';
	document.getElementById('imageAlign').value = 'center';
	document.getElementById('resimModal').style.display = 'none';
	
}



function closeEditResimMenu(){
	const resimDuzenle = document.getElementById('resimDuzenle');
	resimDuzenle.style.display = 'none';
}
