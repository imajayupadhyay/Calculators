function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const loanTenureMonths = parseFloat(document.getElementById('loan-tenure').value) * 12;

    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureMonths)) /
                (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);
    const totalPayment = emi * loanTenureMonths;
    const totalInterest = totalPayment - loanAmount;

    document.getElementById('result').innerText = `Monthly EMI: ₹${emi.toFixed(2)}`;
    document.getElementById('total-payment').innerText = `Total Payment: ₹${totalPayment.toFixed(2)}`;
    document.getElementById('total-interest').innerText = `Total Interest: ₹${totalInterest.toFixed(2)}`;

    updateChart(loanAmount, totalInterest);
}

function updateChart(loanAmount, totalInterest) {
    const ctx = document.getElementById('emiChart').getContext('2d');
    if (window.emiChartInstance) {
        window.emiChartInstance.destroy();
    }
    window.emiChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Loan Amount', 'Total Interest'],
            datasets: [{
                data: [loanAmount, totalInterest],
                backgroundColor: ['#4caf50', '#f44336'],
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
                    formatter: (value) => `₹${value.toFixed(2)}`
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

document.getElementById('interest-rate').addEventListener('input', function() {
    document.getElementById('rate-label').innerText = `${this.value}%`;
});

document.getElementById('loan-tenure').addEventListener('input', function() {
    document.getElementById('tenure-label').innerText = `${this.value} Yrs`;
});

// Initial calculation
calculateEMI();