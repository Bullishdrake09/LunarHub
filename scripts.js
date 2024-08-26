document.addEventListener("DOMContentLoaded", function() {
    // Live Discord Member Count
    fetch("https://discord.com/api/guilds/1260029061175181362/widget.json")
        .then(response => response.json())
        .then(data => {
            if (data.presence_count !== undefined) {
                document.getElementById("discord-count").textContent = data.presence_count;
            } else {
                document.getElementById("discord-count").textContent = "N/A";
            }
        })
        .catch(error => {
            console.error('Error fetching Discord data:', error);
            document.getElementById("discord-count").textContent = "Error";
        });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});