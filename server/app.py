from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")

# Serve React Web Pages for all paths
@app.route("/")
@app.route("/dashboard")
@app.route("/about")
@app.route("/profile")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
