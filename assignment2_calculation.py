# Assignment 2: Three-Value Calculation Program

# Collect three numerical values from the user
first = float(input("Enter the first number: "))
second = float(input("Enter the second number: "))
third = float(input("Enter the third number: "))

# Step 1: Add the first and third values together
addition_result = first + third
print(f"\nStep 1 - Addition (first + third): {first} + {third} = {addition_result}")

# Step 2: Subtract the second value from the result of the addition
subtraction_result = addition_result - second
print(f"Step 2 - Subtraction (result - second): {addition_result} - {second} = {subtraction_result}")

# Step 3: Multiply the result of the subtraction by 2
multiplication_result = subtraction_result * 2
print(f"Step 3 - Multiplication (result * 2): {subtraction_result} * 2 = {multiplication_result}")

# Step 4: Divide the result of the multiplication by 4
final_result = multiplication_result / 4
print(f"Step 4 - Division (result / 4): {multiplication_result} / 4 = {final_result}")

# Print the final result
print(f"\nFinal Result: {final_result}")
