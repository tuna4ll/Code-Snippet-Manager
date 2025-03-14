function fetchSnippets() {
  fetch('/api/snippets')
    .then(response => response.json())
    .then(data => {
      displaySnippets(data.snippets);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function saveSnippet() {
  const title = document.getElementById('title').value;
  const code = document.getElementById('code').value;
  const tags = document.getElementById('tags').value.split(',');

  if (title && code) {
    const newSnippet = { title, code, tags };

    fetch('/api/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSnippet),
    })
    .then(response => {
      if (response.ok) {
        fetchSnippets(); 
      } else {
        alert('Failed to save snippet');
      }
    })
    .catch(error => console.error('Error saving snippet:', error));
  }
}

function displaySnippets(snippets) {
  const snippetsList = document.getElementById('snippets-list');
  snippetsList.innerHTML = '';

  snippets.forEach(snippet => {
    const snippetElement = document.createElement('div');
    snippetElement.classList.add('snippet');
    snippetElement.innerHTML = `
      <div class="title">${snippet.title}</div>
      <div class="tags">Tags: ${snippet.tags.join(', ')}</div>
      <div class="code">${snippet.code}</div>
    `;
    snippetsList.appendChild(snippetElement);
  });
}

window.onload = fetchSnippets;
