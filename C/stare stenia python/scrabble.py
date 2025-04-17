def isVowel(character):
    vowel = ["a","e","i","o", "u"]
    if character in vowel:
        return True
    else:
        return False

def countVowels(word):
    count = 0
    for i in word:
        if isVowel(i) == True:
            count += 1
        
    return count

def posInAlphabet(character):
    alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    count = None
    character = character.lower()
    i = 0
    while i<=len(alphabet)-1:
        if character == alphabet[i]:
            count = i
        i += 1
    return count

def calculateScore(word, letterScoresList):
    total = 0
    for i in word:
        position = posInAlphabet(i)
        total += letterScoresList[position]
    return total

def goodScoringLetters(minValue, letterScoresList):
    alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    new_list = []
    for i in alphabet:
        position = posInAlphabet(i)
        if letterScoresList[position] >= minValue:
            new_list.append(i)
    return new_list
    
def removeCharFromWord(word, character):
   return ""

def countOccurence(word, character):
    result = 0
    for i in word:
        if character == i:
            result += 1
        else:
            result = result
    return result

def specialScore(word, letterScoresList):
    total = 0
    for i in word:
        position = posInAlphabet(i)
        if character(i,word) > 1:
            total += letterScoresList[position] ** character(i,word)
        elif character(i,word) == 1:
            total += letterScoresList[position]
    return total

def isValid(word):
    file = open('wordsEn.txt' , 'r')
    files=file.read()
    file.close()
    if word in files:
        return True
    else:
        return False

def officialScore(word, letterScoresList, tripleRowPos, tripleColPos, startRow, startCol, orientation):
    return 0

"""
Do not change anything below this line!
Try to understand it, it will help you by finding the solutions
"""
if __name__ == "__main__":
    letterScores = [1,3,5,2,1,4,3,4,1,4,3,3,3,1,1,3,10,2,2,2,4,4,5,8,8,4]
    rowPositionsx3 = [1,1,1,8,8,15,15,15]
    colPositionsx3 = [1,8,15,1,15,1,8,15]

    result = 0
    # 1. Check if a character is a vowel, return a boolean
    result_11 = isVowel("b")
    result_12 = isVowel("o")
    print (result_11)
    print (result_12)
    if result_11 == False and result_12 == True:
        result += 1
        print("+++ Test 1 succes +++")
    else:
        print("--- Test 1 failed ---")
    # 2. count vowels in a string, returns an integer
    result_21 = countVowels("brol")
    result_22 = countVowels("abracadabra")
    result_23 = countVowels("")
    print (result_21)
    print (result_22)
    print (result_23)
    if result_21 == 1 and result_22 == 5 and result_23 == 0:
        result += 1
        print("+++ Test 2 succes +++")
    else:
        print("--- Test 2 failed ---")
    # 3. find position of a letter in the alphabet, 0 to 25, independent of case
    result_31 = posInAlphabet('a')
    result_32 = posInAlphabet('A')
    result_33 = posInAlphabet('z')
    print (result_31)
    print (result_32)
    print (result_33)
    if result_31 == 0 and result_32 == 0 and result_33 == 25:
        result += 2
        print("+++ Test 3 succes +++")
    else:
        print("--- Test 3 failed ---")
    # 4. calculate the Scrabble score of a word, a list with all scores from a to z is given as letterScores
    result_41 = calculateScore("brol", letterScores)
    result_42 = calculateScore("Qyx", letterScores)
    result_43 = calculateScore("", letterScores)
    print (result_41)
    print (result_42)
    print (result_43)
    if result_41 == 9 and result_42 == 26 and result_43 == 0:
        result += 2
        print("+++ Test 4 succes +++")
    else:
        print("--- Test 4 failed ---")
    # 5. get a list of all letters of the alphabet which score at least minValue
    result_51 = goodScoringLetters(3, letterScores)    
    result_52 = goodScoringLetters(8, letterScores)    
    result_53 = goodScoringLetters(11, letterScores)
    print (result_51)
    print (result_52)
    print (result_53)
    if result_51 == ['b', 'c', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'p', 'q', 'u', 'v', 'w', 'x', 'y', 'z'] and result_52 == ['q', 'x', 'y'] and result_53 == []:
        result += 2
        print("+++ Test 5 succes +++")
    else:
        print("--- Test 5 failed ---")    
    # 6. remove all occurences of a given character from a given word, return the resulting string
    result_61 = removeCharFromWord("abracadabra", 'a')
    result_62 = removeCharFromWord("abracadabra", 'f')
    print (result_61)
    print (result_62)
    if result_61 == "brcdbr" and result_62 == "abracadabra":
        result += 3
        print("+++ Test 6 succes +++")
    else:
        print("--- Test 6 failed ---")    
    # 7. check if a word is valid English word, all valid words can be found in file wordsEn.txt
    result_71 = isValid("python")
    result_72 = isValid("pintje")
    print (result_71)
    print (result_72)
    if result_71 == True and result_72 == False:
        result += 3
        print("+++ Test 7 succes +++")
    else:
        print("--- Test 7 failed ---")    
    # 8. special rule for score calculation, if a character appears more than once in a word the normal score is
    #    changed to score ** (number of times character appears)
    result_81 = specialScore("qaq", letterScores)
    result_82 = specialScore("brol", letterScores)
    result_83 = specialScore("pythonyoyo", letterScores)
    print (result_81)
    print (result_82)
    print (result_83)
    if result_81 == 101 and  result_82 == 9 and result_83 == 523:
        result += 3
        print("+++ Test 8 succes +++")
    else:
        print("--- Test 8 failed ---")    
    # 9. calculate score taking into account the x3 positions. If one letter of the word is put on one of these
    #    positions, the total (normal) score is multiplied by 3
    result_91 = officialScore("brol", letterScores, rowPositionsx3, colPositionsx3, 4, 1, 'V')
    result_92 = officialScore("brol", letterScores, rowPositionsx3, colPositionsx3, 6, 1, 'V')
    result_93 = officialScore("python", letterScores, rowPositionsx3, colPositionsx3, 15, 5, 'H')
    print (result_91)
    print (result_92)
    print (result_93)
    if result_91 == 9 and result_92 == 27 and result_93 == 57:
        result += 3
        print("+++ Test 9 succes +++")
    else:
        print("--- Test 9 failed ---")    
    print ("The final score you obtained for this exercise = ", result, "/ 20")
