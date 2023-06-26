import math
def bucket(arr, n=0):
    
    buckets = {k: [] for k in range(10)}
    
    for num in arr:
        t=(num//10**n)%10; 
        buckets[t].append(num)
    return buckets

def radixSort(arr):

    max_digits = math.ceil(math.log10(max(arr)))
    n= 0 
    while n <= max_digits :
        buck = bucket(arr, n)
        arr =  [buck[k][i]  for k in range(10) for i in range(len(buck[k]))]
        n+=1
    print(arr)
    return arr


radixSort([8, 6, 1, 12])
# [1, 6, 8, 12]

radixSort([10, 100, 1, 1000, 10000000])
# [1, 10, 100, 1000, 10000000]

radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593])
# [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]