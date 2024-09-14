
document.querySelectorAll('.form-control').forEach(function (element) {
    element.addEventListener('focus', handleEvent);
    element.addEventListener('blur', handleEvent);
    element.addEventListener('change', handleEvent);

    // Trigger 'blur' event manually for each element initially
    element.dispatchEvent(new Event('blur'));
});

function handleEvent(e) {
    const currEl = e.target;
    const parentFormGroup = currEl.closest('.form-group');

    console.log({ currEl });

    if (currEl.tagName.toLowerCase() === 'select') {
        const firstOptionValue = currEl.querySelector('option:first-child').value;
        if (currEl.value === firstOptionValue) {
            const controlLabel = parentFormGroup.querySelector('.control-label');
            if (controlLabel) {
                controlLabel.style.transition = 'opacity 240ms';
                controlLabel.style.opacity = 0;
            }
            parentFormGroup.classList.remove('focused');
        } else {
            const controlLabel = parentFormGroup.querySelector('.control-label');
            if (controlLabel) {
                controlLabel.style.opacity = 1;
            }
            const isFocused = (e.type === 'focus' || currEl.value.length > 0) && (currEl.value !== firstOptionValue);
            parentFormGroup.classList.toggle('focused', isFocused);
        }
    } else {
        const isFocused = (e.type === 'focus' || currEl.value.length > 0);
        parentFormGroup.classList.toggle('focused', isFocused);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector("header");
    // Add event listener for elements with the class 'md-trigger'
    document.querySelectorAll('.md-trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            document.querySelectorAll('.md-modal').forEach(function (modal) {
                modal.classList.add('md-show');
                header.style.top = "0";
                header.style.zIndex = "9999";
            });
        });
    });

    // Add event listener for elements with the class 'md-close'
    document.querySelectorAll('.md-close').forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
            document.querySelectorAll('.md-modal').forEach(function (modal) {
                modal.classList.remove('md-show');
                header.style.zIndex = "unset";
            });
        });
    });
});
