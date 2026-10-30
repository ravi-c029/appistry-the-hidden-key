fetch('http://localhost:3000')
  .then(r => r.text())
  .then(html => {
    const matches = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)];
    console.log('CSS matches:', matches.map(m => m[1]));
    if (matches.length > 0) {
      return fetch('http://localhost:3000' + matches[0][1])
        .then(r => r.text())
        .then(css => {
          console.log('CSS length:', css.length);
          console.log('Has .flex:', css.includes('.flex'));
          console.log('Has .grid:', css.includes('.grid'));
          console.log('Has .text-white:', css.includes('.text-white'));
          console.log('Has .lg\\:grid-cols-12:', css.includes('lg:grid-cols-12') || css.includes('lg\\:grid-cols-12'));
          console.log('First 200 chars:', css.slice(0, 200));
        });
    } else {
      console.log('NO CSS LINK FOUND IN HTML!');
    }
  })
  .catch(err => console.error('Error:', err.message));
