const editor = document.getElementById('editor');

// Load the text if it exists
const docId = window.location.pathname.slice(1); // Get document ID from the URL path
if (docId) {
    fetch(`/doc/${docId}`)
        .then(response => response.json())
        .then(data => {
            editor.value = data.text;
        });
}

// Save the text on input
editor.addEventListener('input', () => {
    fetch(`/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: editor.value })
    })
    .then(response => response.json())
    .then(data => {
        if (!docId) {
            history.pushState({}, '', `/${data.id}`);
        }
    });
});
