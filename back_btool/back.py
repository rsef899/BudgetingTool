from flask import Flask, request, jsonify, session, Response
from flask_cors import CORS, cross_origin
from flask_session import Session
import model

app = Flask(__name__)
CORS(app)

# Sessioning
SESSION_TYPE = "filesystem"
app.config.from_object(__name__)
Session(app)

@app.route("/api/set_session/<user>, methods=['POST']")
def set_session(user):
        session["user"] = user

connection = model.connect_to_db()
cursor = connection.cursor()


entriesList = []
saleItemsDictionary = {}
tobeEvaled_SoldItemsDic = {}
boughtPriceDictionary = {}
netBalance = 0
html = ""

current_updating_item = ''

#CONNECTION TESTER: of the items
@app.route('/api/get_test', methods=['GET'])
def get_test():
    return("Hello")


#check if the entry we want to add is duplicate
@app.route('/api/check_name_dupes', methods=['POST'])
def check_name_dupes():
    global entriesList

    data = request.json
    testingName = str(data['name'])
    for entry in entriesList:
        if entry['name'] == testingName:
            return {'Outcome': True}

    #if name not found return false
    return {'Outcome': False}

#Creates the entries table html string
def create_table():
    global html
    global entriesList
    html = "<table><thead><tr><th>Name</th><th>Date</th><th>Price</th></tr></thead><tbody>"
    for entry in entriesList:
        html += f"<tr><td>{entry['name']}</td><td>{entry['dateBought']}</td><td>{entry['price']}</td></tr>"
    html += "</tbody></table>"


#address of function dosnt include port as it is deined in the function
@app.route('/api/add_entry', methods=['POST'])
def add_entry():
    data = request.json

    query = """CREATE TABLE items (
        id integer PRIMARY KEY,
        name text NOT NULL,
        date text NOT NULL,
        price double NOT NULL,
        sold_price double
    )"""


    query = """INSERT into items (name,date,price)
            Values(?, ?, ?)"""
    cursor.execute(query, (data['name'], data['dateBought'], data['price']))
    connection.commit()

    # old implementation
    entriesList.append(data)
    name = data['name']
    date = data['dateBought']
    price = data['price']
    #add expense to the netBalance
    global boughtPriceDictionary
    boughtPriceDictionary[str(len(entriesList)-1)] = price
    global netBalance 
    netBalance -= float(price)

    if (len(entriesList) != 0):
        create_table()
    return {'message': 'Data recieved succesfully'}

@app.route('/api/fetch_items', methods=['GET'])
def fetch_items():
    return jsonify(model.get_items(cursor))
    #return Response(jsonify(model.get_items(cursor)), mimetype="application/json")


@app.route('/api/get_table', methods=['GET'])
def get_table():
    #we should return a dictionary that retuns a html string
    create_table()
    return {'table_html': html}

#RefreshPage
@app.route('/api/reset_table', methods=['POST'])
def reset_table():
    global html
    global entriesList
    global saleItemsDictionary
    global tobeEvaled_SoldItemsDic
    global netBalance
    global current_updating_item
    #wipe all the values when refreshed
    netBalance = 0
    html = ""
    current_updating_item = ""
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
        try:
            #add the sold amount to the netBalance
            netBalance += float(tobeEvaled_SoldItemsDic[soldItems])
            #remove the evaluated item from the tobeevauated dictionary
            del changedSoldlist[soldItems]
        except TypeError:
            print("Sold Item not inputed correcty")

    #set the tobeEvaluated official dictionary to the mutable dictionary, should = {}
    tobeEvaled_SoldItemsDic = changedSoldlist
    return {'netBalance': "{:.2f}".format(netBalance)}

@app.route('/api/get_itemNames', methods=['GET'])
def get_itemNames():
    names = []
    for items in entriesList:
        names.append(items['name'])
    
    return jsonify({'names': names})

@app.route('/api/get_itemDetails_Reciever', methods=['POST'])
def get_itemDetails_Reciever():
    data = request.json

    global current_updating_item
    current_updating_item = data['Item']
    return {'message': 'Updating Item Name recieved succesfully'}

#send the details list, for detail update selection
@app.route('/api/get_itemDetails_Sender', methods=['GET'])
def get_itemDetails_Sender():
    details = ['Name', 'Date', 'Price']
    
    for index, items in enumerate(entriesList):
        if items['name'] == current_updating_item:
            try:
                if str(index) in saleItemsDictionary:
                    details.append('Sold Price')
            except KeyError:
                print('Key does not exist')
    return jsonify({'details': details})

@cross_origin()
@app.route('/api/update_detail', methods=['POST'])
def update_detail():
    global saleItemsDictionary
    global entriesList
    global tobeEvaled_SoldItemsDic
    global netBalance

    data = request.json
    if (data['detail'] == "Name"):
        data['detail'] = "name"
    elif (data['detail'] == "Price"):
        data['detail'] = "price"
    elif (data['detail'] == "Date"):
        data['detail'] = "dateBought"
    print("the detail being changed is: " + data['detail'])
    if (data['detail'] == 'Sold Price'):
        for index, items in enumerate(entriesList):
            if items['name'] == data['name']:
                try:
                    if str(index) in saleItemsDictionary:
                        #we must undo teh previous sale cost
                        netBalance -= float(saleItemsDictionary[str(index)])
                        saleItemsDictionary[str(index)] = data['entry']
                        tobeEvaled_SoldItemsDic[str(index)] = data['entry']
                        return {"UpdateIndex" : index}
                except KeyError:
                    print('Key does not exist')
                
    else:
        for index2, entry in enumerate(entriesList):
            if entry['name'] == data['name']:
                if (data['detail'] == 'price'):
                    netBalance += float(entriesList[index2]['price'])
                    netBalance -= float(data['entry'])

                entriesList[index2][data['detail']] = data['entry']
                print(str(entriesList))

    return {'message': 'Succesfully Updated'}

#asure that our header are matching those of the back end
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Max-Age', '3600')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response


#only run the application when the file is executed dierectly
if __name__ == '__main__':
    app.run(port=5000, debug=True)