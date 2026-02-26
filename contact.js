const forminit = new Forminit();
const FORM_ID = "bs6pmzhb9md"; //ID

const form = document.getElementById("contact-form");
const formResult = document.getElementById("form-result");

//on button click this happens
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-btn")
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Sending..."
    submitBtn.disabled = true;

    formResult.textContent = "";
    const oldErrors = form.querySelectorAll(".input-error");
    oldErrors.forEach(err => err.remove());

    let hasError = false;

    const firstName = form.querySelector("[name='fi-sender-firstName']");
    const lastName = form.querySelector("[name='fi-sender-lastName']");
    const email = form.querySelector("[name='fi-sender-email']");
    const message = form.querySelector("[name='fi-text-message']");

    if (firstName.value.length < 2) {
        showError(firstName, "First name must be at least 2 characters.");
        hasError = true;
    }

    if (lastName.value.length < 2) {
        showError(firstName, "Last name must be at least 2 characters.");
        hasError = true;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email.value)) {
        showError(email, "Please enter a valid enail.");
        hasError = true;
    }

    if (message.value.trim() === "") {
        showError(message, "Message cannot be empty.");
        hasError = true;
    }

    if (hasError) {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        return;
    }

    const formData = new FormData(form);

    try {
        const result = await forminit.submit(FORM_ID, formData);

        if (result.error) {
            formResult.textContent = "Server error, please try again later.";
        }
        else {
            formResult.style.color = "green";
            formResult.textContent = "Message sent successfully!";
            form.reset();

            const buttonmusic = new Audio("ButtonSound.mp3");
            buttonmusic.volume = 0.5;

            let wasMusicPlaying = false;
            if (musicEnabled && !music.paused) {
                wasMusicPlaying = true;
                music.pause();
            }

            buttonmusic.play().catch(() => {
               console.log("music autoplay blocked");
            });

            buttonmusic.addEventListener("ended", () => {
                 if (wasMusicPlaying) {
                    music.play().catch(() => { });
                }
            });
        }
    }
    catch (err) {
        formResult.textContent = "Failed to send message. Check your internet connection.";
    }   finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

//error handler function
function showError(input, msg) {
    const div = document.createElement("div");
    div.className = "input-error";
    div.style.color = "red";
    div.style.fontSize = "0.9rem";
    div.textContent = msg;
    input.insertAdjacentElement("afterend", div);
}