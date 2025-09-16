// Roll history storage (session-based, future-proof for persistence)
let rollHistory = [];
const MAX_HISTORY_ENTRIES = 50;

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
    let rollData = {
        timestamp: new Date(),
        configuration: [],
        results: [],
        grandTotal: 0
    };

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
            let groupResults = [];

            for (let i = 0; i < count; i++) {
                const roll = rollDie(diceType.sides);
                groupTotal += roll;
                groupResults.push(roll);

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

            // Store roll data for history
            rollData.configuration.push({ count, diceType: diceType.name, sides: diceType.sides, inputId: diceType.inputId });
            rollData.results.push({ diceType: diceType.name, results: groupResults, total: groupTotal });
        }
    });

    if (hasAnyDice) {
        // Check if grand total should be shown
        const showGrandTotal = document.getElementById('show-grand-total').checked;
        if (showGrandTotal) {
            const grandTotalDiv = document.createElement('div');
            grandTotalDiv.className = 'grand-total';
            grandTotalDiv.textContent = `🎯 Grand Total: ${grandTotal} 🎯`;
            resultsDiv.appendChild(grandTotalDiv);
        }

        // Complete roll data and add to history
        rollData.grandTotal = grandTotal;
        addToHistory(rollData);
        updateHistoryDisplay();
    } else {
        resultsDiv.innerHTML = '<div class="grand-total">Please select some dice to roll!</div>';
    }
}

// History management functions
function addToHistory(rollData) {
    rollHistory.unshift(rollData); // Add to beginning of array

    // Keep only the last MAX_HISTORY_ENTRIES
    if (rollHistory.length > MAX_HISTORY_ENTRIES) {
        rollHistory = rollHistory.slice(0, MAX_HISTORY_ENTRIES);
    }
}

function clearHistory(event) {
    event.stopPropagation(); // Prevent toggle from firing
    if (confirm('Are you sure you want to clear the roll history?')) {
        rollHistory = [];
        updateHistoryDisplay();
    }
}

function toggleHistory() {
    const sidebar = document.getElementById('history-sidebar');
    const overlay = document.getElementById('history-overlay');

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    } else {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }
}

function rerollConfiguration(configIndex) {
    const config = rollHistory[configIndex];
    if (!config) return;

    // Reset all inputs to 0
    const diceTypes = ['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
    diceTypes.forEach(inputId => {
        document.getElementById(inputId).value = 0;
    });

    // Set values from configuration
    config.configuration.forEach(dice => {
        document.getElementById(dice.inputId).value = dice.count;
    });

    // Roll with the new configuration
    rollAllDice();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');

    if (rollHistory.length === 0) {
        historyList.innerHTML = '<p class="no-history">No rolls yet. Start rolling to see your history!</p>';
        return;
    }

    historyList.innerHTML = rollHistory.map((roll, index) => {
        const timestamp = roll.timestamp.toLocaleTimeString();
        const configText = roll.configuration.map(c => `${c.count}×${c.diceType}`).join(', ');

        const detailsHtml = roll.results.map(group => {
            const resultsHtml = group.results.map(result =>
                `<span class="history-die">${result}</span>`
            ).join('');

            return `
                <div class="history-dice-group">
                    <strong>${group.diceType}:</strong> ${group.total}
                    <div class="history-dice-results">${resultsHtml}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="history-item">
                <div class="history-header-info">
                    <div class="history-timestamp">${timestamp}</div>
                    <div class="history-config">${configText}</div>
                    <div class="history-total">Total: ${roll.grandTotal}</div>
                </div>
                <div class="history-details">${detailsHtml}</div>
                <div class="history-actions">
                    <button class="reroll-btn" onclick="rerollConfiguration(${index})">🎲 Re-roll</button>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize history display on page load
function initializeHistory() {
    // Sidebar starts closed by default (CSS handles this)
    updateHistoryDisplay();
}

// Initialize app on page load without auto-rolling
window.onload = function() {
    initializeHistory();
};