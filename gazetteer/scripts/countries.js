// Fetch country data via AJAX
$.ajax({
  url: './scripts/countries.php',
  dataType: 'json',
  success: function(data) {
    // Sort countries alphabetically by name
    data.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    
    // Populate select element options
    var select = $('#countrySelect');
    $.each(data, function(index, country) {
      var option = $('<option>', {
        value: country.iso_a2,
        text: country.name
      });
      option.addClass('text-center'); // Adding class 'text-center'
      select.append(option);
    });
  }
});
