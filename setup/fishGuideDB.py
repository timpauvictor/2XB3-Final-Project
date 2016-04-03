#please note this is file specific to FishGuide.txt
#from: <please fill>

"""
        File use guide:
        GUIDE_WATERBODY_CODE    GUIDE_LOCNAME_ENG       GUIDE_LOCNAME_FR        LATITUDE        LONGITUDE       SPECIES_CODE    SPECNAME                NOM_D_ESPECE    POPULATION_TYPE_ID      POPULATION_TYPE_DESC    LENGTH_CATEGORY_ID      LENGTH_CATEGORY_LABEL   ADV_LEVEL       ADV_CAUSE_ID    ADV_CAUSE_DESC  GUIDE_YEAR      GUIDE_LOCDESC
        "45227855"                              "Oxtongue Lake"         "Lac Oxtongue"          452157          785509          "271"                   "Ling (Burbot)" "Lotte"                 1                                       "General"                               55                                      "55-60cm"                               4                       1                               "Mercury"               2015            "McClintock Twp., Haliburton Co.|Canton de McClintock, Cté de Haliburton"
        ALL the entries are in this format
"""

import shlex #if we import this, it'll split on whitespace
#while keeping quotes intact (which is exactly what we need)
def getLines(fileName): #this function simply makes an array of all the lines in the file
        with open(fileName) as openedFile: #open our file
                fileContent = openedFile.readlines() #file content is all of the lines in the file
        return fileContent

def splitLines(ourList): #this function split up the
#inividual lines into smaller chunks to match the
#header (first line)
#takes a single list as an argument
        print("Shlex split running, THIS TAKES TIME. \
                DON'T PANIC AND WAIT")
        #go through our list
        for i in range(len(ourList)):
                #split without any arguments will split on whitespace and since we're using shlex, it will also keep anything in quotes intact
                ourList[i] = shlex.split(ourList[i])
        print("Shlex split is done!")#as seen here: http://www.geomidpoint.com/latlon.html
        #so, by looking at the data, we have an accuracy of
        #4 decimal points ALWAYS
        return ourList

def fixLatLng(ourList): #our data set doesn't included decimal points in the latitude and longitude strings, so we gotta fix that
        #so, geography lesson time
        #since all of our data is located in the norhern hemisphere than we know that all of our latitudes will be positive therefore the
        #range is 0 to 90
        #since all of our data is also located in Canada (eastern hemisphere) than all of our longitudes will be negative
        #also, since we're in canada we only have to worry about longitudes from 0-99 and always negative
        for i in range(len(ourList)): #parse through the given list
                ourList[i][3] = ourList[i][3][:2] + "." + ourList[i][3][2:] #add a decimal in between the second and third elements of latitude
                ourList[i][4] = "-" + ourList[i][4][:2] + "." + ourList[i][4][2:] #add a negative at the beginning and a decimal in between the third and last elements
                # print(ourList[i][3] + "," + ourList[i][4]) #can be commented out to see the changes
        return ourList #return the list

def printItems(ourList): #print all items in a list useful for debugging
        for item in ourList:
                print(item)


def getNumUniqueLocations(ourList):
        counter = 1;
        for i in range(1, len(ourList)):
                # print(ourList[i][0])
                # print(ourList[i-1][0])
                if (ourList[i][0] != ourList[i-1][0]):
                        counter += 1
        print(counter)
        return counter



# parse line 0, create dict entry
#lastlocnameindex=0
# for loop through all lines
#for each line, check if the locname==the last locname
#if yes add, the fish data to the last locnameindex


def startDict(fileContent):
        count = 1
        filedict['0'] = createDict1(fileContent[1])
        lastpoint = fileContent[1]
        for i in range(1,len(fileContent)):
                sampledict={}
                point = fileContent[i]
                if (point[1] != lastpoint[1]):  # if waterbody id is different from last one
                        lastpoint = point
                        sampledict['waterBodyCode'] = point[0]
                        sampledict['locName'] = point[1]
                        sampledict['geometry'] = {'lat':(point[3]), 'lng':(point[4])}
                        sampledict['species'] = [{'code':(point[5]),'name':point[6],'lengths':[point[11]]}]
                        
                else:
                        if (point[5]==lastpoint[5]):                                            # if the fish ID are the same
                                filedict[str(count-1)]['species'][len(filedict[str(count-1)]['species'])-1]['lengths'].append(point[11]) # append length to last dict
                                lastpoint = point
                        else:
                                filedict[str(count-1)]['species'].append({'code':point[5],'name':point[6],'lengths':[point[11]]})
                                lastpoint=point
                                                 
                                                 
                                                 
                        
                        

                        #,'lengths':{'id':'','label':'','advLevel':'','advCauseDesc':'','advCause':'','popTypeID':'','popTypeDESC':''}

                
                if (sampledict != {}):
                        filedict[str(count)] = sampledict
                        count=count+1
                        
        
        return filedict

def createDict1(point):         #case for first line
        dict = {}
        dict['waterBodyCode'] = point[0]
        dict['locName'] = point[1]
        dict['geometry'] = {'lat':(point[3]), 'lng':(point[4])}
        dict['species'] = [{'code':(point[5]),'name':point[6],'lengths':[point[11]]}]  #list of dicts, each dict contains a species, each species has a list of lengths
        
        return dict

def createDict(point,lastpoint,count):
        dict={}
        if (point[1] != lastpoint):  # if waterbody id is different from last one
                        lastpoint = point
                        dict['waterBodyCode'] = point[0]
                        dict['locName'] = point[1]
                        dict['geometry'] = {'lat':(point[3]), 'lng':(point[4])}
                        dict['species'] = [{'code':(point[5]),'name':point[6],'lengths':[point[11]]}]
                        dict['locDESC'] = ""
                        return dict
        else:
               
                #print filedict[str(count-1)]
                return dict
                #
                



# create dict will check if the name is the same as the previous dictionary
# if yes then go to function to append values to dictionary
# if no, create new dict
filedict={}

dict = {}
fileContent = getLines('./data/FishGuide.txt')
fileContent = splitLines(fileContent)
fileContent = fixLatLng(fileContent)
ourdict = startDict(fileContent)
#print ourdict[1]
uniqueLocations = getNumUniqueLocations(fileContent)
