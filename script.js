// Constants and configuration
const DICE_TYPES = [
    { sides: 2, inputId: 'd2', name: 'D2' },
    { sides: 4, inputId: 'd4', name: 'D4' },
    { sides: 6, inputId: 'd6', name: 'D6' },
    { sides: 8, inputId: 'd8', name: 'D8' },
    { sides: 10, inputId: 'd10', name: 'D10' },
    { sides: 12, inputId: 'd12', name: 'D12' },
    { sides: 20, inputId: 'd20', name: 'D20' },
    { sides: 100, inputId: 'd100', name: 'D100' }
];

// Roll history storage (session-based, future-proof for persistence)
let rollHistory = [];
const MAX_HISTORY_ENTRIES = 50;

// DOM elements cache
let domElements = {};

function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function validateDiceInput(count) {
    const num = parseInt(count, 10);
    return isNaN(num) ? 0 : Math.max(0, Math.min(50, num));
}

function createDiceElement(value) {
    const dieDiv = document.createElement('div');
    dieDiv.className = 'die';
    dieDiv.textContent = value;
    dieDiv.setAttribute('aria-label', `Rolled ${value}`);
    return dieDiv;
}

function createDiceGroup(diceType, count, results, total) {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'dice-group';
    groupDiv.setAttribute('aria-labelledby', `group-title-${diceType.inputId}`);

    const title = document.createElement('h3');
    title.id = `group-title-${diceType.inputId}`;
    title.textContent = `${count} × ${diceType.name}`;
    groupDiv.appendChild(title);

    const diceContainer = document.createElement('div');
    diceContainer.className = 'dice-container';
    diceContainer.setAttribute('aria-label', `${diceType.name} dice results`);

    const diceFragment = document.createDocumentFragment();
    results.forEach(result => {
        diceFragment.appendChild(createDiceElement(result));
    });
    diceContainer.appendChild(diceFragment);

    groupDiv.appendChild(diceContainer);

    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.textContent = `Total: ${total}`;
    totalDiv.setAttribute('aria-label', `${diceType.name} total: ${total}`);
    groupDiv.appendChild(totalDiv);

    return groupDiv;
}

