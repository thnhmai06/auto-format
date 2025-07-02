// Tab switching
const tabFormat = document.getElementById('tabFormat');
const tabGetId = document.getElementById('tabGetId');
const tabContentFormat = document.getElementById('tabContentFormat');
const tabContentGetId = document.getElementById('tabContentGetId');

function updateTabIndicator() {
    const indicator = document.getElementById('tabIndicator');
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn && indicator) {
        const bar = document.getElementById('tabBar');
        const rect = bar.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        indicator.style.width = btnRect.width + 'px';
        indicator.style.left = (btnRect.left - rect.left) + 'px';
    }
}

function showTab(tab) {
    if (tab === 'format') {
        tabFormat.classList.add('active');
        tabGetId.classList.remove('active');
        tabContentFormat.style.display = '';
        tabContentGetId.style.display = 'none';
    } else {
        tabGetId.classList.add('active');
        tabFormat.classList.remove('active');
        tabContentFormat.style.display = 'none';
        tabContentGetId.style.display = '';
    }
    updateTabIndicator();
}

tabFormat.onclick = function() { showTab('format'); };
tabGetId.onclick = function() { showTab('getid'); };
// Khởi tạo trạng thái tab
updateTabIndicator();
window.addEventListener('resize', updateTabIndicator);
// Copy & paste for Format tab
document.getElementById('copyBtn').onclick = function() {
    const output = document.getElementById('output').textContent;
    navigator.clipboard.writeText(output);
};
document.getElementById('pasteBtn').onclick = async function() {
    const text = await navigator.clipboard.readText();
    document.getElementById('input').value = text;
    document.getElementById('input').dispatchEvent(new Event('input'));
};
// Copy & paste for Get ID tab
document.getElementById('copyIdBtn').onclick = function() {
    const output = document.getElementById('outputId').textContent;
    navigator.clipboard.writeText(output);
};
document.getElementById('pasteLinkBtn').onclick = async function() {
    const text = await navigator.clipboard.readText();
    document.getElementById('inputLink').value = text;
    document.getElementById('inputLink').dispatchEvent(new Event('input'));
};
// Extract ID logic
document.getElementById('inputLink').addEventListener('input', function() {
    const val = this.value;
    // Regex lấy số sau /itm/ và trước ? hoặc # hoặc hết chuỗi
    const match = val.match(/\/itm\/(\d+)/);
    document.getElementById('outputId').textContent = match ? match[1] : '';
});
