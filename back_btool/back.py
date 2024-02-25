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
@app.route('/api/recieve_sale_item/<item_id>', methods=['PATCH'])
def recieve_sale_item(item_id):

    data = request.json
    model.patch_sold_item(cursor, data, item_id)
    connection.commit()
    return {'message': 'Item updated succesfully'}

#get the net balance of the items
@app.route('/api/get_netBalance', methods=['GET'])
def get_netBalance():
    return {'netBalance': "{:.2f}".format(model.compute_net_balance(cursor))}
    
@app.route('/api/update_item/<item_id>', methods=['PATCH'])
def update_item(item_id):
    response = model.update_item(cursor, request.json, item_id)
    connection.commit()
    return response
    

#asure that our header are matching those of the back end
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Max-Age', '3600')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

### ########
### PC Page
### ########

@app.route('/api/fetch_pcs',methods=['GET'])
def fetch_pcs():
    return jsonify(model.get_pcs(cursor))

@app.route('/api/submit_pc',methods=['POST'])
def submit_pc():
    pc_data = request.json.get('pc_data')
    pc_components = request.json.get('pc_components')

    
    cursor.execute("INSERT INTO PCs (name) VALUES (?)", (pc_data['name'],))
    pc_id = cursor.lastrowid

    for component in pc_components:
        cursor.execute("INSERT INTO COMPONENTS (component_type,name,price) VALUES (?,?,?)",(component['type'],component['name'],component['price']))
        component_id = cursor.lastrowid
        cursor.execute("INSERT INTO PC_COMPONENTS (pc_id,component_id) VALUES (?,?)",(pc_id,component_id))

    
    connection.commit()
    
    return {'message': 'PC Submitted'}

        
@app.route('/api/update_pc',methods=['PUT'])
def update_pc():
    pc_id = request.json['pcId']
    components = request.json['editedPCData']['components']
    for component in components:
        name = component.get('name')
        price = component.get('price')
        
        response = model.edit_component(cursor,component['id'],name,price,pc_id)
    connection.commit()
    return {'message': 'Finished successfully'}



@app.route('/api/delete_component',methods=['DELETE'])
def delete_component():
    component_id = request.json['componentId']
    response = model.delete_component(cursor,component_id)
    connection.commit()
    return (response)

@app.route('/api/add_component',methods=['POST'])
def add_component():
    try:
        component_name = request.json['component']['name']
        component_type = request.json['component']['component_type']
        component_price = request.json['component']['price']
        pc_id = request.json['pcID']
        response = model.add_component(cursor, component_type, component_name, component_price, pc_id)
        connection.commit()
        return jsonify({"message": "Component added successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to add component"}), 500
    

@app.route('/api/delete_pc', methods = ['DELETE'])
def delete_pc():
    try:
        pc_id = request.json['id']
        components = request.json['components'] #get components list in json string
        print("This is pc id: \n")
        print(pc_id)
        response = model.delete_pc(cursor, pc_id)
        for component in components: 
            print(component['id'])
            model.delete_component(cursor, component['id'])
        connection.commit()
        return jsonify({"message": "Component added successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to delete PC"}), 500


@app.route('/api/sold_pc', methods = ['PUT'])
def save_sale():
    try:
        id = request.json['id']
        price = request.json['price']
        response = model.save_sale(cursor, id, price)
        connection.commit()
        return jsonify({"message": "Sold price added successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to delete PC"}), 500
        
#only run the application when the file is executed dierectly
if __name__ == '__main__':
    app.run(port=5000, debug=True)