var list_of_form_fields = {

            "invoice_number": {
                "status": "",
                "message": "",
                "cleared_input_value": "",
                "to_clear": "yes",
                "input_key": "#new_invoice_number",
                "validation": /^[A-z0-9]{2}$/,
                "validate_with": "",
                "step": "5"
            },

            "invoice_number_year": {
                "status": "",
                "message": "",
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_invoice_number_year",
                "validation": /^[A-z0-9]{4}$/,
                "validate_with": "",
                "step": "5"
            },

            "date_issued": {
                "status": "",
                "message": "Prosím upravte tak, aby název měl alespoň jedno písmeno.",
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_date_issued",
                "validation": "",
                "validate_with": "",
                "step": "5"
            },

            "date_to_send": {
                "status": "",
                "message": "Prosím upravte tak, aby adresa měla alespoň jedno písmeno.",
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_date_to_send",
                "validation": "",
                "validate_with": "",
                "step": "5"
            },

            "client_key": {
                "status": "",
                "message": "", // NEPOVINNY
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "",
                "validation": "",
                "validate_with": "",
                "step": "5"
            },

            "client_name": {
                "status": "",
                "message": "", // NEPOVINNY
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "",
                "validation": "",
                "validate_with": "",
                "step": "5"
            },

            "me": {
                "status": "",
                "message": "", // NEPOVINNY
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "",
                "validation": "",
                "validate_with": "",
                "step": "5"
            },

            "amount": {
                "status": "",
                "message": "", // NEPOVINNY
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_amount",
                "validation": /^[0-9]{3,9}$/,
                "validate_with": "",
                "step": "5"
            },



            "for_what": {
                "status": "",
                "message": "", // NEPOVINNY
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_for_what",
                "validation": "",
                "validate_with": "",
                "step": "5"
            },

            "thanks": {
                "status": "",
                "message": "", // NEPOVINNY
                "cleared_input_value": "",
                "to_clear": "no",
                "input_key": "#new_thanks",
                "validation": "",
                "validate_with": "",
                "step": "5"
            },
        };

        var ok = "&#127867;";
        var nok = " ";

        // tohle plni data z posledni faktury

        var invoiceRef = firebase.database().ref("invoice");
        invoiceRef.limitToLast(1).on('child_added', function(snapshot) {

            var key = snapshot.key;
            var client = snapshot.child("client_key").val();
            var me = snapshot.child("my_key").val();


            var inv_number_last = snapshot.child("invoice_number").val()

            console.log(inv_number_last, inv_number_last.length)

            if (inv_number_last < 10) {

            console.log(inv_number_last, inv_number_last.length)

                inv_number_last = "0" + inv_number_last;
            }

            var inv_number = (1 * (snapshot.child("invoice_number").val()) + 1);

            console.log(inv_number, inv_number.length)


            if (inv_number < 10) {

                inv_number = "0" + inv_number;
            }


            list_of_form_fields.invoice_number.cleared_input_value = (1 * (snapshot.child("invoice_number").val()) + 1);
            list_of_form_fields.invoice_number_year.cleared_input_value = snapshot.child("invoice_number_year").val();
            
            list_of_form_fields.client_key.cleared_input_value = client;
            list_of_form_fields.client_name.cleared_input_value = snapshot.child("client_name").val();
            list_of_form_fields.me.cleared_input_value = me;

            list_of_form_fields.amount.cleared_input_value = snapshot.child("amount").val();
            list_of_form_fields.for_what.cleared_input_value = snapshot.child("for_what").val();
            list_of_form_fields.thanks.cleared_input_value = snapshot.child("thanks").val();

            last_invoice_number = inv_number_last + " " +
                snapshot.child("invoice_number_year").val() + " je číslo poslední faktury" 


            $('#new_invoice_number').val(inv_number);
            $('#new_invoice_number_year').val(list_of_form_fields.invoice_number_year.cleared_input_value);
            $('#invoice_number .additional_info').text(last_invoice_number);


            $('#new_amount').val(list_of_form_fields.amount.cleared_input_value);
            $('#new_for_what').val(list_of_form_fields.for_what.cleared_input_value);
            $('#new_thanks').val(list_of_form_fields.thanks.cleared_input_value);




            var last_invoice_client = firebase.database().ref("about_client");

            last_invoice_client.orderByKey().equalTo(client).on("child_added", function(snapshot) {


                var client_last = snapshot.child("client_name_id").val();
                var rest_of_client = snapshot.child("client_address_street").val() + ", " +
                    snapshot.child("client_address_town").val() + ", IČ " + snapshot.child("client_legal_id").val();



            //    $('.client_info_a').text(client_last);
            //    $('.client span.additional_info_a').text(rest_of_client);

                $('.client_info_selected').text(client_last);
                $('.client .additional_info').text(rest_of_client);
                $('#new_client_key').val(key);


            });

            var last_invoice_me = firebase.database().ref("about_me");

            last_invoice_me.limitToLast(1).on("child_added", function(snapshot) {


                //   var me_last = snapshot.child("my_name").val();
                //   var rest_of_me = snapshot.child("my_address_street").val() + ", " +
                //      snapshot.child("my_address_town").val() + ", IČ " + snapshot.child("my_legal_id").val();


                $('#about_me').html(
                    '<div data-about_me_id="' + key + '">' +
                    '<p>' +  snapshot.child("my_name").val() + ", " +
                    snapshot.child("my_address_street").val() + ", " +
                    snapshot.child("my_address_town").val() + ", " + snapshot.child("my_address_zip").val() + '</p>' +
                    '<p class="break">' + "IČ " + snapshot.child("my_legal_id").val() + '</p>' +
                    '<p>' + "č.ú. " + snapshot.child("my_account_number_prefix").val() + " " + snapshot.child("my_account_number").val() +
                    " / " + snapshot.child("my_bank_code").val() + '</p>' + 

                    '</div>'
                );

            });

        });


        // todle je vo datumech a jejich predvyplneni


        $.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
        moment.locale('cs');

        document.getElementById("new_date_issued").value = moment().format('l');
        document.getElementById("new_date_to_send").value = moment().add(14, 'days').format('l');

        list_of_form_fields.date_issued.cleared_input_value = $('#new_date_issued').val();
        list_of_form_fields.date_to_send.cleared_input_value = $('#new_date_to_send').val();

        $('#date_issued_today').prop('checked', true);
        $('#date_issued_last_month').prop('checked', false);

        date_difference();


        function date_difference() {

            var a = moment(list_of_form_fields.date_issued.cleared_input_value, "DD-MM-YYYY");
            var b = moment(list_of_form_fields.date_to_send.cleared_input_value, "DD-MM-YYYY");

            var difference = b.diff(a, 'days');

            if (b < a) {

                $('#date_to_send .additional_info').text("Ajaj, splatnost je dřív než datum vystavení");
                $('#date_to_send .additional_info').addClass("error");
                

            } else {

                var text =  difference + " dní po vystavení"
                $('#date_to_send .additional_info').text(text);
                $('#date_to_send .additional_info').removeClass("error");
            }
        };


        $("#new_date_issued").datepicker({ //nefunguje zobrazeni data z policka do kalendare

            onSelect: function() {
                var dateObject = $(this).datepicker('getDate');
                document.getElementById("new_date_issued").value = moment(dateObject).format('l');
                list_of_form_fields.date_issued.cleared_input_value = $('#new_date_issued').val();


                $('#date_issued_today').prop('checked', false);
                $('#date_issued_last_month').prop('checked', false);

                date_difference();

            }
        });

        $('#date_issued_today').on("click", function() {


            if (document.getElementById('date_issued_today').checked) {
                $('#date_issued_last_month').prop('checked', false);

                document.getElementById("new_date_issued").value = moment().format('l');
                document.getElementById("new_date_to_send").value = moment().add(14, 'days').format('l');

                list_of_form_fields.date_issued.cleared_input_value = $('#new_date_issued').val();
                list_of_form_fields.date_to_send.cleared_input_value = $('#new_date_to_send').val();

            } else {
                $('#date_issued_today').prop('checked', true);
            }
            date_difference();

        });

        $('#date_issued_last_month').on("click", function() {

            if (document.getElementById('date_issued_last_month').checked) {
                $('#date_issued_today').prop('checked', false);

                var date_issued = moment(date_issued).subtract(1, 'months').endOf('month').format('l');
                document.getElementById("new_date_issued").value = date_issued;
                list_of_form_fields.date_issued.cleared_input_value = $('#new_date_issued').val();

                var date_to_send = moment(date_to_send).subtract(1, 'months').endOf('month').add(14, 'days').format('l');
                document.getElementById("new_date_to_send").value = date_to_send;
                list_of_form_fields.date_to_send.cleared_input_value = $('#new_date_to_send').val();

            } else {
                $('#date_issued_last_month').prop('checked', true);
            }


            date_difference();

        });



        $("#new_date_to_send").datepicker({
            onSelect: function() {


                var original_date = list_of_form_fields.date_to_send.cleared_input_value

                var dateObject = $(this).datepicker('getDate');
                document.getElementById("new_date_to_send").value = moment(dateObject).format('l');
                list_of_form_fields.date_to_send.cleared_input_value = $('#new_date_to_send').val();


                date_difference();

            }
        });


        // plni seznam klientu


        function fill_client_list() {

            var ak = firebase.database().ref("about_client");
            var query = ak.orderByKey();

            query.once("value").then(function(snapshot) {

                snapshot.forEach(function(childSnapshot) {

                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();


                    $('.client_list .rows').append(
                        '<div class="client_list_item"  data-client_id="' + key + '">' +
                        
                        '<div class="client_info">' + childData.client_name_id + '</div>' +
                        '<span class="additional_info">' + childData.client_address_street + ", " +
                        childData.client_address_town + ", IČ " + childData.client_legal_id + '</span>' + '</div>'

                    );

                });

            });
        };

        fill_client_list();


    //    $('.client_info_a').on("click", function() {

    //        $('.select_client_list').removeClass("hidden");

    //        $('.client_info_a').addClass("focus");

        $('.client_info_selected').on("click", function() {

            $('.client_list').removeClass("hidden");

            $('.client_info_selected').addClass("focus");
                

            $('.client_list_item').on("click", function() {

                var key = ($(this).data("client_id"));

                var ref = firebase.database().ref("about_client").child(key);


                ref.once("value")
                    .then(function(snapshot) {
                        var key = snapshot.key;
                        var client = snapshot.child("client_name_id").val();
                        var rest_of_client = snapshot.child("client_address_street").val() + ", " +
                            snapshot.child("client_address_town").val() + ", IČ " + snapshot.child("client_legal_id").val();


                        $('.client_info_selected').text(client);
                        $('.client .additional_info').text(rest_of_client);
                        $('#new_client_key').val(key);

                        list_of_form_fields.client_key.cleared_input_value = key;
                        list_of_form_fields.client_name.cleared_input_value = client;

                        $('.client_list').addClass('hidden');
                    });

            });


        });

        $('input').focusin(function() {

            $('.client_info_selected').removeClass("focus");

        });
        $('input').keyup(function() {

            var key = this.id.replace("new_", "");
            var key_to_pass = list_of_form_fields[key];

            $('.client_info_a').removeClass("focus");


            get_proper_value(key);

        });

        function get_proper_value(key) {

            if (list_of_form_fields[key].to_clear == "yes") {

                var cleared_value_to_pass = $(list_of_form_fields[key].input_key).val().replace(/[\s\v]+/g, "");

            } else {

                var cleared_value_to_pass = $(list_of_form_fields[key].input_key).val();
            }

            list_of_form_fields[key].cleared_input_value = cleared_value_to_pass; //takze ukladam spravnou hosnotu z input dfieldu

        };

        $('#confirm_invoice .button').on("click", function() {

            if ($(this).hasClass("disabled")) {

                

            } else {

                $('#confirm_invoice .button').addClass("disabled")
            
            var invoice_Ref = firebase.database().ref('invoice');
                var new_invoice_Ref = invoice_Ref.push();
                new_invoice_Ref.set({
                    'amount': list_of_form_fields.amount.cleared_input_value,

                    'client_key': list_of_form_fields.client_key.cleared_input_value,
                    'client_name': list_of_form_fields.client_name.cleared_input_value,

                    'date_issued': list_of_form_fields.date_issued.cleared_input_value,
                    'date_to_send': list_of_form_fields.date_to_send.cleared_input_value,

                    'for_what': list_of_form_fields.for_what.cleared_input_value,
                    'invoice_number': list_of_form_fields.invoice_number.cleared_input_value,
                    'invoice_number_year': list_of_form_fields.invoice_number_year.cleared_input_value,

                    'my_key': list_of_form_fields.me.cleared_input_value,
                    'thanks': list_of_form_fields.thanks.cleared_input_value,
                })

                window.location.href = "invoice_to_print.html";

            }

        });

        

   