# Assignment 1: Python Calculator - Product and Quotient Using If-Else

num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

# Calculate product
product = num1 * num2

# Use if-else to handle division by zero
if num2 != 0:
    quotient = num1 / num2
    print(f"Product of {num1} and {num2} is: {product}")
    print(f"Quotient of {num1} and {num2} is: {quotient}")
else:
    print(f"Product of {num1} and {num2} is: {product}")
    print("Cannot calculate quotient: Division by zero is not allowed!")
