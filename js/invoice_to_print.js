var invoiceRef = firebase.database().ref("invoice");

invoiceRef.limitToLast(1).on('child_added', function (snapshot) {
	//cislo faktury
	var inv_number = snapshot.val().invoice_number

	console.log(inv_number)
	console.log(inv_number.length)

	if (inv_number < 10) {
		inv_number = "0" + inv_number
	}
	//

	var invoice_number = "Faktura č. " + inv_number
	var invoice_number_year = snapshot.val().invoice_number_year;
	var pure_invoice_number = inv_number + invoice_number_year;
	var for_what = snapshot.val().for_what;
	var amount = snapshot.val().amount + " Kč";
	var pure_amount = snapshot.val().amount; // vyhazet z nej mezery
	var date_to_send = snapshot.val().date_to_send;
	var date_issued = snapshot.val().date_issued;
	var thanks = snapshot.val().thanks;

	var clientref = firebase.database().ref("about_client").child(snapshot.val().client_key);

	clientref.once('value').then(function (snapshot) {
		//cislo faktury

		var client_tax_id = snapshot.val().client_tax_id;

		if (client_tax_id !== "") {
			client_tax_id = ", DIČ " + snapshot.val().client_tax_id;
		}

		//

		var client = snapshot.val().client_name_id + ", " + snapshot.val().client_address_street + ", " +
			snapshot.val().client_address_town + ",  " + snapshot.val().client_address_zip;
		var client_legal_id = "IČ " + snapshot.val().client_legal_id + client_tax_id;

		console.log(date_to_send);

		var myRef = firebase.database().ref("about_me");

		myRef.limitToLast(1).on('child_added', function (snapshot) {
			//cislo faktury
			var prefix = snapshot.val().my_account_number_prefix;

			if (prefix !== "") {
				prefix = prefix + " – ";
			}
			//

			var my_account = prefix + snapshot.val().my_account_number + " / " +
				snapshot.val().my_bank_code;

			var me = snapshot.val().my_name + ", " + snapshot.val().my_address_street + ", " +
				snapshot.val().my_address_town + ",  " + snapshot.val().my_address_zip;

			var my_legal_id = "IČ " + snapshot.val().my_legal_id


			$('#invoice_number').html(
				invoice_number + '<span class="pseudospace">' + invoice_number_year + '</span>'
			);


			$('#me .name').html(me);
			$('#me .legal_id').html(my_legal_id);


			$('#client .name').html(client);
			$('#client .legal_id').html(client_legal_id);


			$('#for_what .for_what').html(for_what);
			$('#amount .total_amount').html(amount);

			$('#date .date_to_send').html(date_to_send);
			$('.date_issued').html(date_issued);

			$('#account_number .my_account_number').html(my_account);

			$('#thanks .thanks').html(thanks);

// QR kod

			var a = moment(date_to_send, "DD-MM-YYYY").format('YYYY-MM-DD');
			var url = '<img src="' + "https://api.paylibo.com/paylibo/generator/czech/" + "image?accountNumber=" + snapshot.val().my_account_number + "&bankCode=" + snapshot.val().my_bank_code
				+ "&amount=" + pure_amount + "&currency=CZK&vs=" + pure_invoice_number + '">';
			//datum poresit formaty

			console.log(url);

			$('.qr').html(url);

		});
	});
});

