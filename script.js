document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function openFile() {
    document.getElementById('fileInput').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            editor.setValue(e.target.result);
        };
        reader.readAsText(file);
    }
}

function saveFile() {
    const text = editor.getValue();
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'file.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printFile() {
    const text = editor.getValue();
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<pre>' + text + '</pre>');
    printWindow.document.close();
    printWindow.print();
}

function previewFile() {
    const text = editor.getValue();
    const previewWindow = window.open('', '', 'height=600,width=800');
    previewWindow.document.write(text);
    previewWindow.document.close();
}

function closeEditor() {
    editor.setValue('');
}

function execEditorCommand(command) {
    editor.focus();
    const doc = editor.getDoc();
    switch(command) {
        case 'cut':
            if (doc.somethingSelected()) {
                navigator.clipboard.writeText(doc.getSelection()).then(() => {
                    doc.replaceSelection('');
                });
            }
            break;
        case 'copy':
            if (doc.somethingSelected()) {
                navigator.clipboard.writeText(doc.getSelection());
            }
            break;
        case 'paste':
            navigator.clipboard.readText().then((text) => {
                const cursor = doc.getCursor();
                doc.replaceRange(text, cursor);
            });
            break;
        case 'selectAll':
            editor.execCommand('selectAll');
            break;
        case 'redo':
            editor.execCommand('redo');
            break;
        case 'undo':
            editor.execCommand('undo');
            break;
    }
}

function insertTimeDate() {
    const now = new Date();
    const formatted = now.toLocaleString();
    const doc = editor.getDoc();
    const cursor = doc.getCursor();
    doc.replaceRange(formatted, cursor);
}

function showTagPopup() {
    const TagMap = {
        103: '<pre></pre>',	
        104: '<blockquote></blockquote>',
        105: '<strong></strong>',
        106: '<em></em>',
        107: '<font></font>',
        108: '<em></em>',
        109: '<b></b>',
        110: '<i></i>',
        111: '<sub></sub>',
        112: '<b></b>',
        113: '<b></b>',
        114: '<p></p>',	
        115: '<br>',
        116: '<hr>',
        117: '<ol></ol>',
        118: '<ul></ul>',
        119: '<li></li>',
        120: 'x',
        121: 'y',
        122: 'z',
        123: '{',
        page: '<head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title></title></head>',
        header: '<head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title></title></head>',
        126: '~'
    };
    const TagList = document.getElementById('TagList');
    TagList.innerHTML = '';
    Object.keys(TagMap).forEach(key => {
        const div = document.createElement('div');
        div.className = 'Tag-item';
        div.textContent = `${key}: ${TagMap[key]}`;
        div.onclick = () => insertTagCharacter(TagMap[key]);
        TagList.appendChild(div);
    });
    document.getElementById('TagPopup').style.display = 'block';
}

function hideTagPopup() {
    document.getElementById('TagPopup').style.display = 'none';
}

function insertTagCharacter(character) {
    const doc = editor.getDoc();
    const cursor = doc.getCursor();
    doc.replaceRange(character, cursor);
    hideTagPopup();
}

