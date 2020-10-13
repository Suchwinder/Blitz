from cv2 import cv2
import numpy as np
import pytesseract, re

# Uses PytesseractOCR to gather text from images
# Returns string
def retrieveStringFromImage(receipt_image):
    img = cv2.imread(receipt_image)
    receipt_text = pytesseract.image_to_string(img)
    return receipt_text

# Uses regular expression to get prices
# Returns list of prices of type string
def getCosts(receipt_text):
    regex = re.compile('\d+\.\d{1,2}', re.IGNORECASE)
    price_list = re.findall(regex, receipt_text)
    return price_list

# Uses regular expression to get items
# Returns list of items of type string
def getItems(receipt_text):
    pass

# Create item & price pairs
# Returns list of pairs
def createItemCostPairs(items_list, price_list):
    pass

# Main function to run code
def main():
    pass

if __name__ == "__main__":
    main()