document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabFormat = document.getElementById('tabFormat');
    const tabGetId = document.getElementById('tabGetId');
    const tabContentFormat = document.getElementById('tabContentFormat');
    const tabContentGetId = document.getElementById('tabContentGetId');
    const tabIndicator = document.getElementById('tabIndicator');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const pasteBtn = document.getElementById('pasteBtn');
    const copyBtn = document.getElementById('copyBtn');
    const inputLink = document.getElementById('inputLink');
    const outputId = document.getElementById('outputId');
    const pasteLinkBtn = document.getElementById('pasteLinkBtn');
    const copyIdBtn = document.getElementById('copyIdBtn');
    const reverseLinks = document.getElementById('reverseLinks');

    function updateTabIndicator() {
        const activeBtn = document.querySelector('.tab-btn.active');
        if (activeBtn && tabIndicator) {
            const bar = document.getElementById('tabBar');
            const rect = bar.getBoundingClientRect();
            const btnRect = activeBtn.getBoundingClientRect();
            tabIndicator.style.width = btnRect.width + 'px';
            tabIndicator.style.left = (btnRect.left - rect.left) + 'px';
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
    updateTabIndicator();
    window.addEventListener('resize', updateTabIndicator);

    // Copy & paste for Format tab
    copyBtn.onclick = function() {
        output && navigator.clipboard.writeText(output.textContent);
    };
    pasteBtn.onclick = async function() {
        const text = await navigator.clipboard.readText();
        input.value = text;
        input.dispatchEvent(new Event('input'));
    };
    // Copy & paste for Get ID tab
    copyIdBtn.onclick = function() {
        outputId && navigator.clipboard.writeText(outputId.textContent);
    };
    pasteLinkBtn.onclick = async function() {
        const text = await navigator.clipboard.readText();
        inputLink.value = text;
        inputLink.dispatchEvent(new Event('input'));
    };
    // Extract ID logic
    function extractIdsFromLinks(text, reverse) {
        let lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        if (reverse) lines = lines.reverse();
        return lines.map(line => {
            // Ưu tiên lấy id ở cuối cùng của link (trừ args), sau dấu /, không lấy phần sau ? hoặc #
            let match = line.match(/\/([\w-]+)(?=[?#]|$)/);
            return match ? match[1] : '';
        }).filter(Boolean).join('\n');
    }
    function updateOutputId() {
        const val = inputLink.value;
        const reverse = reverseLinks.checked;
        outputId.textContent = extractIdsFromLinks(val, reverse);
    }
    inputLink.addEventListener('input', updateOutputId);
    reverseLinks.addEventListener('change', updateOutputId);
});