function showSymbolPopup() {
    const symbolMap = {
        '32': '&nbsp;',
        '33': '&excl;',
        '34': '&quot;',
        '35': '&num;',
        '36': '&dollar;',
        '37': '&percnt;',
        '38': '&amp;',
        '39': '&apos;',
        '40': '&lpar;',
        '41': '&rpar;',
        '42': '&ast;',
        '43': '&plus;',
        '44': '&comma;',
        '45': '&minus;',
        '46': '&period;',
        '47': '&sol;',
        '48': '&0;',
        '49': '&1;',
        '50': '&2;',
        '51': '&3;',
        '52': '&4;',
        '53': '&5;',
        '54': '&6;',
        '55': '&7;',
        '56': '&8;',
        '57': '&9;',
        '58': '&colon;',
        '59': '&semi;',
        '60': '&lt;',
        '61': '&equals;',
        '62': '&gt;',
        '63': '&quest;',
        '64': '&commat;',
        '65': '&A;',
        '66': '&B;',
        '67': '&C;',
        '68': '&D;',
        '69': '&E;',
        '70': '&F;',
        '71': '&G;',
        '72': '&H;',
        '73': '&I;',
        '74': '&J;',
        '75': '&K;',
        '76': '&L;',
        '77': '&M;',
        '78': '&N;',
        '79': '&O;',
        '80': '&P;',
        '81': '&Q;',
        '82': '&R;',
        '83': '&S;',
        '84': '&T;',
        '85': '&U;',
        '86': '&V;',
        '87': '&W;',
        '88': '&X;',
        '89': '&Y;',
        '90': '&Z;',
        '91': '&lbrack;',
        '92': '&bsol;',
        '93': '&rbrack;',
        '94': '&Hat;',
        '95': '&lowbar;',
        '96': '&grave;',
        '97': '&a;',
        '98': '&b;',
        '99': '&c;',
        '100': '&d;',
        '101': '&e;',
        '102': '&f;',
        '103': '&g;',
        '104': '&h;',
        '105': '&i;',
        '106': '&j;',
        '107': '&k;',
        '108': '&l;',
        '109': '&m;',
        '110': '&n;',
        '111': '&o;',
        '112': '&p;',
        '113': '&q;',
        '114': '&r;',
        '115': '&s;',
        '116': '&t;',
        '117': '&u;',
        '118': '&v;',
        '119': '&w;',
        '120': '&x;',
        '121': '&y;',
        '122': '&z;',
        '123': '&lbrace;',
        '124': '&vert;',
        '125': '&rbrace;',
        '126': '&tilde;',
        '177': '&plusmn;', // ±
        '215': '&times;', // ×
        '247': '&divide;', // ÷
        '8704': '&forall;', // ∀
        '8706': '&part;', // ∂
        '8707': '&exist;', // ∃
        '8709': '&empty;', // ∅
        '8711': '&nabla;', // ∇
        '8712': '&isin;', // ∈
        '8713': '&notin;', // ∉
        '8715': '&ni;', // ∋
        '8719': '&prod;', // ∏
        '8721': '&sum;', // ∑
        '8722': '&minus;', // −
        '8727': '&lowast;', // ∗
        '8730': '&radic;', // √
        '8733': '&prop;', // ∝
        '8734': '&infin;', // ∞
        '8736': '&ang;', // ∠
        '8743': '&and;', // ∧
        '8744': '&or;', // ∨
        '8745': '&cap;', // ∩
        '8746': '&cup;', // ∪
        '8747': '&int;', // ∫
        '8756': '&there4;', // ∴
        '8764': '&sim;', // ∼
        '8773': '&cong;', // ≅
        '8776': '&asymp;', // ≈
        '8800': '&ne;', // ≠
        '8801': '&equiv;', // ≡
        '8804': '&le;', // ≤
        '8805': '&ge;', // ≥
        '8834': '&sub;', // ⊂
        '8835': '&sup;', // ⊃
        '8836': '&nsub;', // ⊄
        '8838': '&sube;', // ⊆
        '8839': '&supe;', // ⊇
        '8853': '&oplus;', // ⊕
        '8855': '&otimes;', // ⊗
        '8869': '&perp;', // ⊥
        '8901': '&sdot;', // ⋅
        '913': '&Alpha;', // Α
        '914': '&Beta;', // Β
        '915': '&Gamma;', // Γ
        '916': '&Delta;', // Δ
        '917': '&Epsilon;', // Ε
        '918': '&Zeta;', // Ζ
        '919': '&Eta;', // Η
        '920': '&Theta;', // Θ
        '921': '&Iota;', // Ι
        '922': '&Kappa;', // Κ
        '923': '&Lambda;', // Λ
        '924': '&Mu;', // Μ
        '925': '&Nu;', // Ν
        '926': '&Xi;', // Ξ
        '927': '&Omicron;', // Ο
        '928': '&Pi;', // Π
        '929': '&Rho;', // Ρ
        '931': '&Sigma;', // Σ
        '932': '&Tau;', // Τ
        '933': '&Upsilon;', // Υ
        '934': '&Phi;', // Φ
        '935': '&Chi;', // Χ
        '936': '&Psi;', // Ψ
        '937': '&Omega;', // Ω
        '945': '&alpha;', // α
        '946': '&beta;', // β
        '947': '&gamma;', // γ
        '948': '&delta;', // δ
        '949': '&epsilon;', // ε
        '950': '&zeta;', // ζ
        '951': '&eta;', // η
        '952': '&theta;', // θ
        '953': '&iota;', // ι
        '954': '&kappa;', // κ
        '955': '&lambda;', // λ
        '956': '&mu;', // μ
        '957': '&nu;', // ν
        '958': '&xi;', // ξ
        '959': '&omicron;', // ο
        '960': '&pi;', // π
        '961': '&rho;', // ρ
        '962': '&sigmaf;', // ς
        '963': '&sigma;', // σ
        '964': '&tau;', // τ
        '965': '&upsilon;', // υ
        '966': '&phi;', // φ
        '967': '&chi;', // χ
        '968': '&psi;', // ψ
        '969': '&omega;' // ω
    };
    const symbolList = document.getElementById('symbolList');
    symbolList.innerHTML = '';
    Object.keys(symbolMap).forEach(key => {
        const div = document.createElement('div');
        div.className = 'symbol-item';
        div.innerHTML = `${key}: ${symbolMap[key]}`;
        div.onclick = () => insertSymbol(symbolMap[key]);
        symbolList.appendChild(div);
    });
    document.getElementById('symbolPopup').style.display = 'block';
}

function hideSymbolPopup() {
    document.getElementById('symbolPopup').style.display = 'none';
}

function insertSymbol(symbol) {
    const doc = editor.getDoc();
    const cursor = doc.getCursor();
    doc.replaceRange(symbol, cursor);
    hideSymbolPopup();
}

function commentCode() {
    const doc = editor.getDoc();
    const selection = doc.getSelection();
    const cursor = doc.getCursor();
    if (selection) {
        doc.replaceSelection(`<!-- ${selection} -->`);
    } else {
        doc.replaceRange('<!--  -->', cursor);
        doc.setCursor(cursor.line, cursor.ch + 5);
    }
}

function changeFont() {
    const font = prompt('Enter font family (e.g., Arial, Courier, Times New Roman):');
    if (font) {
        document.querySelector('.CodeMirror').style.fontFamily = font;
    }
}

function changeTheme(theme) {
    if (theme === 'light') {
        editor.setOption('theme', 'eclipse');
    } else if (theme === 'dark') {
        editor.setOption('theme', 'dracula');
    }
}

function showAboutPopup() {
    document.getElementById('aboutPopup').style.display = 'block';
}

function hideAboutPopup() {
    document.getElementById('aboutPopup').style.display = 'none';
}

const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'htmlmixed',
    theme: 'dracula', // default theme is set to dark
    lineNumbers: true,
    autoCloseTags: true,
    matchBrackets: true
});