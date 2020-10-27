from cv2 import cv2
import numpy as np
import pytesseract, re, json

'''
Uses PytesseractOCR to gather text from images
@param: receipt_image is the image file, preferably *.png, *.jpg, or *.jpeg
@return: string of text extracted using TesseractOCR
'''
def retrieveStringFromImage(receipt_image):
    img = cv2.imread(receipt_image)
    receipt_text = pytesseract.image_to_string(img)
    return receipt_text

'''
Uses regular expression to get prices
@param: receipt_text is the the string of text
@return: list of prices of type string
'''
def getCosts(receipt_text):
    regex = re.compile(r'\d+\.\d{1,2}', re.IGNORECASE)
    price_list = re.findall(regex, receipt_text)
    return price_list

'''
Uses regular expression to get items
@param: receipt_text is the the string of text
@return: list of prices of type string
'''
def getItems(receipt_text):
    regex = re.compile('([^\n]*[^\n+])', re.IGNORECASE)
    items_list = re.findall(regex, receipt_text)
    return items_list

'''
Create item & price pairs
@param: item_list is the list of items of type string
@param: price_list is the list of prices of type float
@returns array of dictionaries of item and price
'''
def createItemCostPairs(items_list, price_list):
    # if(len(items_list) == len(price_list)):
    pair_list = []
    for i in range(min(len(items_list), len(price_list))):
        res_dict = dict()
        res_dict['name'] = items_list[i]
        res_dict['price'] = price_list[i]
        pair_list.append(res_dict)
    return pair_list

'''
Create pairs for subtotal, tax, total
@param: item_list is the list of items of type string
@param: price_list is the list of prices of type float
@returns dictionary of "item": price
'''
def getTotalsPair(items_list, price_list):
    pass

'''
Cleans up prices of extraneous characters and converts to float
@param: price_list is the list of prices of type string
@return: list of prices of type float
'''
def cleanUpAndConvertPrices(prices_list):
    prices_ = []
    for i in range(len(prices_list)):
        prices_.append(float(re.sub(r'[^\d|\.]', '', prices_list[i])))
    return prices_

'''
Removes prices from item lists
@param: item_list is the list of items of type string
@returns list of items w/o extra characters
'''
def cleanUpCharactersFromItems(item_list):
    digit = re.compile('\d')
    items_ = []
    for things in item_list:
        reg_res = re.findall(digit, things)
        if(len(reg_res) >0):
            part_char = reg_res[0]
            res_str = things.partition(part_char)[0]
            items_.append(res_str)
    return items_

'''
Creates JSON of the the item:price pairs
@param: array of dictionaries of items and price
@return: JSON of "items":[dictionaries]
'''
def createItemsJSON(res_dict):
    item = dict()
    item['items'] = res_dict
    json_res = json.dumps(item)
    return json_res


# Main function to run full receipt processing
def imageToJson(image_from_server):
    res_string = retrieveStringFromImage(image_from_server)
    res_item_list = cleanUpCharactersFromItems(getItems(res_string))
    res_cost_list = cleanUpAndConvertPrices(getCosts(res_string))
    res_pair_list = createItemCostPairs(res_item_list, res_cost_list)
    return res_pair_list

