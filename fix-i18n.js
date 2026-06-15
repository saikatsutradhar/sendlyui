const fs = require('fs');
const path = require('path');
const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Pattern matches something like >Text" data-i18n="key"</a>
    content = content.replace(/(<[^>]+?)>([^<]*?)\"\s*data-i18n=\"([^\"]+)\"([^<]*?)(<\/[^>]+>)/g, (match, openTag, textBefore, key, textAfter, closeTag) => {
        if (openTag.includes('data-i18n=')) {
            // Tag already has data-i18n, just remove the duplicate text
            return openTag + '>' + textBefore + textAfter + closeTag;
        } else {
            // Move data-i18n into the tag
            return openTag + ' data-i18n=\"' + key + '\">' + textBefore + textAfter + closeTag;
        }
    });

    // Also some might end at line breaks or just be floating if the regex didn't catch it
    // Another pattern: " data-i18n="something" inside text nodes where the regex didn't perfectly match
    // For example inside h1 tags: <h1 class="page-title">Terms & Privacy" data-i18n="terms.title"</h1>
    // The previous regex catches it perfectly if there's an opening tag before it.
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Processed', file);
});
