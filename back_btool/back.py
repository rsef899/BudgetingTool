from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

entriesList = []
saleItemsDictionary = {}
tobeEvaled_SoldItemsDic = {}
boughtPriceDictionary = {}
netBalance = 0
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
    #add expense to the netBalance
    global boughtPriceDictionary
    boughtPriceDictionary[str(len(entriesList)-1)] = price
    global netBalance 
    netBalance -= int(price)


    if (len(entriesList) != 0):
        create_table()
    return {'message': 'Data recieved succesfully'}

@app.route('/api/get_table', methods=['GET'])
def get_table():
    #we should return a dictionary that retuns a html string
    return {'table_html': html}

#RefreshPage
@app.route('/api/reset_table', methods=['POST'])
def reset_table():
    global html
    global entriesList
    global saleItemsDictionary
    global tobeEvaled_SoldItemsDic
    #wipe all the values when refreshed
    html = ""
    entriesList.clear()
    saleItemsDictionary.clear()
    tobeEvaled_SoldItemsDic.clear()

    return jsonify(success=True)

#getting the sale value
@app.route('/api/recieve_sale_item', methods=['POST'])
def recieve_sale_item():
    data = request.json
    global saleItemsDictionary
    saleItemsDictionary[str(data['itemNumber'])] = data['enteredValue']
    tobeEvaled_SoldItemsDic[str(data['itemNumber'])] = data['enteredValue']
    return {'message': 'Data recieved succesfully'}


#get the net balance of the items
@app.route('/api/get_netBalance', methods=['GET'])
def get_netBalance():
    global netBalance
    global tobeEvaled_SoldItemsDic
    #create a variable that will change, but initialises the same as tobe sold items
    changedSoldlist = tobeEvaled_SoldItemsDic.copy()

    #go through all the sold items that need to be evaluated
    for soldItems in tobeEvaled_SoldItemsDic:
        #add the sold amount to the netBalance
        netBalance += int(tobeEvaled_SoldItemsDic[soldItems])
        #remove the evaluated item from the tobeevauated dictionary
        del changedSoldlist[soldItems]
    #set the tobeEvaluated official dictionary to the mutable dictionary, should = {}
    tobeEvaled_SoldItemsDic = changedSoldlist

    return {'netBalance': netBalance}
    
#only run the application when the file is executed dierectly
if __name__ == '__main__':
    app.run(port=5000, debug=True)