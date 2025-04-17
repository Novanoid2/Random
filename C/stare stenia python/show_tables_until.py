def show_tables(number):
    #declare variables
    x=0
    multiply = 0
    while x<10:
        multiply += number
        print(multiply, end='\t')
        x+=1
        
        
def show_tables_until(number):
    x = 1
    while x <= number:
       show_tables(x)
       print(end='\n')
       x += 1
        
    
#show_tables(7)
show_tables_until(7)


