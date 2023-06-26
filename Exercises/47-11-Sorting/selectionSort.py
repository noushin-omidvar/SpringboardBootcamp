def selectionSort(arr):
    
    for i in range(len(arr)):
        
        min_index = i

        for j in range(i, len(arr)):
            if arr[j]< arr[min_index]:
                min_index = j 
        
        arr[i], arr[min_index] = arr[min_index], arr[i]

    print(arr)
    return arr

selectionSort([4, 1, 20, 12, 10, 7, 9])# [4, 7, 9, 10, 12, 20]
selectionSort([0, -10, 7, 4])# [-10, 0, 4, 7]
selectionSort([1, 2, 3])# [1, 2, 3]
selectionSort([])

nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2,
    453, 546, 75, 67, 4342, 32
]

selectionSort(nums)# [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34,
                #  35, 43, 67, 75, 232, 232, 453, 546, 4342]