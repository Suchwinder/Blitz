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
    regex = re.compile('\d+\.\d{1,2}', re.IGNORECASE)
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
@param: price_list is the list of prices of type string
@returns dictionary of "item": price
'''
def createItemCostPairs(items_list, price_list):
    if(len(items_list) == len(price_list)):
        res_dict = dict(zip(items_list, price_list))
        return res_dict

'''
Create pairs for subtotal, tax, total
@param: item_list is the list of items of type string
@param: price_list is the list of prices of type string
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
    pass

# Main function to run code
def main():
    pass

if __name__ == "__main__":
    main()