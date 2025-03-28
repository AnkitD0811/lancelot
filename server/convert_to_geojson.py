import json

def calc_lat_lon(lat, lat_dir, lon, lon_dir):
    """
    Helper function to convert latitudes & longitudes to the correct format

    Inputs:
        lat: Latitude
        lon: Longitude
        lat_dir: Latitude Direction
        lon_dir: Longitude Direction

    Outputs:
        latitude: Latitude in correct format
        longitude: Longitude in correct format
    """

    lat_deg = int(float(lat) / 100)
    lat_min = float(lat) % 100
    lon_deg = int(float(lon) / 100)
    lon_min = float(lon) % 100

    latitude = lat_deg + (lat_min / 60.0)
    longitude = lon_deg + (lon_min / 60.0)

    if lat_dir == 'S':
        latitude = latitude * -1
    
    if lon_dir == 'W':
        longitude = longitude * -1

    return latitude, longitude


"""
Used for realtime plotting, takes the payload of a MQTT Object, converts to a valid GeoJSON Object

Inputs: Message payload(data)
Outputs: GeoJSON Structure for the coordinates, if unusable packet, then -1

"""
def convert_realtime(data):
    try:
                
        # Strip newline, and curly braces
        data = data.strip().lstrip("{").rstrip("}")
                
        # Split the entire packet into GNGGA & DateTime
        # parts[] = ['GNGGA Part', 'DateTime']
        parts = data.split(r',"DateTime":')

        # Remove the beginning part from GNGGA
        # Also split the string into seperate components
        parts[0] = parts[0][6:].split(",")

        # Remove Empty Strings from GNGGA
        # This will be used to filter which packets can be used for plotting
        parts[0] = list(filter(None, parts[0]))

        if(len(parts[0]) < 13):
            return -1

        """
        GNGGA format used, required items:
        Latitude <2> ddmm.mmmmmmm
        Longitude <4> dddmm.mmmmmmm
        Latitude Direction <3> N or S (north latitude or south latitude)
        Longitude Direction <5> E or W (east longitude or west longitude)
        Altitude <9> 
        DateTime(Seperate from GNGGA) yyyy mm dd hh mm ss
        """

        lat, lat_dir, lon, lon_dir, altitude, datetime = (
            parts[0][2], parts[0][3], parts[0][4], parts[0][5], parts[0][9], parts[1]
        )

        if not lat or not lon:
            return -1

        # Calculate latitude and longitude values in terms of decimal
        latitude, longitude = calc_lat_lon(lat, lat_dir, lon, lon_dir)
        if latitude is None or longitude is None:
            return -1

        # Convert altitude to decimal
        
        # FIX altitude = float(altitude) if altitude else 0.0

        altitude = 0.0

        # Construct the geoJSON feature
        return({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [latitude, longitude]
            },
            "properties": {
                "altitude": altitude,
                "timestamp": datetime
            }
        })

    except(UnicodeDecodeError):
        return -1 #Ignore the line



def convert_to_geojson(input_file):
    """
    Converts the input log file to GeoJSON for plotting.

    Inputs:
        input_file: Log File received from the microcontroller
        output_json: GeoJSON file containing features extracted from the log file
    """
    
    features = []
    with open(input_file, "r", encoding = "utf-8", errors = "replace") as f:
        for line in f:
            try:
                
                # Strip newline, and curly braces
                line = line.strip().lstrip("{").rstrip("}")
                
                # Split the entire packet into GNGGA & DateTime
                # parts[] = ['GNGGA Part', 'DateTime']
                parts = line.split(r',"DateTime":')

                # Remove the beginning part from GNGGA
                # Also split the string into seperate components
                parts[0] = parts[0][6:].split(",")

                # Remove Empty Strings from GNGGA
                # This will be used to filter which packets can be used for plotting
                parts[0] = list(filter(None, parts[0]))

                if(len(parts[0]) < 13):
                    continue # Incomplete Packet, unusable

                """
                GNGGA format used, required items:
                Latitude <2> ddmm.mmmmmmm
                Longitude <4> dddmm.mmmmmmm
                Latitude Direction <3> N or S (north latitude or south latitude)
                Longitude Direction <5> E or W (east longitude or west longitude)
                Altitude <9> 
                DateTime(Seperate from GNGGA) yyyy mm dd hh mm ss
                """

                lat, lat_dir, lon, lon_dir, altitude, datetime = (
                    parts[0][2], parts[0][3], parts[0][4], parts[0][5], parts[0][9], parts[1]
                )

                if not lat or not lon:
                    continue

                # Calculate latitude and longitude values in terms of decimal
                latitude, longitude = calc_lat_lon(lat, lat_dir, lon, lon_dir)
                if latitude is None or longitude is None:
                    continue

                # Convert altitude to decimal
                altitude = float(altitude) if altitude else 0.0

                # Construct the geoJSON feature
                features.append({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "properties": {
                        "altitude": altitude,
                        "timestamp": datetime
                    }
                })

            except(UnicodeDecodeError):
                continue #Ignore the line

    # Create GeoJSON Structure
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }

    # Write into ouput file
    with open(output_json, "w") as f:
        json.dump(geojson, f)
        print("Conversion successful; File Created")


#### Sample Test Case ####
# res = convert_realtime('{"gps":$GNGGA,145739.000,1258.38556,N,07909.85535,E,1,16,0.9,136.0,M,0.0,M,,*7F,"DateTime":20250224202739}')
# print(res)