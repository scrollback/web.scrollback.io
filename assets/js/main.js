/* jshint browser: true */
/* global $ */

$(function() {
    // Hide non-javascript content
    $("<style>").attr("type", "text/css").text(".nojs { display: none; }").appendTo("head");

    // Navigation menu
    $("nav .menu").on("click", function() {
        $(this).closest("nav").toggleClass("collapsed");
    });

    // Show scrollback embed widget
    $("#trial-room").on("click", function() {
        $("body").addClass("scrollback-open");
    });

    // Show the modal dialog
    $(".login-show").on("click", function() {
        var $dialog, $createField, $createText, $createInput, $createSubmit, $createError;

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
            var name = $(this).val();

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

        $dialog = $("<div>").html(
            $("#goto-template").html()
        ).modal();

        // Validate form submission
        $createField = $dialog.find("#create-field");
        $createText = $createField.find("#create-text");
        $createInput = $createField.find("input[type=submit]");
        $createError = $createField.find(".error");

        // Prevent form submission if input not valid
        $createText.on("focus keyup change", validate);

        $createField.on("submit", function(e) {
            location.href = "https://scrollback.io/" + $createText.val();

            $createText.val("");

            $(this).attr("disabled", true);

            e.preventDefault();

            return false;
        });
    });
});
