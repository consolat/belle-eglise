document.addEventListener('DOMContentLoaded', function () {

    const iconsBtn = document.querySelector(".icons_button");
    const hamburgerIcon = document.querySelector(".hamburger_icon");
    const closeIcon = document.querySelector(".close_icon");
    
    const mobileNav = document.querySelector(".mobile-nav");
    const body = document.body;
    const navItems = document.querySelectorAll('.nav_item');
    const logo = document.querySelector(".logo");
    const navOverlay = document.querySelector(".nav_overlay");

    ///Menu 
    function openMenu() {
        mobileNav.classList.add("active");
        navOverlay.classList.add("active");

        hamburgerIcon.style.display = "none";
        closeIcon.style.display = "block";
        logo.style.display = "none";
        body.style.overflow = "hidden";
    }

    function closeMenu() {
        mobileNav.classList.remove("active");
        navOverlay.classList.remove("active");

        hamburgerIcon.style.display = "block";
        closeIcon.style.display = "none";
        logo.style.display = "block";
        body.style.overflow = "auto";
    }

    if (iconsBtn) {
        // When user clicks 
        iconsBtn.addEventListener("click", function () {
            if (!mobileNav.classList.contains("active")) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        //Close when user click on overlay
        navOverlay.addEventListener('click', closeMenu);

        // Close when clicking nav items
        navItems.forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains("active")) {
                closeMenu();
            }
        });
    }

    //Using Iframe to display video
    const videoLinks = document.querySelectorAll(".es-channel-button .video-card");

    videoLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // prevent opening YouTube

            const videoID = "RRgeB_GLalU"; // your YouTube video ID
            const iframe = document.createElement("iframe");

            iframe.src = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.width = "100%";
            iframe.style.height = "100%";

            // Remove thumbnail and play button
            link.innerHTML = "";
            link.appendChild(iframe);
        });
    });


});