function AddfullscreenBtn() {
    // Yeni tamekran-container HTML yapısını oluşturuyoruz
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.id = 'tamekran-container';
    fullscreenContainer.innerHTML = `<button id="fullscreenBtn" title="Tam Ekran Yap" onclick="toggleFullscreen();"><i class="fa-solid fa-maximize" style="color:red;"></i></button>`;
    if (toolbar) {toolbar.appendChild(fullscreenContainer);}
};

function toggleFullscreen() {
	var currentBackground = editor.style.backgroundColor;
	if (!editor.classList.contains('tamekraneditor')) {
		
		toolbar.style.zIndex = '999';
		toolbar.style.width = '100%';
		toolbar.style.position = 'fixed';
		toolbar.style.top = '0';
		toolbar.style.left = '0';
		toolbar.style.margin = '0';
		toolbar.style.boxSizing = 'border-box';		
		
		editor.style.zIndex = '99';
		editor.style.width = '100%';
		editor.style.height = `calc(100vh - ${parseInt(window.getComputedStyle(toolbar).height, 10)}px)`;
		editor.style.position = 'fixed';
		editor.style.top = window.getComputedStyle(toolbar).height;
		editor.style.left = '0';
		editor.style.margin = '0';
		editor.style.boxSizing = 'border-box';

		

		sourceCode = document.getElementById("sourceCode");
		sourceCode.style.zIndex = '99';
		sourceCode.style.width = '100%';
		sourceCode.style.height = `calc(100vh - ${parseInt(window.getComputedStyle(toolbar).height, 10)}px)`;
		sourceCode.style.position = 'fixed';
		sourceCode.style.top = window.getComputedStyle(toolbar).height;
		sourceCode.style.left = '0';
		sourceCode.style.margin = '0';
		sourceCode.style.boxSizing = 'border-box';


		
		document.body.style.overflow = 'hidden';

		editor.classList.add('tamekraneditor');
		toolbar.classList.add('tamekrantoolbar');
		sourceCode.classList.add('tamekrankaynak');
	} else {
		editor.style = '';  // Tüm stilleri sıfırla
		editor.style.backgroundColor = currentBackground;
		toolbar.style = '';  // Tüm stilleri sıfırla
		sourceCode.style = '';  // Tüm stilleri sıfırla

		editor.classList.remove('tamekraneditor');
		toolbar.classList.remove('tamekrantoolbar');
		sourceCode.classList.remove('tamekrankaynak');
		sourceCode.style.display = 'none';
		
		document.body.style.overflow = '';
	}
	moveCursorToStart(editor);
	
}

