function checkLocalStorage() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch(e) {
        return false;
    }
}

if (!checkLocalStorage()) {
    alert('お使いのブラウザでローカルストレージが利用できません。データの保存ができない可能性があります。');
}
const partsCosts = {
    'iPhone6s': { 'lcd': 1600, 'battery': 1500, 'batteryTag': 1700, 'faceid': 0, 'homeButton': 200 },
    'iPhone6sPlus': { 'lcd': 1600, 'battery': 1500, 'batteryTag': 1700, 'faceid': 0, 'homeButton': 200 },
    'iPhone7': { 'lcd': 1900, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 },
    'iPhone7Plus': { 'lcd': 2200, 'battery': 1900, 'batteryTag': 2100, 'faceid': 0, 'homeButton': 200 },
    'iPhone8': { 'lcd': 2500, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 },
    'iPhone8Plus': { 'lcd': 2500, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 },
    'iPhoneX': { 'lcd': 2272, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhoneXS': { 'lcd': 2411, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhoneXSMax': { 'lcd': 2886, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhoneXR': { 'lcd': 2430, 'battery': 800, 'batteryTag': 800, 'faceid': 0, 'homeButton': 0 },
    'iPhone11': { 'lcd': 2435, 'battery': 920, 'batteryTag': 1724, 'faceid': 0, 'homeButton': 0 },
    'iPhone11Pro': { 'lcd': 2936, 'battery': 1400, 'batteryTag': 2196, 'faceid': 0, 'homeButton': 0 },
    'iPhone11ProMax': { 'lcd': 2999, 'battery': 1480, 'batteryTag': 2276, 'faceid': 0, 'homeButton': 0 },
    'iPhone12': { 'lcd': 3112, 'battery': 950, 'batteryTag': 1786, 'faceid': 0, 'homeButton': 0 },
    'iPhone12Mini': { 'lcd': 4856, 'battery': 900, 'batteryTag': 1736, 'faceid': 0, 'homeButton': 0 },
    'iPhone12Pro': { 'lcd': 3112, 'battery': 950, 'batteryTag': 1786, 'faceid': 0, 'homeButton': 0 },
    'iPhone12ProMax': { 'lcd': 4897, 'battery': 920, 'batteryTag': 1786, 'faceid': 0, 'homeButton': 0 },
    'iPhoneSE2': { 'lcd': 2500, 'battery': 1700, 'batteryTag': 1900, 'faceid': 0, 'homeButton': 200 }
};

document.getElementById('productName').addEventListener('change', updatePartsCost);
document.getElementById('partsName1').addEventListener('change', updatePartsCost);
document.getElementById('partsName2').addEventListener('change', updatePartsCost);

function updatePartsCost() {
    const productName = document.getElementById('productName').value;
    const partsName1 = document.getElementById('partsName1').value;
    const partsName2 = document.getElementById('partsName2').value;
    const partsCost1Input = document.getElementById('partsCost1');
    const partsCost2Input = document.getElementById('partsCost2');

    if (productName && partsName1) {
        partsCost1Input.value = partsCosts[productName][partsName1];
    } else {
        partsCost1Input.value = '';
    }

    if (productName && partsName2) {
        partsCost2Input.value = partsCosts[productName][partsName2];
    } else {
        partsCost2Input.value = '';
    }
}

document.getElementById('salesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const partsName1 = document.getElementById('partsName1').value;
    const partsName2 = document.getElementById('partsName2').value;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const partsCost1 = parseFloat(document.getElementById('partsCost1').value);
    const partsCost2 = parseFloat(document.getElementById('partsCost2').value) || 0;
    const shippingCost = parseFloat(document.getElementById('shippingCost').value);

    const totalPartsCost = partsCost1 + partsCost2;
    const totalCost = purchasePrice + totalPartsCost + shippingCost;
    const profit = sellingPrice - totalCost;
    const profitMargin = (profit / sellingPrice) * 100;

    document.getElementById('profit').textContent = profit.toFixed(2);
    document.getElementById('profitMargin').textContent = profitMargin.toFixed(2);
    document.getElementById('result').classList.remove('hidden');
});

document.getElementById('saveButton').addEventListener('click', function() {
    try {
        const productName = document.getElementById('productName').value;
        const partsName1 = document.getElementById('partsName1').value;
        const partsName2 = document.getElementById('partsName2').value;
        const profit = parseFloat(document.getElementById('profit').textContent);
        const profitMargin = document.getElementById('profitMargin').textContent;
        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
        const partsCost1 = parseFloat(document.getElementById('partsCost1').value);
        const partsCost2 = parseFloat(document.getElementById('partsCost2').value) || 0;

        const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
        const newResult = {
            id: Date.now(),
            productName,
            partsName1,
            partsName2,
            profit,
            profitMargin,
            purchasePrice,
            partsCost: partsCost1 + partsCost2
        };
        savedResults.push(newResult);
        localStorage.setItem('savedResults', JSON.stringify(savedResults));

        updateResultsList();
        updateTotals();
        alert('データが正常に保存されました。');
    } catch (error) {
        console.error('保存中にエラーが発生しました:', error);
        alert('データの保存中にエラーが発生しました。もう一度お試しください。');
    }
});
    savedResults.push(newResult);
    localStorage.setItem('savedResults', JSON.stringify(savedResults));

    updateResultsList();
    updateTotals();
});

function updateResultsList() {
    const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    savedResults.forEach(result => {
        const resultItem = document.createElement('li');
        resultItem.innerHTML = `
            ${result.productName} - ${result.partsName1}${result.partsName2 ? ', ' + result.partsName2 : ''}: 
            利益 ${result.profit.toFixed(2)}円 (${result.profitMargin}%)
            <button class="deleteButton" data-id="${result.id}">削除</button>
        `;
        resultsList.appendChild(resultItem);
    });
    
    // 削除ボタンにイベントリスナーを追加
    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            deleteResult(id);
        });
    });
}

function deleteResult(id) {
    let savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    savedResults = savedResults.filter(result => result.id != id);
    localStorage.setItem('savedResults', JSON.stringify(savedResults));
    updateResultsList();
    updateTotals();
}
document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.removeItem('savedResults');
    updateResultsList();
    updateTotals();
});

function updateTotals() {
    const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    let totalProfit = 0;
    let totalPurchase = 0;
    let totalParts = 0;

    savedResults.forEach(result => {
        totalProfit += result.profit;
        totalPurchase += result.purchasePrice;
        totalParts += result.partsCost;
    });

    document.getElementById('totalProfit').textContent = totalProfit.toFixed(2);
    document.getElementById('totalPurchase').textContent = totalPurchase.toFixed(2);
    document.getElementById('totalParts').textContent = totalParts.toFixed(2);
}

// ページ読み込み時に保存された結果を表示
window.addEventListener('load', function() {
    updateResultsList();
    updateTotals();
});
