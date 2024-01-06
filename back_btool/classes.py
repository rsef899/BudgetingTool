class Item():

    def __init__(self, id, name, date, price, sold_price):
        self.id = id
        self.name = name
        self.date = date
        self.price = price
        self.sold_price = sold_price

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "price": self.price,
            "sold_price": self.sold_price
        }

    
