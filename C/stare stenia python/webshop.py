def isValidProduct(phone, productList):
    if phone in productList:
        return True
    else:
        return False

def getIndexInList(phone, productList):
    if phone in productList:
        pos = productList.index(phone)
        return pos
    else:
        return -1

def howManyInStock(phone, productList, stock):
    if phone in productList:
        count = 0
        pos = getIndexInList(phone, productList)
        stock[pos]
        return stock[pos]
    else:
        return -1

def phonesCheaperThan(availableBudget, productList, prices):
    new_list = []
    for i in range(len(productList)):
        if prices[i] < availableBudget:
            new_list.append(productList[i])
    return new_list
       

    

def order1Phone(phone, productList, stock):
    if phone in productList:
        for i in range(len(productList)):
            if productList[i] == phone and stock[i] > 0:
                stock[i] = stock[i] - 1
                return stock[i]
            elif productList[i] == phone and stock[i] == 0:
                return -1
    else:
        return None

def processOrder(listOfPhones, productList, stock, priceList):
    total = 0
    for i in listOfPhones:
        if i in productList:
            pos = getIndexInList(i, productList)
            if stock[pos] > 0:
                total += priceList[pos]
                stock[pos] = stock[pos] -1
            elif stock[pos] == 0:
                total = total
                
        else:
            total = total
    return total

def processDelivery(delivery, productList, stock):
    return -1

def addNewModel(name, number, price, productList, stock, priceList):
   return -1

def newInfo(fileName, productList, stock, priceList):
    return 0

"""
Do not change anything below this line!
Try to understand it, it will help you by finding the solutions
"""
if __name__ == "__main__":
    products = ["FairPhone3", "HTC U", "Huawei P10", "iPhoneX", "Nokia3", "Samsung S8"]
    numberInStock = [5, 3, 2, 0, 1, 28]
    prices = [450, 315, 499, 1059, 129, 699]

    result = 0
    # 1. Check if a phone is sold in the shop (may not be in stock currently)
    result_11 = isValidProduct("iPhone8", products)
    result_12 = isValidProduct("HTC U", products)
    print (result_11)
    print (result_12)
    if result_11 == False and result_12 == True:
        result += 1
        print("+++ Test 1 succes +++")
    else:
        print("--- Test 1 failed ---")
    # 2. Get the index of a certain phone in the list of products, if phone does not exist, -1 is returned
    result_21 = getIndexInList("iPhone8", products)
    result_22 = getIndexInList("HTC U", products)
    print (result_21)
    print (result_22)
    if result_21 == -1 and result_22 == 1:
        result += 1
        print("+++ Test 2 succes +++")
    else:
        print("--- Test 2 failed ---")
    # 3. count how many phones of a certain type are in stock (for a non-existing phone -1 is returned)
    result_31 = howManyInStock("iPhoneX", products, numberInStock)
    result_32 = howManyInStock("Nokia3", products, numberInStock)
    result_33 = howManyInStock("XPeria", products, numberInStock)
    print (result_31)
    print (result_32)
    print (result_33)
    if result_31 == 0 and result_32 == 1 and result_33 == -1:
        result += 2
        print("+++ Test 3 succes +++")
    else:
        print("--- Test 3 failed ---")
    # 4. checks if you can get a list of all names of phones which are cheaper than availableBudget
    result_41 = phonesCheaperThan(500, products, prices)
    result_42 = phonesCheaperThan(129, products, prices)
    print (result_41)
    print (result_42)
    if result_41 == ['FairPhone3', 'HTC U', 'Huawei P10', 'Nokia3'] and result_42 == []:
        result += 2
        print("+++ Test 4 succes +++")
    else:
        print("--- Test 4 failed ---")
        
    # 5. checks if you can process the order of 1specific phone
    # if the phone is available and in stock, the number in stock for this type is updated (-1)
    # the method returns the new number in stock of this phone, or -1 if not available
    # if the type does not exist, the method returns None
    result_51 = order1Phone("Samsung S8", products, numberInStock)
    result_52 = order1Phone("iPhoneX", products, numberInStock)
    result_53 = order1Phone("XPeria", products, numberInStock)
    result_54 = order1Phone("Samsung S8", products, numberInStock)
    print (result_51)
    print (result_52)
    print (result_53)
    print (result_54)
    if result_51 == 27 and result_52 == -1 and result_53 == None and result_54 == 26:
        result += 2
        print("+++ Test 5 succes +++")
    else:
        print("--- Test 5 failed ---")
    # 6. process a complete order (= a list of phones), total price to pay is returned
    # numberInStock is reset to make independent of previous test
    numberInStock = [5, 3, 2, 0, 1, 28]
    order1 = ["Huawei P10", "HTC U", "HTC U"] # valid order should return 1129
    order2 = ["HTC U", "iPhoneX", "Samsung S8"] # no more iPhones in stock, should return 1014
    order3 = ["bieb", "Nokia3", "Tuut"] # nothing possible, should return 0
    result_61 = processOrder(order1, products, numberInStock, prices)
    result_62 = processOrder(order2, products, numberInStock, prices)
    result_63 = processOrder(order3, products, numberInStock, prices)
    print(result_61)
    print(result_62)
    print(result_63)
    if result_61 == 1129 and result_62 == 1014 and result_63 == 0:
        result += 3
        print("+++ Test 6 succes +++")
    else:
        print("--- Test 6 failed ---")
    # 7. Simulate a delivery, a list with phone names and the number with which the stock needs to be increased
    # assume only phones which are already available in the shop, the method returns the total number of phones added
    # numberInStock is reset to make independent of previous test
    numberInStock = [5, 3, 2, 0, 1, 28]
    delivery1 = ["iPhoneX", 5, "Nokia3", 3]
    result_71 = processDelivery(delivery1, products, numberInStock)
    result_72 = howManyInStock("iPhoneX", products, numberInStock)
    result_73 = howManyInStock("Nokia3", products, numberInStock)
    print(result_71)
    print(result_72)
    print(result_73)
    if result_71 == 8 and result_72 == 5 and result_73 == 4:
        result += 3
        print("+++ Test 7 succes +++")
    else:
        print("--- Test 7 failed ---")
    # 8. Add new models to the shop, the products list should remain in alphabetical order
    # the method returns the index where the new phone is stored in the products list
    result_81 = addNewModel("HTC X", 3, 250, products, numberInStock, prices)
    result_82 = addNewModel("XPeria", 1, 220, products, numberInStock, prices)
    print (result_81)
    print (result_82)
    if result_81 == 2 and result_82 == 7 and len(products) == 8:
        result += 3
        print("+++ Test 8 succes +++")
    else:
        print("--- Test 8 failed ---")
    print ("The final score you obtained for this exercise = ", result)
    # 9. get all info of the shop from a text file
    # format is always name phone, number in stock, price each on a separate line
    # info is stored in new (empty)lists provided
    # the total price of all phones found is returned
    newProducts = []
    newStock = []
    newPrices = []
    result_91 = newInfo("stock.txt", newProducts, newStock, newPrices)
    print (result_91)
    if result_91 == 5889:
        result += 3
        print("+++ Test 9 succes +++")
    else:
        print("--- Test 9 failed ---")
    print ("The final score you obtained for this exercise = ", result, "/ 20")

