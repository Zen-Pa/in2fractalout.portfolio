async function loadMarkdown() {
    try {
        // Fetch the markdown file
        const response = await fetch('CV.md'); // Adjust path if needed
        if (!response.ok) throw new Error('Failed to load content');

        // Read text from file
        const text = await response.text();

        // Convert simple Markdown to HTML (Basic only)
        const htmlContent = text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')  // Convert # Heading
            .replace(/^## (.*$)/gim, '<h2>$1</h2>') // Convert ## Subheading
            .replace(/^### (.*$)/gim, '<h3>$1</h3>') // Convert ### Sub-subheading
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>') // Bold **text**
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')  // Italic *text*
            .replace(/\n/g, '<br>'); // New lines

        // Inject into the HTML page
        document.getElementById("markdown-container").innerHTML = htmlContent;
    } catch (error) {
        console.error('Error loading markdown:', error);
    }
}

// Load markdown when the page loads
window.addEventListener("DOMContentLoaded", loadMarkdown);
