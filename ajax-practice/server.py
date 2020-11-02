"""Flask server for AJAX exercise.

IMPORTANT: you don't need to change this file at all to finish
the exercise!
"""


import random

from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

FORTUNES = [
    "Tomorrow your code will <b>work properly</b>.",
    "Your day ahead will be <b>full of while loops</b>.",
    "You will wake up one morning and discover you <i>learned recursion in your sleep</i>.",
    "<i>@facebook</i> will retweet an announcement about your Hackbright project.",
    "You will inherit a house in San Francisco.",
    "In the future, your fortune will be wrong.",
]

WEATHER = {
    '94110': {'forecast': 'Rainy, damp, and rich with hipsters.', 'temp': '60F'},
    '99507': {'forecast': 'Warm, balmy, and good for sunbathing.', 'temp': '100F'},
    '94102': {'forecast': 'Delightful, clever, and full of Python.', 'temp': '55F'},
}

DEFAULT_WEATHER = {'forecast': 'Kind of boring.', 'temp': '68F'}

@app.route('/')
def index():
    """Show our index page."""

    return render_template("index.html")


@app.route('/fortune')
def fortune():
    """Return a single fortune as a text string (*not* the whole HTML page!)"""

    return random.choice(FORTUNES)


@app.route('/weather.json')
def weather():
    """Return a weather-info dictionary for this zipcode."""

    zipcode = request.args.get('zipcode')
    weather_info = WEATHER.get(zipcode, DEFAULT_WEATHER)
    return jsonify(weather_info)


@app.route('/order-melons.json', methods=['POST'])
def order_melons():
    """Order melons and return a dictionary of result-code and result-msg."""

    melon = request.form.get('melon_type')
    qty = int(request.form.get('qty'))

    if qty > 10:
        result_code = 'ERROR'
        result_text = "You can't buy more than 10 melons"
    elif qty > 0:
        result_code = 'OK'
        result_text = "You have bought {} {} melons".format(qty, melon)
    else:
        result_code = 'ERROR'
        result_text = "You want to buy fewer than 1 melons? Huh?"

    return jsonify({'code': result_code, 'msg': result_text})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
