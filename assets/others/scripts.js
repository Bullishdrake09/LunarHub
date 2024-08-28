document.addEventListener("DOMContentLoaded", function() {
    // Fetch Live Discord Member Count
    const fetchDiscordMemberCount = () => {
        fetch("https://discord.com/api/guilds/1260029061175181362/widget.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const count = data.presence_count !== undefined ? data.presence_count : 0;
                animateMemberCount(count);
            })
            .catch(error => {
                console.error('Error fetching Discord data:', error);
                document.getElementById("discord-count").textContent = "Error";
            });
    };

    // Typewriter Effect for Member Count
    const animateMemberCount = (count) => {
        const displayElement = document.getElementById("discord-count");
        let currentCount = 0;
        const step = Math.ceil(count / 500); // Slower increment

        const updateCount = () => {
            if (currentCount < count) {
                currentCount += step;
                if (currentCount > count) {
                    currentCount = count;
                }
                displayElement.textContent = currentCount;
                setTimeout(updateCount, 100); // Slower update interval
            }
        };

        updateCount();
    };

    fetchDiscordMemberCount();

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Matrix Effect
    const initializeMatrixEffect = () => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1'; // Ensure it stays in the background
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();

        const columns = Math.floor(canvas.width / 20); // Adjust the column size
        const rainDrops = Array.from({ length: columns }).fill(1);

        const matrixEffect = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#8E2DE2'; // Matrix color
            ctx.font = '20px monospace';

            rainDrops.forEach((y, index) => {
                const text = String.fromCharCode(Math.random() * 128);
                const x = index * 20; // Adjust the x-spacing
                ctx.fillText(text, x, y);
                if (y > canvas.height && Math.random() > 0.975) {
                    rainDrops[index] = 0; // Reset to the top of the screen
                } else {
                    rainDrops[index] += 20; // Adjust the speed
                }
            });
        };

        setInterval(matrixEffect, 50);

        window.addEventListener('resize', () => {
            setCanvasSize();
        });
    };

    initializeMatrixEffect();
});
