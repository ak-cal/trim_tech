// Open & Close Modals
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
}

function openEditUserModal() {
    document.getElementById('editUserModal').style.display = 'block';
}

function closeEditUserModal() {
    document.getElementById('editUserModal').style.display = 'none';
}

const showHidePassword = (signUpPass, signUpEye) => {
    const passInput = document.getElementById(signUpPass),
            eyeIcon = document.getElementById(signUpEye)

    eyeIcon.addEventListener('click', () => {
        if (passInput.type === 'password') {
            passInput.type = 'text';
            eyeIcon.classList.add('ri-eye-2-line');
            eyeIcon.classList.remove('ri-eye-close-line');
        } else {
            passInput.type = 'password';
            eyeIcon.classList.remove('ri-eye-2-line');
            eyeIcon.classList.add('ri-eye-close-line');
        }
    })
}

showHidePassword('signup-password', 'signup-eye');

document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.querySelector('.signup-form');
    const showSignUp = document.getElementById('show-signup');

    showSignUp.addEventListener('click', function(e) {
        e.preventDefault();
        signUpForm.reset();
    });
});
