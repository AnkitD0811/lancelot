from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Lancelot!"

def main():  # <- This is the new function
    app.run(debug=True)

if __name__ == '__main__':
    main()
