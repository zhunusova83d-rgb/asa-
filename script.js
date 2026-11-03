const registration = document.querySelector("#registration");

if (registration) {
    const success = document.querySelector("#success");
    const userInfo = document.querySelector("#userInfo");

    function showError(field, message) {
        const group = field.closest(".form-group");
        if (!group) return;

        group.querySelector(".error").textContent = message;

        const input = field.matches('input[type="radio"]')
            ? group.querySelectorAll('input[type="radio"]')
            : [field];

        input.forEach(element => {
            element.classList.toggle("invalid", Boolean(message));
        });
    }

    function validateText(id, label, minLength = 2) {
        const field = document.querySelector("#" + id);
        const value = field.value.trim();

        if (!value) {
            showError(field, "Заполните это поле");
            return false;
        }

        if (value.length < minLength) {
            showError(field, `Минимум ${minLength} символа`);
            return false;
        }

        showError(field, "");
        return true;
    }

    function validateEmail() {
        const field = document.querySelector("#email");

        if (!field.value.trim()) {
            showError(field, "Введите электронную почту");
            return false;
        }

        if (!field.validity.valid) {
            showError(field, "Введите правильный адрес почты");
            return false;
        }

        showError(field, "");
        return true;
    }

    function validatePassword() {
        const field = document.querySelector("#password");
        const password = field.value;

        if (password.length < 8) {
            showError(field, "Пароль должен содержать минимум 8 символов");
            return false;
        }

        if (!/[A-ZА-ЯЁ]/.test(password)) {
            showError(field, "Добавьте хотя бы одну заглавную букву");
            return false;
        }

        if (!/[0-9]/.test(password)) {
            showError(field, "Добавьте хотя бы одну цифру");
            return false;
        }

        showError(field, "");
        return true;
    }

    function validateConfirmPassword() {
        const field = document.querySelector("#confirmPassword");
        const password = document.querySelector("#password").value;

        if (!field.value) {
            showError(field, "Повторите пароль");
            return false;
        }

        if (field.value !== password) {
            showError(field, "Пароли не совпадают");
            return false;
        }

        showError(field, "");
        return true;
    }

    function validateRequired(id) {
        const field = document.querySelector("#" + id);

        if (!field.value) {
            showError(field, "Выберите вариант");
            return false;
        }

        showError(field, "");
        return true;
    }

    function validateAgreement() {
        const field = document.querySelector("#agreement");

        if (!field.checked) {
            showError(field, "Необходимо согласиться с условиями");
            return false;
        }

        showError(field, "");
        return true;
    }

    function validateMystery() {
        const group = document.querySelector('input[name="mystery"]').closest(".form-group");
        const selected = document.querySelector('input[name="mystery"]:checked');

        group.querySelector(".error").textContent =
            selected ? "" : "Выберите интересующую загадку";

        return Boolean(selected);
    }

    registration.addEventListener("submit", function(event) {
        event.preventDefault();

        const valid =
            validateText("name", "Имя") &
            validateText("surname", "Фамилия") &
            validateEmail() &
            validatePassword() &
            validateConfirmPassword() &
            validateRequired("birthdate") &
            validateAgreement() &
            validateRequired("era") &
            validateRequired("civilization") &
            validateMystery();

        if (!valid) {
            const firstError = registration.querySelector(".invalid");
            if (firstError) firstError.focus();
            return;
        }

        const name = document.querySelector("#name").value.trim();
        const surname = document.querySelector("#surname").value.trim();
        const email = document.querySelector("#email").value.trim();
        const era = document.querySelector("#era").value;
        const civilization = document.querySelector("#civilization").value;
        const mystery = document.querySelector('input[name="mystery"]:checked').value;

        function escapeHTML(value) {
            return value.replace(/[&<>"']/g, character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            })[character]);
        }

        userInfo.innerHTML = `
            <p><strong>Имя:</strong> ${escapeHTML(name)} ${escapeHTML(surname)}</p>
            <p><strong>Почта:</strong> ${escapeHTML(email)}</p>
            <p><strong>Эпоха:</strong> ${escapeHTML(era)}</p>
            <p><strong>Цивилизация:</strong> ${escapeHTML(civilization)}</p>
            <p><strong>Интересующая загадка:</strong> ${escapeHTML(mystery)}</p>
        `;

        registration.hidden = true;
        success.hidden = false;

        success.scrollIntoView({ behavior: "smooth" });
    });

    // Убираем сообщение об ошибке при изменении поля
    registration.querySelectorAll("input, select").forEach(field => {
        field.addEventListener("input", () => {
            const group = field.closest(".form-group");
            if (group) {
                group.querySelector(".error").textContent = "";
                group.querySelectorAll(".invalid").forEach(item => {
                    item.classList.remove("invalid");
                });
            }
        });

        field.addEventListener("change", () => {
            const group = field.closest(".form-group");
            if (group) {
                group.querySelector(".error").textContent = "";
            }
        });
    });
}