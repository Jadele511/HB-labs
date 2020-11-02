"use strict";


// PART 1: SHOW A FORTUNE

function showFortune(evt) {
    $('#fortune-text').load('/fortune')
};

$('#get-fortune-button').on('click', showFortune);



// PART 2: SHOW WEATHER

function showWeather(evt) {
    evt.preventDefault();

    let url = "/weather.json";
    const formData = $('#weather-form').serialize()

    $.get(url, formData, (res) => {
        $("#weather-info").html(res.forecast)
    });
};

$("#weather-form").on('submit', showWeather);




// PART 3: ORDER MELONS

function orderMelons(evt) {
    evt.preventDefault();

    const url = '/order-melons.json'
    const formInputs = $('#order-form').serialize()

    $.post(url, formInputs, (res) => {
        $('#order-status').html(res.msg);
        if (res.code === 'ERROR') {
            $('#order-status').addClass("order-error");
        }
    });

};

$("#order-form").on('submit', orderMelons);