function rollAllDice() {
    const resultsDiv = domElements.results;
    resultsDiv.innerHTML = '';

    let grandTotal = 0;
    let hasAnyDice = false;
    const rollData = {
        timestamp: new Date(),
        configuration: [],
        results: [],
        grandTotal: 0
    };

    const fragment = document.createDocumentFragment();

    DICE_TYPES.forEach(diceType => {
        const input = domElements[diceType.inputId];
        const count = validateDiceInput(input.value);

        if (count > 0) {
            hasAnyDice = true;
            let groupTotal = 0;
            const groupResults = [];

            // Roll all dice for this group
            for (let i = 0; i < count; i++) {
                const roll = rollDie(diceType.sides);
                groupTotal += roll;
                groupResults.push(roll);
            }

            // Create dice group element
            const groupDiv = createDiceGroup(diceType, count, groupResults, groupTotal);
            fragment.appendChild(groupDiv);

            grandTotal += groupTotal;

            // Store roll data for history
            rollData.configuration.push({
                count,
                diceType: diceType.name,
                sides: diceType.sides,
                inputId: diceType.inputId
            });
            rollData.results.push({
                diceType: diceType.name,
                results: groupResults,
                total: groupTotal
            });
        }
    });

    resultsDiv.appendChild(fragment);

    if (hasAnyDice) {
        // Check if grand total should be shown
        if (domElements.showGrandTotal.checked) {
            const grandTotalDiv = document.createElement('div');
            grandTotalDiv.className = 'grand-total';
            grandTotalDiv.textContent = `🎯 Grand Total: ${grandTotal} 🎯`;
            grandTotalDiv.setAttribute('aria-label', `Grand total: ${grandTotal}`);
            resultsDiv.appendChild(grandTotalDiv);
        }

        // Complete roll data and add to history
        rollData.grandTotal = grandTotal;
        addToHistory(rollData);
        updateHistoryDisplay();
    } else {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'grand-total';
        messageDiv.textContent = 'Please select some dice to roll!';
        resultsDiv.appendChild(messageDiv);
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
    const { historySidebar, historyOverlay, historyToggleBtn } = domElements;
    const isOpen = historySidebar.classList.contains('open');

    if (isOpen) {
        historySidebar.classList.remove('open');
        historyOverlay.classList.remove('active');
        historyToggleBtn.setAttribute('aria-expanded', 'false');
        historyToggleBtn.setAttribute('aria-label', 'Open roll history');
    } else {
        historySidebar.classList.add('open');
        historyOverlay.classList.add('active');
        historyToggleBtn.setAttribute('aria-expanded', 'true');
        historyToggleBtn.setAttribute('aria-label', 'Close roll history');
        // Focus the first interactive element in sidebar
        const firstButton = historySidebar.querySelector('button');
        if (firstButton) firstButton.focus();
    }
}

function rerollConfiguration(configIndex) {
    const config = rollHistory[configIndex];
    if (!config) return;

    // Reset all inputs to 0
    DICE_TYPES.forEach(diceType => {
        domElements[diceType.inputId].value = 0;
    });

    // Set values from configuration
    config.configuration.forEach(dice => {
        const input = domElements[dice.inputId];
        if (input) {
            input.value = dice.count;
        }
    });

    // Roll with the new configuration
    rollAllDice();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createHistoryItem(roll, index) {
    const timestamp = roll.timestamp.toLocaleTimeString();
    const configText = roll.configuration.map(c => `${c.count}×${c.diceType}`).join(', ');

    const detailsHtml = roll.results.map(group => {
        const resultsHtml = group.results.map(result =>
            `<span class="history-die" aria-label="Die result ${result}">${escapeHtml(String(result))}</span>`
        ).join('');

        return `
            <div class="history-dice-group">
                <strong>${escapeHtml(group.diceType)}:</strong> ${escapeHtml(String(group.total))}
                <div class="history-dice-results" role="list" aria-label="${escapeHtml(group.diceType)} dice results">${resultsHtml}</div>
            </div>
        `;
    }).join('');

    return `
        <div class="history-item" role="listitem">
            <div class="history-header-info">
                <div class="history-timestamp">${escapeHtml(timestamp)}</div>
                <div class="history-config">${escapeHtml(configText)}</div>
                <div class="history-total">Total: ${escapeHtml(String(roll.grandTotal))}</div>
            </div>
            <div class="history-details">${detailsHtml}</div>
            <div class="history-actions">
                <button class="reroll-btn" data-config-index="${index}" aria-label="Re-roll configuration: ${escapeHtml(configText)}">🎲 Re-roll</button>
            </div>
        </div>
    `;
}

function updateHistoryDisplay() {
    const { historyList } = domElements;

    if (rollHistory.length === 0) {
        historyList.innerHTML = '<p class="no-history">No rolls yet. Start rolling to see your history!</p>';
        return;
    }

    const historyHtml = rollHistory.map(createHistoryItem).join('');
    historyList.innerHTML = `<div role="list" aria-label="Roll history">${historyHtml}</div>`;

    // Add event listeners for re-roll buttons
    historyList.querySelectorAll('.reroll-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-config-index'), 10);
            if (!isNaN(index)) {
                rerollConfiguration(index);
            }
        });
    });
}

// Cache DOM elements for performance
function cacheDOMElements() {
    domElements = {
        results: document.getElementById('results'),
        showGrandTotal: document.getElementById('show-grand-total'),
        historySidebar: document.getElementById('history-sidebar'),
        historyOverlay: document.getElementById('history-overlay'),
        historyToggleBtn: document.getElementById('history-toggle-btn'),
        historyList: document.getElementById('history-list'),
        rollButton: document.querySelector('.roll-button'),
        clearHistoryBtn: document.querySelector('.clear-history-btn'),
        closeSidebarBtn: document.querySelector('.close-sidebar-btn')
    };

    // Cache dice input elements
    DICE_TYPES.forEach(diceType => {
        domElements[diceType.inputId] = document.getElementById(diceType.inputId);
    });
}

// Add event listeners
function addEventListeners() {
    // Roll button
    domElements.rollButton.addEventListener('click', rollAllDice);

    // History controls
    domElements.historyToggleBtn.addEventListener('click', toggleHistory);
    domElements.closeSidebarBtn.addEventListener('click', toggleHistory);
    domElements.historyOverlay.addEventListener('click', toggleHistory);
    domElements.clearHistoryBtn.addEventListener('click', clearHistory);

    // Keyboard navigation for sidebar
    domElements.historySidebar.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleHistory();
            domElements.historyToggleBtn.focus();
        }
    });

    // Input validation
    DICE_TYPES.forEach(diceType => {
        const input = domElements[diceType.inputId];
        input.addEventListener('input', (e) => {
            const value = validateDiceInput(e.target.value);
            if (value !== parseInt(e.target.value, 10)) {
                e.target.value = value;
            }
        });
    });
}

// Initialize history display on page load
function initializeHistory() {
    updateHistoryDisplay();
}

// Initialize app on page load without auto-rolling
function initializeApp() {
    cacheDOMElements();
    addEventListeners();
    initializeHistory();
}

// Use DOMContentLoaded for better performance
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}