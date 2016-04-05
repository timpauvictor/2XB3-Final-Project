import requests
import json
def getLines(fileName): #this function simply makes an array of all the lines in the file
        with open(fileName) as openedFile: #open our file
                fileContent = openedFile.readlines() #file content is all of the lines in the file
        return fileContent

def splitCSV(myArr):
	for i in range(len(myArr)):
		myArr[i] = myArr[i].split(",")
	return myArr

# def startDict(fileContent):
# 	count = 1;
# 	lastpoint = fileContent[0];
# 	for i in range(1, len(fileContent)):
# 		sampleDict = {}
# 		point = 




stationList = getLines("./data/hydrometric_StationList.csv")
stationList.pop(0) # popping to remove the header
stationList = splitCSV(stationList)
#print(stationList[0][0])



def startDict(inputlist):
	stationDict = {}
	for i in range(len(inputlist)):
		stationDict[inputlist[i][0]] = createDict(inputlist[i]) # each dict entry is its ID
	return stationDict

def createDict(waterstation):
	waterDict= {}
	waterDict['stationCode'] = waterstation[0]
	waterDict['stationLoc'] = waterstation[1]
	waterDict['geometry'] = {'lat':waterstation[2],'lng':waterstation[3]}
	waterDict['dailyDischarge'] = []
	waterDict['dailyLevels'] = []
	return waterDict
		

def attachHydroData(inputlist, stationDict):
	for i in range(len(inputlist)):
		ID = inputlist[i][0] #Id of station		
		stationDict[ID]['dailyLevels'].append(inputlist[i][2])
		stationDict[ID]['dailyDischarge'].append(inputlist[i][6])
		
def fixDictIndices(inputDict,inputlist):
	fixedDict = {}
	for i in range(len(inputlist)):
		fixedDict[str(i)] = inputDict[inputlist[i][0]]
	return fixedDict
	
def makePostReqs(rawData):
    postURL = "http://localhost:8080/api/waterPoints"
    headers = {
            'content-type': "application/json",
            'cache-control': "no-cache"
    }

    #print(len(rawData))

    for i in range(len(rawData)):
        #print(i)
        payload = json.dumps(rawData[str(i)])
        jsonReply = requests.request("POST", postURL, data=payload, headers=headers)
        #print(jsonReply)
    #print("Done!")
	
rawData = getLines("./data/ON_hourly_hydrometric.csv")
rawData.pop(0)
rawData = splitCSV(rawData)
ourdict = startDict(stationList)
attachHydroData(rawData,ourdict)
ourdict = fixDictIndices(ourdict,stationList)
print(ourdict['94']['dailyLevels'])
#makePostReqs(ourdict)





