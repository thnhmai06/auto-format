// Hàm kiểm tra một dòng có phải là mục kiểu "Tên mục:" không
function isSection(line) {
    return /^\s*[^:]+:\s*$/u.test(line);
}

// Hàm kiểm tra một dòng có phải là mục không có dấu hai chấm
function isSectionNoColon(line) {
    return /^\s*[^:]+\s*$/u.test(line) && !isSection(line) && line.trim() !== '';
}

function autoFormat(text) {
    const lines = text.split(/\r?\n/);
    let result = [];
    let inSection = false;
    let lastWasSection = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trimEnd();
        if (line === '') continue;
        if (isSection(line)) {
            if (result.length > 0 && !lastWasSection) result.push(''); // Cách giữa 2 mục
            result.push(line);
            inSection = true;
            lastWasSection = true;
            lastSectionIdx = result.length - 1;
        } else {
            if (!inSection) {
                if (result.length > 0) result.push(''); // Cách 1 dòng giữa các dòng ngoài mục
                result.push(line);
            } else {
                result.push(line);
            }
            lastWasSection = false;
        }
    }
    return result.join('\n');
}

const input = document.getElementById('input');
const output = document.getElementById('output');

input.addEventListener('input', () => {
    output.textContent = autoFormat(input.value);
});
