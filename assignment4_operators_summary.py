# Assignment 4: Summary Note on Python Operators

"""
PYTHON OPERATORS - SUMMARY NOTE
================================

Python operators are special symbols used to perform operations on variables and values.
There are 7 main types of operators in Python:

1. ARITHMETIC OPERATORS
   Used to perform basic mathematical operations.
   +  Addition        -> x + y    (adds two values)
   -  Subtraction     -> x - y    (subtracts right value from left)
   *  Multiplication  -> x * y    (multiplies two values)
   /  Division        -> x / y    (divides left by right, returns float)
   %  Modulus         -> x % y    (returns the remainder of division)
   ** Exponentiation  -> x ** y   (raises x to the power of y)
   // Floor Division  -> x // y   (divides and rounds down to nearest integer)

2. ASSIGNMENT OPERATORS
   Used to assign values to variables.
   =   Assign          -> x = 5
   +=  Add and assign  -> x += 3   (same as x = x + 3)
   -=  Subtract assign -> x -= 3   (same as x = x - 3)
   *=  Multiply assign -> x *= 3   (same as x = x * 3)
   /=  Divide assign   -> x /= 3   (same as x = x / 3)
   %=  Modulus assign  -> x %= 3   (same as x = x % 3)

3. COMPARISON OPERATORS
   Used to compare two values. Returns True or False.
   ==  Equal to            -> x == y
   !=  Not equal to        -> x != y
   >   Greater than        -> x > y
   <   Less than           -> x < y
   >=  Greater than or equal -> x >= y
   <=  Less than or equal    -> x <= y

4. LOGICAL OPERATORS
   Used to combine conditional statements.
   and  -> Returns True if both statements are true
   or   -> Returns True if at least one statement is true
   not  -> Reverses the result (True becomes False, and vice versa)

5. IDENTITY OPERATORS
   Used to compare the memory location of two objects.
   is     -> Returns True if both variables point to the same object
   is not -> Returns True if they do not point to the same object

6. MEMBERSHIP OPERATORS
   Used to test if a value is found in a sequence (list, tuple, string, etc.)
   in     -> Returns True if the value is found in the sequence
   not in -> Returns True if the value is NOT found in the sequence

7. BITWISE OPERATORS
   Used to perform operations on binary representations of integers.
   &   AND         -> Sets each bit to 1 if both bits are 1
   |   OR          -> Sets each bit to 1 if at least one bit is 1
   ^   XOR         -> Sets each bit to 1 if only one bit is 1
   ~   NOT         -> Inverts all the bits
   >>  Right Shift -> Shifts bits to the right
   <<  Left Shift  -> Shifts bits to the left

OPERATOR PRECEDENCE (highest to lowest):
   **  (Exponentiation)
   ~, +, - (Bitwise NOT, Unary plus/minus)
   *, /, //, % (Multiplication, Division, Floor division, Modulus)
   +, - (Addition, Subtraction)
   >>, << (Bitwise shifts)
   & (Bitwise AND)
   ^ (Bitwise XOR)
   | (Bitwise OR)
   ==, !=, >, <, >=, <= (Comparison)
   is, is not (Identity)
   in, not in (Membership)
   not (Logical NOT)
   and (Logical AND)
   or (Logical OR)
"""

# Example usage of arithmetic operators
print("=== Arithmetic Operators ===")
a = 10
b = 3
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")
print(f"{a} // {b} = {a // b}")
