"""
Functions responsible for plotting the coordinates of a tracker on the dashboard
"""

import folium
from folium.plugins import Realtime
from folium import JsCode
import json
from convert_to_geojson import convert_realtime


def plot_realtime(msg):
    m = folium.Map()

    source = convert_realtime(msg.payload)

    Realtime(
    source,
    interval=10000,
).add_to(m)


