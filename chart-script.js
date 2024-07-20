function updateChart() {
    const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    const monthlyData = {};

    savedResults.forEach(result => {
        const date = new Date(result.id);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = { profit: 0, count: 0 };
        }
        
        monthlyData[monthYear].profit += result.profit;
        monthlyData[monthYear].count += 1;
    });

    const labels = Object.keys(monthlyData).sort();
    const profitData = labels.map(month => monthlyData[month].profit);
    const countData = labels.map(month => monthlyData[month].count);

    const ctx = document.getElementById('monthlyChart').getContext('2d');
    
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '月別利益',
                data: profitData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                yAxisID: 'y-axis-1',
            }, {
                label: '月別件数',
                data: countData,
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                yAxisID: 'y-axis-2',
            }]
        },
        options: {
            scales: {
                'y-axis-1': {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: '利益 (円)'
                    }
                },
                'y-axis-2': {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: '件数'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            responsive: true,
            title: {
                display: true,
                text: '月別利益と件数'
            }
        }
    });
}