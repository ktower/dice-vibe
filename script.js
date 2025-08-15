function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollAllDice() {
    const diceTypes = [
        { sides: 2, inputId: 'd2', name: 'D2' },
        { sides: 4, inputId: 'd4', name: 'D4' },
        { sides: 6, inputId: 'd6', name: 'D6' },
        { sides: 8, inputId: 'd8', name: 'D8' },
        { sides: 10, inputId: 'd10', name: 'D10' },
        { sides: 12, inputId: 'd12', name: 'D12' },
        { sides: 20, inputId: 'd20', name: 'D20' },
        { sides: 100, inputId: 'd100', name: 'D100' }
    ];

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    let grandTotal = 0;
    let hasAnyDice = false;

    diceTypes.forEach(diceType => {
        const count = parseInt(document.getElementById(diceType.inputId).value) || 0;
        
        if (count > 0) {
            hasAnyDice = true;
            const groupDiv = document.createElement('div');
            groupDiv.className = 'dice-group';

            const title = document.createElement('h3');
            title.textContent = `${count} × ${diceType.name}`;
            groupDiv.appendChild(title);

            const diceContainer = document.createElement('div');
            diceContainer.className = 'dice-container';

            let groupTotal = 0;

            for (let i = 0; i < count; i++) {
                const roll = rollDie(diceType.sides);
                groupTotal += roll;

                const dieDiv = document.createElement('div');
                dieDiv.className = 'die';
                dieDiv.textContent = roll;
                diceContainer.appendChild(dieDiv);
            }

            groupDiv.appendChild(diceContainer);

            const totalDiv = document.createElement('div');
            totalDiv.className = 'total';
            totalDiv.textContent = `Total: ${groupTotal}`;
            groupDiv.appendChild(totalDiv);

            resultsDiv.appendChild(groupDiv);
            grandTotal += groupTotal;
        }
    });

    if (hasAnyDice) {
        const grandTotalDiv = document.createElement('div');
        grandTotalDiv.className = 'grand-total';
        grandTotalDiv.textContent = `🎯 Grand Total: ${grandTotal} 🎯`;
        resultsDiv.appendChild(grandTotalDiv);
    } else {
        resultsDiv.innerHTML = '<div class="grand-total">Please select some dice to roll!</div>';
    }
}

// Roll dice on page load with default values
window.onload = function() {
    rollAllDice();
};