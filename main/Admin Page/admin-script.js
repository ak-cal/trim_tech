function setActive(element) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
}

function checkSidebarCollapse() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        
        sidebar.style.transition = 'none';
        
        setTimeout(() => {
            sidebar.style.transition = '';
        }, 100);
    } else {
        sidebar.classList.remove('collapsed');
    }
}

function closeSidebarOnClickOutside(event) {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !event.target.matches('.toggle-btn')) {
        sidebar.classList.add('collapsed');
    }
}

window.addEventListener('load', checkSidebarCollapse);
window.addEventListener('resize', checkSidebarCollapse);
document.addEventListener('click', closeSidebarOnClickOutside);