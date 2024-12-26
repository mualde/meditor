function AddHizaBtn() {
    // Yeni hiza-container HTML yapısını oluşturuyoruz
    const hizaContainer = document.createElement('div');
    hizaContainer.id = 'hiza-container';
    hizaContainer.innerHTML = `
	<button id="font-justify-btn" title="ikitarafa" onclick="hizala('justifyFull');"><i class="fa-solid fa-align-justify"></i></button>
	
	<button id="font-left-btn" title="Sola" onclick="hizala('justifyLeft')"><i class="fa-solid fa-align-left"></i></button>
	
	<button id="font-center-btn" title="Ortala" onclick="hizala('justifyCenter');"><i class="fa-solid fa-align-center"></i></button>
	
	<button id="font-right-btn" title="Sağa" onclick="hizala('justifyRight');"><i class="fa-solid fa-align-right"></i></button>
	
	<!--<button id="font-hiza-btn" title="Metin Hizalama" onclick="openHizaMenu();"><i class="fa-solid fa-text-width"></i></button><div id="hiza-menu" class="dropdown-menu"></div>-->
    `;

    // toolbar öğesini alıyoruz
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
        toolbar.appendChild(hizaContainer);
    }
}
function openHizaMenu() {
    // Menü görünürlüğünü toggle yapıyoruz
    const HizaMenu = document.getElementById('hiza-menu');
    HizaMenu.style.display = (HizaMenu.style.display === 'none' || HizaMenu.style.display === '') ? 'block' : 'none';
}

function hizala(hiza){
	document.execCommand(hiza);
	editor.focus();
	
}