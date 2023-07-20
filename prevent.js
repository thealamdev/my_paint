
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});


function disableCtrlUandCtrlShiftI() {
    document.addEventListener('keydown', function (e) {
        // Disable Ctrl+U and Ctrl+Shift+I
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I')) {
            e.preventDefault();
        }
    });
}

// Check if the event listener was already set in the session
if (!sessionStorage.getItem('ctrlUandCtrlShiftIDisabled')) {
    disableCtrlUandCtrlShiftI();

    // Set a flag in the session storage to indicate that the event listener was added
    sessionStorage.setItem('ctrlUandCtrlShiftIDisabled', 'true');
}

// Reapply the event listener if the user tries to leave the page (refresh or close)
window.addEventListener('beforeunload', function () {
    sessionStorage.removeItem('ctrlUandCtrlShiftIDisabled');

});

