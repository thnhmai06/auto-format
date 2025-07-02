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
function extractIdsFromLinks(text, reverse) {
    let lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (reverse) lines = lines.reverse();
    return lines.map(line => {
        // Lấy id dạng số sau /itm/ hoặc id dạng chữ/số sau v= (youtube) hoặc sau /video/ hoặc sau /watch/ hoặc sau /id/
        let match = line.match(/(?:\/itm\/|v=|\/video\/|\/watch\/|\/id\/)([\w-]+)/i);
        if (!match) {
            // fallback: lấy phần sau dấu / cuối cùng nếu không có query string
            match = line.match(/\/([\w-]+)(?:[?#].*)?$/);
        }
        return match ? match[1] : '';
    }).filter(Boolean).join('\n');
}

function updateOutputId() {
    const val = document.getElementById('inputLink').value;
    const reverse = document.getElementById('reverseLinks').checked;
    document.getElementById('outputId').textContent = extractIdsFromLinks(val, reverse);
}

document.getElementById('inputLink').addEventListener('input', updateOutputId);
document.getElementById('reverseLinks').addEventListener('change', updateOutputId);
