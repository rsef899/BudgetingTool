from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

entriesList = []
html = ""

def create_table():
    global html
    html = "<table><thead><tr><th>Name</th><th>date</th><th>price</th></tr></thead><tbody>"
    for entry in entriesList:
        html += f"<tr><td>{entry['name']}</td><td>{entry['dateBought']}</td><td>{entry['price']}</td></tr>"
    html += "</tbody></table>"


#address of function dosnt include port as it is deined in the function
@app.route('/api/add_entry', methods=['POST'])
def add_entry():
    data = request.json
    entriesList.append(data)
    name = data['name']
    date = data['dateBought']
    price = data['price']
    if (len(entriesList) != 0):
        create_table()
    return {'message': 'Data recieved succesfully'}

@app.route('/api/get_table', methods=['GET'])
def get_table():
    #we should return a dictionary that retuns a html string
    return {'table_html': html}
        
#only run the application when the file is executed dierectly
if __name__ == '__main__':
    app.run(port=5000, debug=True)