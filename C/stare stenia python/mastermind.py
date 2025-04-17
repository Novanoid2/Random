import random

def isValidColor(color, listOfValidColors):
    return False

def countColorInGuess(guess, color):
    return 0

#a valid guess needs to have 4 different colors
def validGuess(guess):
    return False

def countCorrectColPos(guess, solution):
    return 0

def countCorrectColWrongPos(guess, solution):
    return 0

def hint(guess, position, solution):
    return None

def scoreGame(fileName, solution):
    return []

def playRandomGame(colors, solution):
    return 0

def lazyMode(colors):
    return 0

"""
Do not change anything below this line!
Try to understand it, it will help you by finding the solutions
"""
if __name__ == "__main__":
    validColors = ['red', 'green', 'blue', 'yellow', 'purple', 'black']
    theSolution = ['green', 'black', 'purple', 'yellow']

    result = 0
    # 1. Check if a color is a valid color in the game
    #    currently "red", "green", "blue", "yellow", "purple" and "black" are used
    result_11 = isValidColor("orange", validColors)
    result_12 = isValidColor("blue", validColors)
    print (result_11)
    print (result_12)
    if result_11 == False and result_12 == True:
        result += 1
        print("+++ Test 1 succes +++")
    else:
        print("--- Test 1 failed ---")
    # 2. count how many times a given color appears in a guess (a guess is a list of 4 colors)
    guess = ["red", "black", "red", "green"]
    result_21 = countColorInGuess(guess, "black")
    result_22 = countColorInGuess(guess, "red")
    result_23 = countColorInGuess(guess, "")
    print (result_21)
    print (result_22)
    print (result_23)
    if result_21 == 1 and result_22 == 2 and result_23 == 0:
        result += 1
        print("+++ Test 2 succes +++")
    else:
        print("--- Test 2 failed ---")
    # 3. checks if a guess is valid: exactly 4 different valid color
    result_31 = validGuess(["red", "yellow", "purple"])
    result_32 = validGuess(["red", "yellow", "purple", "green"])
    result_33 = validGuess(["red", "yellow", "purple", "yellow"])
    print (result_31)
    print (result_32)
    print (result_33)
    if result_31 == False and result_32 == True and result_33 == False:
        result += 2
        print("+++ Test 3 succes +++")
    else:
        print("--- Test 3 failed ---")
    # 4. count the number of correct colors on the correct position compared to the solution
    result_41 = countCorrectColPos(["red", "yellow", "purple", "green"], theSolution)
    result_42 = countCorrectColPos(["green", "black", "purple", "yellow"], theSolution)
    result_43 = countCorrectColPos(["red", "yellow", "blue", "green"], theSolution)
    print (result_41)
    print (result_42)
    print (result_43)
    if result_41 == 1 and result_42 == 4 and result_43 == 0:
        result += 2
        print("+++ Test 4 succes +++")
    else:
        print("--- Test 4 failed ---")
    # 5. count the number of correct colors but on a wrong position compared to the solution
    result_51 = countCorrectColWrongPos(["red", "yellow", "purple", "green"], theSolution)
    result_52 = countCorrectColWrongPos(["green", "black", "purple", "yellow"], theSolution)
    result_53 = countCorrectColWrongPos(["black", "purple", "yellow", "green"], theSolution)
    print (result_51)
    print (result_52)
    print (result_53)
    if result_51 == 2 and result_52 == 0 and result_53 == 4:
        result += 2
        print("+++ Test 5 succes +++")
    else:
        print("--- Test 5 failed ---")
    # 6. hint will tell you if a certain position (starting from zero) have a color which is alphabetically before the solution color
    result_61 = hint(["red", "yellow", "purple", "green"], 3, theSolution)
    result_62 = hint(["red", "yellow", "purple", "green"], 4, theSolution)
    print (result_61)
    print (result_62)
    if result_61 == True and result_62 == None:
        result += 3
        print("+++ Test 6 succes +++")
    else:
        print("--- Test 6 failed ---")
    # 7. calculate all scores of a stored game on file
    result_71 = scoreGame("game.txt", theSolution)
    print(result_71)
    if result_71 == [21, 2]:
        result += 3
        print("+++ Test 7 succes +++")
    else:
        print("--- Test 7 failed ---")
    # 8. do random guesses until you win the game (on average the chance is 1 on 360, so i f we try it
    # 100 times the sum of all these values will be almost certain between 36000 +/- 5000)
    # rerun this test if it should fail and you assume the solution is right
    number = 0
    result_81 = 0
    while number < 100:
        result_81 += playRandomGame(validColors, theSolution)
        number += 1
    print (result_81)
    if 31000 < result_81 < 41000:
        result += 3
        print("+++ Test 8 succes +++")
    else:
        print("--- Test 8 failed ---")
    # 9. lazyMode will return the number of characters you need to specify the given colors in a unique way
    result_91 = lazyMode(["red", "green", "blue", "yellow"])
    result_92 = lazyMode(["red", "green", "blue", "yellow", "black", "orange"])
    result_93 = lazyMode(["purple", "purple", "purple"])
    print (result_91)
    print (result_92)
    print (result_93)
    if result_91 == 1 and result_92 == 3 and result_93 == 6:
        result += 3
        print("+++ Test 9 succes +++")
    else:
        print("--- Test 9 failed ---")

    print ("The final score you obtained for this exercise = ", result, "/ 20")
