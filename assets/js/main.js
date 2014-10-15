/* jshint browser: true */
/* global $ */

$(function() {
    var $createField, $createText, $createInput, $createSubmit, $createError;

    // Hide non-javascript content
    $("<style>").attr("type", "text/css").text(".nojs { display: none; }").appendTo("head");

    // Show scrollback embed widget
    $("#trial-room").on("click", function() {
        $("body").addClass("scrollback-open");
    });

    // Show and hide the modal dialog
    function showDialog() {
        if (history.pushState) {
            history.pushState(null, "");
        }

        $("body").addClass("login-open");
        $createInput.focus();
    }

    function hideDialog() {
        $("body").addClass("login-intermediate");

        setTimeout(function() {
            $("body").removeClass("login-open login-intermediate");
        }, 500);
    }

    function handleKey(e) {
        if (e.keyCode === 27) {
            hideDialog();
        }
    }

    $(window).on("keyup", handleKey);
    $(window).on("popstate", hideDialog);

    $(".login-show").on("click", showDialog);
    $(".login-close").on("click", hideDialog);
    $(".dim").on("click", hideDialog);

    // Validate form submission
    $createField = $("#create-field");
    $createText = $("#create-text");
    $createInput = $createField.find("input[type=submit]");
    $createError = $createField.find(".error");

    function error(err) {
        $createError.text(err);

        if (typeof err === "undefined") {
            $createField.attr("disabled", false);

            return true;
        } else {
            $createField.attr("disabled", true);

            return false;
        }
    }

    function validate() {
        var name = $createText.val();

        if (name.length  === 0) {
            return error("");
        }

        if (name.length > 0 && name.length < 3) {
            return error("Room name must be at least 3 letters long.");
        }

        if (/^[^a-z]/.test(name)) {
            return error("Room name must start with a lower case letter.");
        }

        if (/[^0-9a-z\-]/.test(name)) {
            return error("Room name must have only lowercase letters, digits and hyphens (-)");
        }

        if (name.length >= 3) {
            return error("");
        }

        return error();
    }

    // Handle submit button click
    $createSubmit.click(function() {
        location.href = "https://scrollback.io/" + $createText.val();

        $createText.val("");

        $(this).attr("disabled", true);
    });

    // Prevent form submission if input not valid
    $createText.on("focus keyup change", validate);

    $createSubmit.submit(function(e) {
        e.preventDefault();

        return false;
    });
});
