def merge(arr1, arr2):
    output = []

    i = 0 
    j= 0
    while i<len(arr1) and j<len(arr2):
        if arr1[i] < arr2[j]:
            output.append(arr1[i])
            i+=1
        else:
            output.append(arr2[j])
            j+=1
    
    output += arr1[i:] + arr2[j:]
    print(output)
    return output


arr1 = [1,3,4,5]
arr2 = [2,4,6,8]
merge(arr1,arr2) # [1,2,3,4,4,5,6,8]

arr1 # [1,3,4,5]
arr2 # [2,4,6,8]

arr3 = [-2,-1,0,4,5,6]
arr4 = [-3,-2,-1,2,3,5,7,8]

merge(arr3,arr4); # [-3,-2,-2,-1,-1,0,2,3,4,5,5,6,7,8]

arr5 = [3,4,5]
arr6 = [1,2]

merge(arr5,arr6) # [1,2,3,4,5]
