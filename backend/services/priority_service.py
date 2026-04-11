def get_priority(stock_level):
    if stock_level == "EMPTY":
        return "HIGH"
    elif stock_level == "LOW":
        return "MEDIUM"
    
    else:
        return "LOW"