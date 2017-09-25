if (view == "client_info") {

 var animationInRight = "animated bounceInRight";
    var animationOutLeft = "animated bounceOutLeft";
    var animationShake = "animated shake";
    var animationFadeInDown = "animated slideInDown"
    var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    var animationOutRight = "animated bounceOutRight";
    var animationInLeft = "animated bounceInLeft";
        var list_of_form_fields = {

            "client_legal_id": {
                "status": "",
                "message": "Prosím upravte tak, aby IČO mělo 8 číslic.",
                "cleared_input_value": "",
                "to_clear": "yes",
                "input_key": "#new_client_legal_id",
                "validation": /^[0-9]{8}$/,
                "validate_with": "",
                "step": "1"
            },

            "client_tax_id": {
                "status": "",
                "message": "Prosím upravte tak, aby DIČ mělo alespoň 8 číslic.", // jenze je to nepovinny, takze jenom kdyz do toho neco napsal
                "cleared_input_value": "",
                "to_clear": "yes",
                "input_key": "#new_client_tax_id",
                "validation": /^[0-9]{8,10}$/,
                "validate_with": "",
                "step": "1"
            },

            "client_name": {
                "status": "",
                "message": "Prosím upravte tak, aby název měl alespoň jedno písmeno.",
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_client_name",
                "validation": /[A-z0-9]{1,}/,
                "validate_with": "",
                "step": "2"
            },

            "client_address_street": {
                "status": "",
                "message": "Prosím upravte tak, aby adresa měla alespoň jedno písmeno.",
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_client_address_street",
                "validation": /[A-z0-9]{1,}/,
                "validate_with": "",
                "step": "2"
            },

            "client_address_town": {
                "status": "",
                "message": "Prosím upravte tak, aby obec měla alespoň jedno písmeno.", // neni to nepovinny? vyhodim to z enablovani tlacitka
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_client_address_town",
                "validation": /[A-z0-9]{1,}/,
                "validate_with": "",
                "step": "2"
            },

            "client_address_zip": {
                "status": "",
                "message": "Prosím upravte tak, aby PSČ mělo 5 číslic.",
                "cleared_input_value": "",
                "to_clear": "yes",
                "input_key": "#new_client_address_zip",
                "validation": /^[0-9]{5}$/,
                "validate_with": "",
                "step": "2"
            },
        };

        var ok = "&#127867;";
        var nok = " ";

        var bank_message_both_nok = "Prosím upravte tak, aby č. ú. mělo alespoň 2 a max 10 číslic. Kód banky tak, aby měl číslice 4.";
        var bank_message_displayed = "no";

        var ready_to_go;

        Object.keys(list_of_form_fields).forEach(function(key) { // abych pri nacteni stranky zjistil status poli

            var value_to_pass = list_of_form_fields[key];


            get_proper_value(key); // abych pri nacteni stranky zjistil spravny hodnoty (ocisteny)

            var cleared_value_to_pass = list_of_form_fields[key].cleared_input_value;

            input_status(value_to_pass, cleared_value_to_pass);

        });


        function input_status(input_name, cleared_input) {


            if ((input_name.validation.test(cleared_input))) {

                input_name.status = ok;

                $(input_name.input_key).siblings("span").addClass("hidden");
                $(input_name.input_key).removeClass("field_is_wrong");

                if (bank_message_displayed == "yes") {

                    bank_message_displayed == "";
                    what_is_wrong(1);
                }

            } else {

                input_name.status = nok;
            }


            if (input_name.validate_with == "") {

                $(input_name.input_key).parent().siblings(".status").html(input_name.status);

            } else {

                var status_compared = list_of_form_fields[input_name.validate_with].status;

                if ((input_name.status == ok) && (status_compared == ok)) {

                    var combined_status = ok;

                } else {

                    var combined_status = nok;
                }

                $(input_name.input_key).parent().siblings(".status").html(combined_status);
            }
            to_enable_button();
        };

        $('input').keyup(function() {

            var key = this.id.replace("new_", "");
            var key_to_pass = list_of_form_fields[key];

            get_proper_value(key);

            var cleared_value_to_pass = list_of_form_fields[key].cleared_input_value;

            input_status(key_to_pass, cleared_value_to_pass);

        });

        function get_proper_value(key) {

            if (list_of_form_fields[key].to_clear == "yes") {

                var cleared_value_to_pass = $(list_of_form_fields[key].input_key).val().replace(/[\s\v]+/g, "");

            } else {

                var cleared_value_to_pass = $(list_of_form_fields[key].input_key).val();
            }

            list_of_form_fields[key].cleared_input_value = cleared_value_to_pass; //takze ukladam spravnou hosnotu z input dfieldu

        };


        function to_enable_button() {

            // nakej cek to je no -- nepovinny policko

            if ((list_of_form_fields.client_tax_id.cleared_input_value == "")) {

                var status_not_required = ok;

            } else {

                var status_not_required = list_of_form_fields.client_tax_id.status;

            }
            //
            if ((list_of_form_fields.client_legal_id.status == ok) && (status_not_required == ok)) {

                $("#confirm_form .button").removeClass("disabled");

            } else {

                $("#confirm_form .button").addClass("disabled");

            };

            // step2

            if ((list_of_form_fields.client_name.status == ok) && /*(list_of_form_fields.client_address_street.status == ok) &&*/
                (list_of_form_fields.client_address_town.status == ok) && (list_of_form_fields.client_address_zip.status == ok)) {

                $("#confirm_about_client .button").removeClass("disabled");

            } else {

                $("#confirm_about_client .button").addClass("disabled");

            };
        };

        function what_is_wrong(step_number) {

            Object.keys(list_of_form_fields).forEach(function(key) { // abych pri nacteni stranky zjistil status poli

                if ((list_of_form_fields[key].status == nok)) {

                    if (list_of_form_fields[key].validate_with == "") {

                        var message = list_of_form_fields[key].message;


                    } else {

                        var other_one = list_of_form_fields[key].validate_with;
                        var status_other_one = list_of_form_fields[other_one].status;

                        if ((list_of_form_fields[key].status == nok) &&
                            (status_other_one == nok)) {

                            var message = bank_message_both_nok;
                            bank_message_displayed = "yes";
                        }

                        if ((list_of_form_fields[key].status == nok) &&
                            (status_other_one == ok)) {

                            var message = list_of_form_fields[key].message;
                        }

                        if ((list_of_form_fields[key].status == ok) &&
                            (status_other_one == nok)) {

                            var message = other_one.message;
                        }

                    };

                    if (list_of_form_fields[key].step == step_number) {

                        $(list_of_form_fields[key].input_key).siblings("span").removeClass("hidden");
                        $(list_of_form_fields[key].input_key).siblings("span").text(message);
                        $(list_of_form_fields[key].input_key).addClass("field_is_wrong");

                    }

                    if ((list_of_form_fields[key].step == step_number) && (list_of_form_fields.client_tax_id.cleared_input_value == "")) {
                        // nepovinne policko
                        $(list_of_form_fields.client_tax_id.input_key).siblings("span").addClass("hidden");
                        $(list_of_form_fields.client_tax_id.input_key).siblings("span").text();
                        $(list_of_form_fields[key].input_key).removeClass("field_is_wrong");

                    }
                };
            });

        };

        

        // step1 confirm button

        $('#confirm_form .button').on("click", function() {


            if ($(this).hasClass("disabled")) {

                what_is_wrong(1);

            } else {
               
               
                $("input").prop('disabled', true);
                $('label').addClass('disabled');
                $('.input').addClass('disabled');
                $('.link a').addClass('disabled');
                $('.button').addClass('disabled progress');

                $('.inner').addClass('active');
                $('.button p').text('Kontaktuji rejstřík');


                setTimeout(function(){
                   $('.button').addClass('done');


                }, 2500);


                setTimeout(function(){
                    $('.button').removeClass('done');
                    $('.inner').removeClass('active');

                    ready_to_go = 1;

                    
                    $('.button p').text('Potvrdit údaje');

                    $("input").prop('disabled', false);
                    $('label').removeClass('disabled');
                    $('.input').removeClass('disabled');
                    $('.button').removeClass('progress');
                    //$('.button').addClass('disabled');
                    to_enable_button();


                    if (ready_to_go == 1) {

                        console.log("ahoj", ready_to_go)

                        $('.step1').addClass("bounce_Out_Left");


                        $('.step1').one(animationEnd,
                            function() {

                            $('.step1').addClass("out_position");
                            $('.step1').removeClass("bounce_Out_Left");


                            });

                        $('.step2').removeClass("hidden");
                        $('.step2').addClass("bounce_In_Right");

                        $('.step2').one(animationEnd,
                            function() {

                            $('.step2').removeClass("bounce_In_Right");

                            var content = "Rejstřík nerejstříkuje. Vyplňte prosím údaje ručně. "
                            $('#status_bar')
                                .removeClass("hidden")
                                .addClass("problem")
                                .html(content);

                            });

                        
                    }



                }, 2500);


            }



        });

        // confirm button step2

        


        $('#confirm_about_client .button').on("click", function() {

            if ($(this).hasClass("disabled")) {

                what_is_wrong(2);

            } else {

            /*    var about_client_Ref = firebase.database().ref('about_client');
                var new_about_client_Ref = about_client_Ref.push();
                new_about_client_Ref.set({
                    'client_legal_id': list_of_form_fields.client_legal_id.cleared_input_value,
                    'client_tax_id': list_of_form_fields.client_tax_id.cleared_input_value,
                    'client_name_id': list_of_form_fields.client_name.cleared_input_value,
                    'client_address_street': list_of_form_fields.client_address_street.cleared_input_value,
                    'client_address_town': list_of_form_fields.client_address_town.cleared_input_value,
                    'client_address_zip': list_of_form_fields.client_address_zip.cleared_input_value,
                })

                window.location.href = "invoice.html";
            */
            $('.full').addClass("zoom_Out");
            $('.step1').addClass("hidden");
            $('.step2').addClass("hidden");


            $('.full').one(animationEnd,
                function() {

            $('.full').addClass("hidden");

                });

            }

        });

        $('.link').on("click", function() {


            $('#status_bar')
                .addClass("hidden")
                .removeClass("problem")
                .text("");
            
            $('.step2').addClass("bounce_Out_Right");
            $('.step1').removeClass("out_position");

            $('.step1').addClass("bounce_In_Left");
            $('.step1').one(animationEnd,
                function() {

                to_enable_button();

                $('.step2').removeClass("bounce_Out_Right");
                $('.step1').removeClass("bounce_In_Left");
                //$('.step1').addClass("out_position");
                $('.step2').addClass("hidden");


                });

           });

    }





