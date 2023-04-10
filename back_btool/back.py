from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

entriesList = []
saleItems = []
html = ""

def create_table():
    global html
    html = "<table><thead><tr><th>Name</th><th>Date</th><th>Price</th></tr></thead><tbody>"
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

#the table will reset when page refreshed
@app.route('/api/reset_table', methods=['POST'])
def reset_table():
    global html
    global entriesList
    html = ""
    entriesList = []
    return jsonify(success=True)

#getting the sale value
@app.route('/api/recieve_sale_item', methods=['POST'])
def recieve_sale_item():
    data = request.json
    global saleItems
    saleItems.append(data)
    print("\n")
    print(str(data))
    print("\n")
    return {'message': 'Data recieved succesfully'}
        
#only run the application when the file is executed dierectly
if __name__ == '__main__':
    app.run(port=5000, debug=True)