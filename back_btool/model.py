from flask import Flask, make_response
import sqlite3
def connect_to_db():
    return sqlite3.connect('budgeter_db.sqlite', check_same_thread=False)

def get_items(cursor):
    query = "SELECT * from items"
    items = cursor.execute(query).fetchall()

    fields = ['id', 'name', 'date', 'price', 'sold_price']
    items = [dict(zip(fields, row)) for row in items]
    print(items)
    return items

def compute_net_balance(cursor):
    # Adjusted query to handle NULL sold_price values by treating them as 0
    query = """
    SELECT SUM(COALESCE(sold_price, 0) - price) AS net_amount
    FROM items;
    """
    
    print("***********************************************")
    try:
        result = cursor.execute(query).fetchone()
        # Check if the result itself is None or if the query result is NULL (no matching records)
        if result is None or result[0] is None:
            return 0.0  # Return 0.0 if the result is NULL
        net_amount = result[0]  # This is safe since we've already handled the case where it could be None
        print(net_amount)
        return float(net_amount)  # Convert to float and return the net balance
    except Exception as e:
        print(f"An error occurred: {e}")
        return 0.0  # Return 0.0 in case of an error

def patch_sold_item(cursor, data, item_id):
    try:
        cursor.execute("UPDATE items SET sold_price = ? WHERE id = ?", (data['sold_price'], item_id))
        return make_response('Succesfully added', 204)
    except:
        return make_response('', 500)

def update_item(cursor, request, item_id):
    query = f"UPDATE items SET {request['column_name']} = ? WHERE id = ?"

    try:
        cursor.execute(query, (request['value'], item_id))
        return make_response('Succesfully added', 204)
    except:
        return make_response('', 500)
    

### PC Page Functions ###
def get_pcs(cursor):
    query = "SELECT * from pcs"
    pcs = cursor.execute(query).fetchall()
    fields = ['id', 'name', 'date', 'price', 'sold_price']
    items = [dict(zip(fields, row)) for row in pcs]
    print(items)
    return items