import urllib.request, json 
import mysql.connector
from mysql.connector import errorcode
import requests
from bs4 import BeautifulSoup
import re
from selenium import webdriver 
from webdriver_manager.chrome import ChromeDriverManager
import time 
import os 



url_list = []

def fetchData():
    url = "https://www.hikingproject.com/data/get-trails?lat=40.432756&lon=-79.924982&maxDistance=10&key=200958978-00d7024528a8bdd45c969fa078910537"
    with urllib.request.urlopen(url) as url:
        data = json.loads(url.read().decode())

        for trail in data['trails']:
            print(trail['id'])
            

def writeDataToDB():
    try:
        cnx = mysql.connector.connect(user='root',database='hikerrank')
        print("Connected")
        cursor = cnx.cursor()
        # query = ("select * from pet")
        # cursor.execute(query)
        # result = cursor.fetchall()
        # for row in result:
        #     print(row[0])

        # fetch data
        url = "https://www.hikingproject.com/data/get-trails?lat=40.432756&lon=-79.924982&maxDistance=10&key=200958978-00d7024528a8bdd45c969fa078910537"
        with urllib.request.urlopen(url) as url:
            data = json.loads(url.read().decode())
            for trail in data['trails']:
                add_trail = ("INSERT INTO hikerrank_trail "
                             "VALUES (%s, %s, %s, %s,%s, %s, %s, %s, %s,%s, %s ,%s,%s)")

                trail = (str(trail['id']), trail['name'], trail['summary'], trail['difficulty'], trail['location'], trail['longitude'],trail['latitude'],trail['length'],trail['ascent'],trail['descent'],trail['high'],trail['low'],trail['stars'])
                #trail = (str(trail['id']), trail['name'], trail['summary'], trail['difficulty'], trail['location'], trail['url'], trail['length'],trail['ascent'],trail['descent'],trail['high'],trail['low'],trail['longitude'],trail['latitude'])

                cursor = cnx.cursor()
                cursor.execute(add_trail,trail)
                cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        cnx.close()


def readDataFromDB():
    try:
        cnx = mysql.connector.connect(user='root',database='test')
        print("Connected")
        cursor = cnx.cursor()
        query = ("select url from trails")
        cursor.execute(query)
        result = cursor.fetchall()
        for row in result:
             url_list.append(row[0])

        cnx.close()

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        cnx.close()

def downloadGPX():
    for index, url in enumerate(url_list):
        t_id = url.split('/')[-2:-1][0]
        t_name = url.split('/')[-1:][0]
        print(t_id, t_name)
        if index<=3:
            page = requests.get(url)
            soup = BeautifulSoup(page.content, 'html.parser')
            results = soup('a',text=re.compile(r'Download GPX File'))
            str_results = str(results)
            index_start = str_results.index("href=\"") + 6
            index_end = str_results.index("\">Download GPX")
            gpx_url = str_results[index_start:index_end]
            print(gpx_url)
            browser = webdriver.Chrome(ChromeDriverManager().install())
            browser.get(url) 
            browser.find_element_by_link_text("Sign In").click()
            browser.implicitly_wait(5)
            #print(browser.find_elements_by_xpath("//input[@name='email']")[2])
            browser.find_element_by_xpath("//*[@id=\"login-modal\"]/div/div/div[2]/div/div[2]/form[2]/div[1]/input").send_keys('yuchenxi@andrew.cmu.edu')
            browser.find_element_by_xpath("//*[@id=\"login-modal\"]/div/div/div[2]/div/div[2]/form[2]/div[2]/input").send_keys("Xyc687097")
            browser.implicitly_wait(3)
            browser.find_element_by_xpath("//*[@id=\"login-modal\"]/div/div/div[2]/div/div[2]/form[2]/button").click()
            browser.implicitly_wait(3)
            browser.find_element_by_xpath("//*[@id=\"toolbox\"]/a[3]").click() 
            src = '/Users/laura/Downloads/'+t_name+'.gpx'
            dst = '/Users/laura/Downloads/'+t_id+'.gpx'
            print('************')
            print(src)
            os.rename(src,dst)
            
            # /Users/laura/Downloads/rachel-carson-trail.gpx
            # /Users/laura/Downloads/rachel-carson-trail.gpx

        else:
            break

        # /Users/laura/Downloads/Project-Details.pdf

        #r = requests.get(gpx_url, stream = True, allow_redirects=True) 
        #gpx_filename = gpx_url[40:]+".gpx"
        #print(gpx_filename)
        # with open(gpx_filename,'wb') as f: 
        #     # Saving received content as a png file in 
        #     # binary format 
        
        #     # write the contents of the response (r.content) 
        #     # to a new file in binary mode. 
        #     f.write(r.content) 

if __name__ == "__main__":
    #fetchData()
    writeDataToDB()
    #readDataFromDB()
    #downloadGPX()