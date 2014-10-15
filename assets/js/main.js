/* jshint browser: true */
/* global $ */

$(function() {
    // Hide non-javascript content
    $("<style>").attr("type", "text/css").text(".nojs { display: none; }").appendTo("head");

    // Show scrollback embed widget
    $("#trial-room").on("click", function() {
        $("body").addClass("scrollback-open");
    });

    // Show and hide the modal dialog
    function showDialog() {
        if (history.pushState) {
            history.pushState(null, '');
        }

        $("body").addClass("login-open");
        $(".modal").find("input").eq(0).focus();
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
    function error(err) {
        $("#create-field > .error").text(err);
        if (typeof err === 'undefined') {
            $("#create-field > input[type=submit]").attr('disabled', false);
        } else {
            $("#create-field > input[type=submit]").attr('disabled', true);
        }
    }

    function validate() {
        var name = $("#create-text").val();
        if (name.length  === 0) { error(''); return false; }
        if (name.length > 0 && name.length < 3) { error('Must be at least 3 letters long.'); return false; }
        if (/^[^a-z]/.test(name)) { error('Must start with a lower case letter.'); return false; }
        if (/[^0-9a-z\-]/.test(name)) { error('Must have only lowercase letters, digits and hyphens (-)'); return false; }
        if (name.length >= 3) { error(''); }
        error();
        return true;
    }

    // Handle submit button click
    $("#create-field > input[type=submit]").click(function() {
        location.href = location.protocol + "//" + location.host + "/" + $("#create-text").val();
        $("#create-text").val('');
        $(this).attr('disabled', true);
    });

    // Prevent form submission if input not valid
    $("#create-text").on("focus keyup change", validate);
    $("#create-field").submit(function(e) {
        e.preventDefault();
        return false;
    });
});
