import requests
import urllib.request
import http.client
import json


#def getAPI(Search_target):
#search target as keywords
#Search_target=['soccer','basketball','baseball'] #sport
Search_target=['Apexlegends','PUBG','leagueoflegends']  #e-sport

    #Our_genreId=1234567   #can be change due to situation of search
    #Our_applicationId=1018838195080343203   #can be change due to situation of search


for keyword in Search_target:
    Item=[]
    routeAPI="D:/VScode/APIrecollection/"+keyword+".json"
#url splicing
    url ='https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword='+ keyword +'&applicationId=1018838195080343203'
    #url ='https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=%E6%A5%BD%E5%A4%A9&applicationId=1018838195080343203'
    r = requests.get(url)
    #json format
    json_response = r.content.decode()
    dict_json = json.loads(json_response)
    list_Item=dict_json['Items']
    #for i in range(10): #take top 10 items
    for i in range(10): #take top 10 items
        name=list_Item[i]['Item']['itemName']
        price=list_Item[i]['Item']['itemPrice']
        itemcode=list_Item[i]['Item']['itemCode']
        itemcapiton=list_Item[i]['Item']['itemCaption']
        itemurl=list_Item[i]['Item']['itemUrl']
        #images
        length=len(list_Item[i]['Item']['mediumImageUrls'])
        if length==3:
            imgurl1=list_Item[i]['Item']['mediumImageUrls'][0]['imageUrl']  #128*128
            imgurl2=list_Item[i]['Item']['mediumImageUrls'][1]['imageUrl']
            imgurl3=list_Item[i]['Item']['mediumImageUrls'][2]['imageUrl']
            elementAPI = [{"itemName":name,
            "itemPrice":price,
            "itemCode":itemcode,
            "itemCaption":itemcapiton,
            "itemRating":0,
            "imageUrl1":imgurl1,
            "imageUrl2":imgurl2,
            "imageUrl3":imgurl3,
            "itemUrl":itemurl}]
            Item.append(elementAPI)
        elif length==2:
            imgurl1=list_Item[i]['Item']['mediumImageUrls'][0]['imageUrl']  #128*128
            imgurl2=list_Item[i]['Item']['mediumImageUrls'][1]['imageUrl']
            elementAPI = [{"itemName":name,
            "itemPrice":price,
            "itemCode":itemcode,
            "itemCaption":itemcapiton,
            "itemRating":0,
            "imageUrl1":imgurl1,
            "imageUrl2":imgurl2,
            "itemUrl":itemurl}]
            Item.append(elementAPI)
        else:
            imgurl1=list_Item[i]['Item']['mediumImageUrls'][0]['imageUrl']  #128*128       
            elementAPI = [{"itemName":name,
            "itemPrice":price,
            "itemCode":itemcode,
            "itemCaption":itemcapiton,
            "itemRating":0,
            "imageUrl1":imgurl1,
            "itemUrl":itemurl}]
            Item.append(elementAPI)
# # switch into json
#str_json =json.dumps(Item)
#print(str_json)
    with open(routeAPI,'w',encoding='utf-8') as f:
        json.dump(Item, f,ensure_ascii=False,indent=1)
    # gc.collect(dict_json)
    # gc.collect(list_Item)
    # del dict_json
    # del list_Item
    # gc.collect(dict_json)
    # gc.collect(list_Item)

        # print(imgurl3)
        # print(name)
        # print(keyword)
        # print(url)
    # print(dict_json)
    # print('---------------------------')
    # print(list_Item[1])




# # switch into json
# str_json =json.dumps(dict_json)
# print(str_json)
# with open("test.json",'w',encoding='utf-8') as f:
#     json.dump(dict_json, f,ensure_ascii=False)
