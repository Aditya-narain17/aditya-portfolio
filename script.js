document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  var fields = [
    { id: "name", validate: function (v) { return v.trim().length > 0; } },
    { id: "email", validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
    { id: "message", validate: function (v) { return v.trim().length > 0; } }
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var allValid = true;
    var firstInvalid = null;

    fields.forEach(function (f) {
      var input = document.getElementById(f.id);
      var wrapper = input.closest(".field");
      var valid = f.validate(input.value);

      wrapper.classList.toggle("invalid", !valid);
      input.setAttribute("aria-invalid", valid ? "false" : "true");

      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (!allValid) {
      status.textContent = "There was a problem with your submission. Please check the highlighted fields.";
      status.className = "";
      firstInvalid.focus();
      return;
    }

    // No backend wired up yet — this is where a real submit (fetch/XHR) would go.
    status.textContent = "Thanks, " + document.getElementById("name").value.trim() + " — your message has been sent.";
    status.className = "success";
    form.reset();
  });
});