
function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
    const rateOfReturn = parseFloat(document.getElementById('rate-of-return').value) / 100 / 12;
    const investmentPeriod = parseFloat(document.getElementById('investment-period').value) * 12;

    const futureValue = monthlyInvestment * ((Math.pow(1 + rateOfReturn, investmentPeriod) - 1) / rateOfReturn) * (1 + rateOfReturn);
    const investedAmount = monthlyInvestment * investmentPeriod;
    const estimatedReturns = futureValue - investedAmount;

    document.getElementById('result').innerText = `Total Value: ₹${futureValue.toFixed(2)}`;
    document.getElementById('invested-amount').innerText = `Invested Amount: ₹${investedAmount.toFixed(2)}`;
    document.getElementById('estimated-return').innerText = `Profit: ₹${estimatedReturns.toFixed(2)}`;

    updateChart(investedAmount, estimatedReturns);
}

function updateChart(investedAmount, estimatedReturns) {
    const ctx = document.getElementById('sipChart').getContext('2d');
    if (window.sipChartInstance) {
        window.sipChartInstance.destroy();
    }
    window.sipChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Invested Amount', 'Profit'],
            datasets: [{
                data: [investedAmount, estimatedReturns],
                backgroundColor: ['#ff7f0e', '#1f77b4'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    },
                    formatter: (value, context) => `₹${value.toFixed(2)}`
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        },
        plugins: [ChartDataLabels]
    });
}

document.getElementById('investment-period').addEventListener('input', function() {
    document.getElementById('period-label').innerText = `${this.value} Yrs`;
});

document.getElementById('rate-of-return').addEventListener('input', function() {
    document.getElementById('rate-label').innerText = `${this.value}%`;
});

// Initial calculation
calculateSIP();
