const partsCosts = {
    'iPhone6s': { 'lcd': 1600, 'battery': 1500, 'batteryTag': 0, 'faceidTag': 0, 'housing': 0 },
    'iPhone7': { 'lcd': 1900, 'battery': 1700, 'batteryTag': 0, 'faceidTag': 0, 'housing': 0 },
    'iPhone8': { 'lcd': 2500, 'battery': 1700, 'batteryTag': 0, 'faceidTag': 0, 'housing': 0 },
    'iPhoneX': { 'lcd': 2500, 'battery': 1300, 'batteryTag': 1500, 'faceidTag': 1000, 'housing': 2600 },
    'iPhoneXS': { 'lcd': 2700, 'battery': 1400, 'batteryTag': 1600, 'faceidTag': 1100, 'housing': 2800 },
    'iPhoneXSMax': { 'lcd': 3000, 'battery': 1500, 'batteryTag': 1700, 'faceidTag': 1200, 'housing': 3000 },
    'iPhoneXR': { 'lcd': 2300, 'battery': 1300, 'batteryTag': 1500, 'faceidTag': 1000, 'housing': 2500 },
    'iPhone11': { 'lcd': 2500, 'battery': 1400, 'batteryTag': 1600, 'faceidTag': 1100, 'housing': 2700 },
    'iPhone11Pro': { 'lcd': 2800, 'battery': 1500, 'batteryTag': 1700, 'faceidTag': 1200, 'housing': 2900 },
    'iPhone11ProMax': { 'lcd': 3100, 'battery': 1600, 'batteryTag': 1800, 'faceidTag': 1300, 'housing': 3100 },
    'iPhone12': { 'lcd': 3000, 'battery': 1600, 'batteryTag': 1800, 'faceidTag': 1300, 'housing': 3000 },
    'iPhone12Mini': { 'lcd': 2800, 'battery': 1500, 'batteryTag': 1700, 'faceidTag': 1200, 'housing': 2800 },
    'iPhone12Pro': { 'lcd': 3200, 'battery': 1700, 'batteryTag': 1900, 'faceidTag': 1400, 'housing': 3200 },
    'iPhone12ProMax': { 'lcd': 3400, 'battery': 1800, 'batteryTag': 2000, 'faceidTag': 1500, 'housing': 3400 }
};

document.getElementById('productName').addEventListener('change', updatePartsCost);
document.getElementById('partsName').addEventListener('change', updatePartsCost);

function updatePartsCost() {
    const productName = document.getElementById('productName').value;
    const partsName = document.getElementById('partsName').value;
    const partsCostInput = document.getElementById('partsCost');

    if (productName && partsName) {
        partsCostInput.value = partsCosts[productName][partsName];
    } else {
        partsCostInput.value = '';
    }
}

document.getElementById('salesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const partsName = document.getElementById('partsName').value;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const partsCost = parseFloat(document.getElementById('partsCost').value);
    const shippingCost = 210; // 固定送料

    const totalCost = purchasePrice + partsCost + shippingCost;
    const revenue = sellingPrice - totalCost;
    const commission = sellingPrice * 0.1; // 10% fixed commission
    const profit = revenue - commission;
    const profitMargin = (profit / sellingPrice) * 100;

    document.getElementById('profit').textContent = profit.toFixed(2);
    document.getElementById('profitMargin').textContent = profitMargin.toFixed(2);
    document.getElementById('result').classList.remove('hidden');
});

document.getElementById('saveButton').addEventListener('click', function() {
    const productName = document.getElementById('productName').value;
    const partsName = document.getElementById('partsName').value;
    const profit = document.getElementById('profit').textContent;
    const profitMargin = document.getElementById('profitMargin').textContent;

    const resultItem = document.createElement('li');
    resultItem.textContent = `${productName} - ${partsName}: 利益 ${profit}円 (${profitMargin}%)`;
    document.getElementById('resultsList').appendChild(resultItem);

    // LocalStorageに保存
    const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    savedResults.push({
        productName,
        partsName,
        profit,
        profitMargin
    });
    localStorage.setItem('savedResults', JSON.stringify(savedResults));
});

// 保存された結果を読み込む
function loadSavedResults() {
    const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    savedResults.forEach(result => {
        const resultItem = document.createElement('li');
        resultItem.textContent = `${result.productName} - ${result.partsName}: 利益 ${result.profit}円 (${result.profitMargin}%)`;
        resultsList.appendChild(resultItem);
    });
}

// ページ読み込み時に保存された結果を表示
window.addEventListener('load', loadSavedResults);
