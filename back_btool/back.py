from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#address of function dosnt include port as it is deined in the function
@app.route('/api/add_entry', methods=['POST'])
def add_entry():
    data = request.json
    name = data['name']
    date = data['dateBought']
    price = data['price']


    return {'message': 'Data recieved succesfully'}

#only run the application when the file is executed dierectly
if __name__ == '__main__':
    app.run(port=5000, debug=True)